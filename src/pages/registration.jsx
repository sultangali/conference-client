import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { Alert, Container, Row, Col } from 'react-bootstrap';
import { Stepper, Step, StepLabel, Button } from '@mui/material';
import * as Yup from 'yup';
import { fetchRegister, selectIsAuth } from '../redux/slices/user.js';
import { useTranslation } from 'react-i18next';

import { Step1, Step2, Step3, Step4, Step5, Step6 } from '../components/steps/index.js';

const Registration = () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({})
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    fatherName: '',
    phone: '',
    organization: '',
    position: '',
    rank: '',
    degree: '',
    participationType: '', // problem / solve
    section: '',
    articleTitle: '',
    coauthors: [],
    articleFile: null,
    participationForm: '', // форма участия (online/offline/mixed) для problem
    email: '',
    password: '',
    confirmPassword: '',
  });

  // === Лейблы шагов ===
  const labels = [
    t('registration.step1.title'),
    t('registration.step2.title'),
    t('registration.step3.title'),
    formData.participationType === 'problem' ? t('registration.step4') : null,
    t('registration.step5'),
    t('registration.step6.title')
  ].filter(Boolean);

  // === Компоненты шагов ===
  const stepsComponents = [
    <Step1 formData={formData} setFormData={setFormData} validationErrors={validationErrors} />,
    <Step2 formData={formData} setFormData={setFormData} validationErrors={validationErrors} />,
    <Step3 formData={formData} setFormData={setFormData} validationErrors={validationErrors} />,
    formData.participationType === 'problem' ? <Step4 formData={formData} setFormData={setFormData} validationErrors={validationErrors} /> : null,
    <Step5 formData={formData} setFormData={setFormData} validationErrors={validationErrors} />,
    <Step6 formData={formData} setFormData={setFormData} validationErrors={validationErrors} />
  ].filter(Boolean);

  // === Валидация ===
  const validationSchemas = [
    Yup.object().shape({ firstName: Yup.string().required(t('validation.firstName')), lastName: Yup.string().required(t('validation.lastName')), phone: Yup.string().required(t('validation.phone')) }),
    Yup.object().shape({ organization: Yup.string().required(t('validation.organization')) }),
    Yup.object().shape({ participationType: Yup.string().required(t('validation.participationType')).oneOf(['problem', 'solve']) }),
    formData.participationType === 'problem' ? Yup.object().shape({
      section: Yup.string().required(t('validation.section')),
      articleTitle: Yup.string().required(t('validation.articleTitle')),
    }) : null,
    Yup.object().shape({ participationForm: Yup.string().required(t('validation.participationForm')) }),
    Yup.object().shape({ email: Yup.string().required(t('validation.email.req')).email(t('validation.email.invalid')), password: Yup.string().required(t('validation.password')).min(6, t('validation.atleast')), confirmPassword: Yup.string().required(t('validation.confirmPassword')).oneOf([Yup.ref('password'), null], t('validation.passwordMatch')) })
  ].filter(Boolean);

  // === Валидация текущего шага ===
  async function validateCurrentStep() {
    const schema = validationSchemas[currentStep];
    if (!schema) return true;
    try {
      await schema.validate(formData, { abortEarly: false });
      setValidationErrors({});
      return true;
    } catch (err) {
      if (err.name === 'ValidationError') {
        const errorsObj = {};
        err.inner.forEach((error) => {
          errorsObj[error.path] = error.message;
        });
        setValidationErrors(errorsObj);
      }
      return false;
    }
  }

  // === Следующий шаг ===
  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (!isValid) return;
    if (currentStep < labels.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmitForm();
    }
  };

  // === Назад ===
  const handleBack = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // === Отправка формы ===
  const handleSubmitForm = async () => {
    try {
      setLoading(true); // Включаем спиннер перед отправкой
      const response = await dispatch(fetchRegister(formData));

      if (response?.payload?.token) {
        setErrorMessage(""); // Очистить ошибки
        localStorage.setItem("token", response.payload.token);
        window.location.assign("/profile");
      } else {
        setErrorMessage(response?.payload?.message || t('errors.registrationFailed'));
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(t('errors.registrationFailed'));
    } finally {
      setLoading(false); // Отключаем спиннер после завершения запроса
    }
  };


  if (isAuth) return <Navigate to="/profile" />;

  return (
    <Container>
      <Row className="d-flex align-items-center" style={{ minHeight: '100vh' }}>
        <Col>
          <h2>{t('registration.title')} ({t('registration.step')} {currentStep + 1} {t('registration.of')} {labels.length})</h2>
          <br />
          <Stepper activeStep={currentStep} alternativeLabel style={{ marginBottom: '20px' }}>
            {labels.map((label, index) => (
              <Step key={index} completed={index < currentStep}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Container>
            <Row className='d-flex col justify-content-center'>
              <Col md={4}>
                {errorMessage &&
                  <Alert
                    variant={errorMessage ? "danger" : "primary"}
                    style={errorMessage ? { borderColor: "red", borderRadius: '0' } : { borderRadius: "0" }}>
                    <div className="text-center" style={{ margin: "-12px" }}>
                      <span>{errorMessage}</span>
                    </div>
                  </Alert>
                }
              </Col>
            </Row>
          </Container>
          {stepsComponents[currentStep]}
          <div style={{ marginTop: '20px' }} className="d-flex justify-content-between">
            <Button variant="secondary" onClick={handleBack} style={{
              border: '1px solid #098cf7',
              borderRadius: '0px',
              color: '#098cf7'
            }} disabled={currentStep === 0} >{t('registration.buttons.back')}</Button>

            <Button
              variant="primary"
              style={{
                border: '1px solid #098cf7',
                borderRadius: '0px',
                color: 'white',
                backgroundColor: '#098cf7'
              }}
              onClick={handleNext}
              disabled={loading} // Блокируем кнопку во время загрузки
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  {" "}&nbsp;&nbsp;{t('registration.buttons.submit')}
                </>
              ) : (
                currentStep === labels.length - 1 ? t('registration.buttons.submit') : t('buttons.next')
              )}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;
