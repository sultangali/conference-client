import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Alert, Container, Row, Col } from 'react-bootstrap';
import { Stepper, Step, StepLabel, Button } from '@mui/material';
import * as Yup from 'yup';
import { fetchRegister, selectIsAuth } from '../redux/slices/user.js';

import { Step1, Step2, Step3, Step4, Step5, Step6 } from '../components/steps/index.js';

const Registration = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const [errorMessage, setErrorMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Здесь будут все данные:
    firstName: '',
    lastName: '',
    fatherName: '',
    phone: '',
    organization: '',
    position: '',
    rank: '',
    degree: '',
    participationType: '', // 'problem' или 'solve'
    articleTitle: '',
    section: '',
    participationForm: '',
    email: '',
    password: ''
  });
  const [completedSteps, setCompletedSteps] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  if (isAuth) {
    return <Navigate to="/profile" />;
  }

  // Определяем текущее кол-во шагов и их видимость в зависимости от выбора participationType
  const isProblemParticipation = formData.participationType === 'problem';

  // Формируем массив шагов динамически
  // Базовые шаги: 0-Личная инф., 1-О месте работы, 2-Выбор типа участия
  // Если problem: 3-О статье, 4-Выбор раздела, 5-Форма участия, 6-Вход в систему
  // Если solve: сразу 6-Вход в систему (пропускаем 3,4,5)
  const steps = [
    'Личная информация',    // 0
    'О месте работы',       // 1
    'Выбор типа участия',   // 2
    ...(isProblemParticipation ? [
      'О статье',           // 3
      'Форма участия',      // 4
    ] : []),
    'Вход в систему'        // Если isProblemParticipation = true → индекс 5, иначе индекс 3
  ];

  // Определяем функцию для получения фактического индекса шага в зависимости от participationType
  // Нам нужно преобразовать глобальный currentStep в индекс массива steps.
  const mapCurrentStepToVisibleStepIndex = () => {
    // Если пользователь выбрал 'solve', то шаги 3,4,5 пропускаются
    // Соответственно, если currentStep > 2 (после выбора), для solve мы должны перейти сразу к последнему шагу (вход в систему).
    // Но мы можем упростить: currentStep будет всегда перебирать логику, а мы просто рендерим по типу участия.
    
    // Идея: currentStep идёт по "полной" нумерации:  
    // full steps: 0,1,2,3,4,5,6  
    // Если solve: шаги 3,4,5 пропускаем. Тогда:
    //  - если currentStep=3 (должен быть вход в систему), по факту это будет stepsIndex=3, если isProblemParticipation=false
    // Но если isProblemParticipation=false, steps фактически: [0,1,2,6], но мы 6 не можем так просто указать... мы идём sequentially.
    // Можно сделать проще:  
    // - Всегда храним currentStep в "полном" варианте (0-6).  
    // - Если participationType='solve' и currentStep в (3,4,5), мы сразу сетим currentStep=6, пропуская эти шаги.
    // Таким образом, при смене типа участия нужно обновить currentStep, если надо.

    // Если problem: шаги: 0,1,2,3,4,5,6
    // Если solve: шаги фактически: 0,1,2,6 (т.к. 3,4,5 пропускаются)
    // Значит для solve:
    //  - currentStep=0 → index=0
    //  - currentStep=1 → index=1
    //  - currentStep=2 → index=2
    //  - currentStep=3,4,5 (пропускаем) → не наступит, мы будем перескакивать через handleNext
    //  - currentStep=6 → index=3 (т.к. это 4-й элемент массива steps для solve)

    // Если problem:
    //  - currentStep=i → index=i, потому что все шаги присутствуют

    // Если solve:
    //   steps.length=4 (0,1,2,3)
    //   currentStep=6 → index=3

    if (isProblemParticipation) {
      return currentStep; // один к одному
    } else {
      // solve: шаги: 0,1,2,6 → по сути 4 шага
      if (currentStep < 3) {
        // шаги 0,1,2
        return currentStep;
      } else {
        // currentStep=6 соответствует последнему шагу массива steps
        return 3;
      }
    }
  };

  const visibleStepIndex = mapCurrentStepToVisibleStepIndex();

  // Схемы валидации для каждого шага
  const schemaStep0 = Yup.object().shape({
    firstName: Yup.string().required('Имя обязательно').matches(/^[А-Яа-яA-Za-z]+$/, 'Имя должно содержать только буквы'),
    lastName: Yup.string().required('Фамилия обязательна').matches(/^[А-Яа-яA-Za-z]+$/, 'Фамилия должна содержать только буквы'),
    fatherName: Yup.string().matches(/^[А-Яа-яA-Za-z]*$/, 'Отчество должно содержать только буквы'),
    phone: Yup.string().required('Телефон обязателен').matches(/^\+?[0-9]{10,15}$/, 'Введите корректный номер телефона'),
  });

  const schemaStep1 = Yup.object().shape({
    organization: Yup.string().required('Название место работы обязательно'),
    position: Yup.string().required('Должность обязательна'),
    rank: Yup.string().required('Звание обязательна'),
    degree: Yup.string().required('Степень обязательна'),
  });

  const schemaStep2 = Yup.object().shape({
    participationType: Yup.string().required('Выбор типа участия обязателен')
      .oneOf(['problem', 'solve'], 'Неверный тип участия')
  });

  
  const schemaStep3 = Yup.object().shape({ // О статье
    section: Yup.string().required('Раздел обязателен'),
    articleTitle: Yup.string().required('Название статьи обязательно'),
    articleCode: Yup.string().required('Код статьи обязателен'),
    // articleTitle: Yup.string().when('hasCode', {
    //   is: false,  // если нет кода, поле обязательно
    //   then: Yup.string().required('Название статьи обязательно'),
    //   otherwise: Yup.string().notRequired()
    // }),
    // articleCode: Yup.string().when('hasCode', {
    //   is: true,   // если пользователь вводит код
    //   then: Yup.string().required('Код статьи обязателен'),
    //   otherwise: Yup.string().required('Код генерируется автоматически') 
    // })
  });

  const schemaStep4 = Yup.object().shape({ // Форма участия
    participationForm: Yup.string().required('Выбор формы участия обязательна')
    .oneOf(['online', 'offline', 'mixed'], 'Неверный форма участия')
  });

  const schemaStep5 = Yup.object().shape({ // Вход в систему
    email: Yup.string().required('Email обязателен').email('Некорректный Email'),
    password: Yup.string().required('Пароль обязателен').min(6, 'Слишком короткий пароль')
  });

  const getSchemaForStep = (stepIndex) => {
    // stepIndex это глобальный индекс (0-6), а не visibleStepIndex
    switch (stepIndex) {
      case 0: return schemaStep0;
      case 1: return schemaStep1;
      case 2: return schemaStep2;
      case 3: return schemaStep3;
      case 4: return schemaStep4;
      case 5: return schemaStep5;
      default: return null;
    }
  };

  const handleNext = async () => {
    // При клике "Далее" валидируем текущий шаг
    const schema = getSchemaForStep(currentStep);
    if (schema) {
      try {
        await schema.validate(formData, { abortEarly: false });
        setValidationErrors({});

        // Если текущий шаг - выбор типа участия, то при смене нужно почистить данные
        if (currentStep === 2) {
          if (formData.participationType === 'solve') {
            // Очистить данные шагов 3,4,5, т.к. мы их пропускаем
            setFormData(prev => ({
              ...prev,
              articleTitle: '',
              articleThesis: '',
              section: '',
              participationForm: ''
            }));
          }
        }

        // Если пользователь выбрал "solve" и мы на шаге 2, пропускаем шаги 3,4,5
        if (currentStep === 2 && formData.participationType === 'solve') {
          // Пропускаем сразу к шагу 6 (последний)
          setCompletedSteps(prev => [...prev, currentStep]);
          // setCurrentStep(5);
          setCurrentStep(3);
        } else {
          // Иначе идём на следующий шаг
          setCompletedSteps([...completedSteps, currentStep]);
          setCurrentStep((prevStep) => prevStep + 1);
        }
      } catch (err) {
        if (err.name === 'ValidationError' && err.inner) {
          const errors = {};
          err.inner.forEach((error) => {
            errors[error.path] = error.message;
          });
          setValidationErrors(errors);
        } else {
          console.error('Unexpected error:', err);
        }
      }
    } else {
      // Нет схемы - значит просто идём дальше
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    // Если возвращаемся назад и меняем тип участия, лучше очистить пропускаемые поля
    // Но мы это уже делаем при выборе типа. Если пользователь вернётся назад и поменяет
    // выбор с solve на problem, ему придётся снова пройти шаг 2 и при выборе "problem" поля будут заполнены заново.
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmitForm = async () => {
    const schema = getSchemaForStep(currentStep);
    if (schema) {
      try {
        await schema.validate(formData, { abortEarly: false });
        setValidationErrors({});
        // Отправляем данные
        await dispatch(fetchRegister(formData));
      } catch (err) {
        if (err.name === 'ValidationError' && err.inner) {
          const errors = {};
          err.inner.forEach((error) => {
            errors[error.path] = error.message;
          });
          setValidationErrors(errors);
        } else {
          console.error('Unexpected error:', err);
          setErrorMessage('Ошибка регистрации. Попробуйте снова.');
        }
      }
    } else {
      try {
        await dispatch(fetchRegister(formData));
      } catch (error) {
        setErrorMessage('Ошибка регистрации. Попробуйте снова.');
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <Step1 formData={formData} setFormData={setFormData} validationErrors={validationErrors} />;
      case 1: return <Step2 formData={formData} setFormData={setFormData} validationErrors={validationErrors} />;
      case 2: return <Step3 formData={formData} setFormData={setFormData} currStep={formData.participationType === 'problem' ? 6 : 4} validationErrors={validationErrors} />;
      case 3: 
        // Если isProblemParticipation=true, рендерим Step4, иначе Step6 (Вход в систему)
        return isProblemParticipation ? (
          <Step4 formData={formData} setFormData={setFormData} currStep={formData.participationType === 'problem' ? 6 : 4} setValidationErrors={setValidationErrors} validationErrors={validationErrors} />
        ) : (
          <Step6 formData={formData} setFormData={setFormData} currStep={formData.participationType === 'problem' ? 6 : 4} setValidationErrors={setValidationErrors} validationErrors={validationErrors} />
        );
      case 4:
        // Этот шаг рендерим только если isProblemParticipation=true
        return isProblemParticipation && (
          <Step5 formData={formData} setFormData={setFormData} validationErrors={validationErrors} currStep={formData.participationType === 'problem' ? 6 : 4} setValidationErrors={setValidationErrors}/>
        );
      case 5:
        // Этот шаг рендерим только если isProblemParticipation=true
        return isProblemParticipation && (
          <Step6 formData={formData} setFormData={setFormData} currStep={formData.participationType === 'problem' ? 6 : 4} validationErrors={validationErrors} />
        );
      default:
        return null;
    }
  };

  // const renderStep = () => {
  //   // В зависимости от visibleStepIndex рендерим соответствующий компонент шага
  //   // visibleStepIndex - это индекс в текущем массиве steps, но компоненты привязаны к глобальному currentStep.
  //   // Мы можем решить так: просто использовать currentStep напрямую, зная, что при solve мы сразу currentStep=6.
  //   switch (currentStep) {
  //     case 0: return <Step1 formData={formData} setFormData={setFormData} validationErrors={validationErrors} />;
  //     case 1: return <Step2 formData={formData} setFormData={setFormData} validationErrors={validationErrors} />;
  //     case 2: return <Step3 formData={formData} setFormData={setFormData} currStep={formData.participationType === 'problem' ? 6 : 4} validationErrors={validationErrors} />;
  //     case 3: 
  //       // Этот шаг рендерим только если isProblemParticipation=true
  //       return isProblemParticipation && (
  //         <Step4 formData={formData} setFormData={setFormData} currStep={formData.participationType === 'problem' ? 6 : 4} validationErrors={validationErrors} />
  //       );
  //     case 4:
  //       return isProblemParticipation && (
  //         <Step5 formData={formData} setFormData={setFormData} validationErrors={validationErrors} currStep={formData.participationType === 'problem' ? 6 : 4} setValidationErrors={setValidationErrors}/>
  //       );
  //     case 5:
  //       return isProblemParticipation && (
  //         <Step6 formData={formData} setFormData={setFormData} currStep={formData.participationType === 'problem' ? 6 : 4} validationErrors={validationErrors} />
  //       );
  //     default:
  //       return null;
  //   }
  // };

  console.log(formData)

  return (
    <>
      <Container>
        <Row style={{height: '100vh'}} className='d-flex col align-items-center'>
          <Col className='col-12'>
            <div>
              <Stepper activeStep={visibleStepIndex} alternativeLabel>
                {steps.map((label, index) => (
                  <Step key={index} completed={completedSteps.includes(index)}>
                    <StepLabel
                    StepIconProps={{
                      sx: {
                        color: '#2196F3', // Изменить цвет кружка
                        fontSize: '26px', // Увеличить размер иконки (обычно размер зависит от fontSize)
                      },}}>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {errorMessage && (
                <Alert
                  variant="danger"
                  style={{ borderColor: 'red', marginTop: '20px', borderRadius: '6px' }}
                >
                  <div className="text-center">
                    <span>{errorMessage}</span>
                  </div>
                </Alert>
              )}
              <div style={{ marginTop: '20px' }}>{renderStep()}</div>
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  disabled={currentStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                  style={{borderRadius: '1px', boxShadow: 'none'}}
                >
                  Назад
                </Button>
                {currentStep < 5 && (
                  <Button
                    onClick={handleNext}
                    variant="contained"
                    style={{ marginLeft: 'auto', backgroundColor: '#2196F3',  borderRadius: '1px' }}
                  >
                    Далее
                  </Button>
                )}
                {currentStep === 5 && (
                  <Button
                    onClick={handleSubmitForm}
                    variant="contained"
                    style={{ marginLeft: 'auto', backgroundColor: '#2196F3',  borderRadius: '1px' }}
                  >
                    Отправить
                  </Button>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Registration;
