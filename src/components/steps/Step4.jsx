import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';

import sec1 from '../../assets/sec1.png'
import sec2 from '../../assets/sec2.png'
import sec3 from '../../assets/sec3.png'
import sec4 from '../../assets/sec4.png'
import sec5 from '../../assets/sec5.png'

export const Step4 = ({ formData, setFormData, validationErrors, setValidationErrors, currStep }) => {
  // Читаем текущий сценарий из formData (если хотим, чтобы он сохранялся при переходе меж шагами)
  const [hasCode, setHasCode] = useState(formData.hasCode || false);
  const [codeInput, setCodeInput] = useState('');
  const [checkMessage, setCheckMessage] = useState('');
  const [articleInfo, setArticleInfo] = useState(null);

  // Соавторы
  const [coauthors, setCoauthors] = useState(formData.coauthors || []);
  const [file, setFile] = useState(null);

  // Код статьи
  const [articleCode, setArticleCode] = useState(formData.articleCode || '');

  // Сохраняем hasCode в formData, чтобы схема Yup могла различать сценарии
  useEffect(() => {
    setFormData(prev => ({ ...prev, hasCode }));
  }, [hasCode]);

  const [initialCode, setInitialCode] = useState(null);


  const options = [
    {
      value: 'section-1',
      label: 'Математическое моделирование: Математические модели в физике, химии, биологии, экономике.',
      image: sec1,
    },
    {
      value: 'section-2',
      label: 'Вычислительная химия и биология: Моделирование сложных систем, квантовые вычисления.',
      image: sec2,
    },
    {
      value: 'section-3',
      label: 'Искусственный интеллект и машинное обучение: Применение ИИ в научных исследованиях, обработка больших данных.',
      image: sec3,
    },
    {
      value: 'section-4',
      label: 'Прикладная механика и робототехника.',
      image: sec4,
    },
    {
      value: 'section-5',
      label: 'Проблемы перевода научной терминологии.',
      image: sec5,
    },
  ];

  const getSectionName = (section) => {
    switch (section) {
      case 'section-1':
        return 'Математическое моделирование: Математические модели в физике, химии, биологии, экономике.'
      case 'section-2':
        return 'Вычислительная химия и биология: Моделирование сложных систем, квантовые вычисления.'
      case 'section-3':
        return 'Искусственный интеллект и машинное обучение: Применение ИИ в научных исследованиях, обработка больших данных.'
      case 'section-4':
        return 'Прикладная механика и робототехника.'
      case 'section-5':
        return 'Проблемы перевода научной терминологии.'
    }
  }

  const handleSectionChange = (event) => {
    setFormData((prev) => ({ ...prev, section: event.target.value }));
    setValidationErrors(prev => ({...prev,  section: ''}))
  };

  useEffect(() => {
    // Проверяем, был ли уже сгенерирован начальный код
    if (!initialCode) {
      const newCode = generateArticleCode();
      setInitialCode(newCode); // Сохраняем начальный код
      setArticleCode(newCode);
      setFormData(prev => ({ ...prev, articleCode: newCode }));
    }

    // Очищаем код при переключении на создание новой статьи, 
    // но используем initialCode вместо генерации нового
    if (!hasCode) {
      setArticleCode(initialCode); // Используем initialCode
      setFormData(prev => ({ ...prev, articleCode: initialCode }));
    }
  }, [hasCode, initialCode]); // Добавляем initialCode в зависимости

  // Генерировать код только если hasCode = false (пользователь создаёт статью)
  // и если articleCode ещё не задан.
  //   useEffect(() => {
  //     // Проверяем, был ли уже сгенерирован код
  //     const hasGeneratedCode = !!formData.articleCode;

  //     if (!hasCode && !hasGeneratedCode) {
  //       const newCode = generateArticleCode();
  //       setArticleCode(newCode);
  //       setFormData(prev => ({ ...prev, articleCode: newCode }));
  //     } 
  //   }, []); // Пустой массив зависимостей гарантирует, что эффект выполнится только один раз

  // useEffect(() => {
  //     // ... ваш код для генерации кода при первом рендеринге ...

  //     // Очищаем код при переключении на создание новой статьи
  //     if (!hasCode) { 
  //       const newCode = generateArticleCode(); // Генерируем новый код
  //       setArticleCode(newCode);
  //       setFormData(prev => ({ ...prev, articleCode: newCode }));
  //     }
  //   }, [hasCode]); // Добавляем hasCode в зависимости, чтобы эффект срабатывал при изменении галочки

  // При изменении массива соавторов обновляем formData
  useEffect(() => {
    setFormData(prev => ({ ...prev, coauthors }));
  }, [coauthors]);

  // Синхронизируем articleCode с formData
  useEffect(() => {
    setFormData(prev => ({ ...prev, articleCode }));
  }, [articleCode]);

  // Генерация кода с учётом section (если есть)
  function generateArticleCode() {
    let prefix = 'BUKETOV-';
    if (formData.section && formData.section.length >= 9) {
      prefix =
        'BUKETOV-' +
        formData.section.substring(0, 3).toUpperCase() +
        formData.section.substring(8, 9) +
        '-';
    }
    return prefix + Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  // Обработка изменения полей статьи
  const handleArticleTitleChange = (e) => {
    setFormData(prev => ({ ...prev, articleTitle: e.target.value }));
    setValidationErrors(prev => ({...prev,  articleTitle: ''}));
  };

  const handleAddCoauthor = () => {
    setCoauthors(prev => [...prev, { firstName: '', lastName: '', fatherName: '' }]);
  };

  const handleRemoveCoauthor = (index) => {
    setCoauthors(prev => prev.filter((_, i) => i !== index));
  };

  const handleCoauthorChange = (index, field, value) => {
    setCoauthors(prev => {
      const newArray = [...prev];
      newArray[index] = { ...newArray[index], [field]: value };
      return newArray;
    });
  };

  // Загрузка файла
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadDocument = async () => {
    if (formData.section == '') { setValidationErrors(prev => ({...prev,  section: 'Вы забыли указать секцию'})); return;}
    if (formData.articleTitle == '') {setValidationErrors(prev => ({...prev,  articleTitle: 'Вы забыли указать тему статьи'})); return;}
    if (!file) return;
    try {
      const formDataFile = new FormData();
      formDataFile.append('file', file);
      formDataFile.append('title', formData.articleTitle)
      formDataFile.append('code', formData.articleCode)
      formDataFile.append('section', formData.section)

      const response = await fetch('http://localhost:5000/api/upload/article', {
        method: 'POST',
        body: formDataFile
      });

      if (!response.ok) throw new Error('Ошибка при загрузке файла');

      const result = await response.json();

      setFormData(prev => ({ ...prev, articleFileUrl: result?.article?.file_url }))
      setFormData(prev => ({ ...prev, file: formDataFile.get('file') }))
      alert(result.message, 'Файл успешно загружен!');
    } catch (err) {
      console.error(err);
      alert('Ошибка при загрузке файла');
    }
  };

  // Копировать код
  const handleCopyCode = () => {
    if (!articleCode) return;
    navigator.clipboard.writeText(articleCode)
      .then(() => alert('Код скопирован в буфер обмена!'))
      .catch(err => console.error(err));
  };

  // Проверка кода статьи (для соавторов)
  const handleCheckCode = async () => {
    if (!codeInput.trim()) {
      setValidationErrors(prev => ({
        ...prev,
        articleCode: 'Пожалуйста, введите код статьи.'
      }));
      return;
    }
    // Очищаем ошибки
    setValidationErrors(prev => ({ ...prev, articleCode: '' }));
    setCheckMessage('');

    try {
      setArticleInfo(null)
      const response = await fetch('http://localhost:5000/api/articles/check-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeInput })
      });
      const result = await response.json();
      console.log('result', result)
      if (!result.found) {
        setArticleInfo(null);
        setValidationErrors(prev => ({
          ...prev,
          articleCode: 'Статья с таким кодом не найдена. Проверьте код.'
        }));
      } else {
        setArticleInfo({
          title: result.title,
          author: result?.author?.email,
          url: result.file_url,
          section: result.section
        });
        setCheckMessage('Статья найдена!');
        // setFormData(prev => ({ ...prev, articleTitle: '' }));
        setFormData(prev => ({ ...prev, articleCode: '' }));
        setValidationErrors(prev => ({ ...prev, articleCode: '' }));
        // Сохраняем код в formData.articleCode

        setArticleCode(codeInput);
      }
    } catch (error) {
      console.error(error);
      setValidationErrors(prev => ({
        ...prev,
        articleCode: 'Произошла ошибка при проверке кода.'
      }));
    }
  };

  useEffect(() => {
    if (articleInfo?.title) {
      setFormData(prev => ({ ...prev, articleTitle: articleInfo.title }));
      setFormData(prev => ({ ...prev, section: articleInfo.section }));
    }
  }, [articleInfo])

  return (
    <Container className="mt-4" style={{ padding: '0', height: 'auto' }}>
      <h2>Шаг 5 из {currStep}. О статье</h2>

      {/* Чекбокс: уже есть код или создаём новую статью */}
      <Row className="mt-3 d-flex row justify-content-center">
        <Col md={6}>
          <Form.Group>
            <Form.Check
              type="checkbox"
              label="У меня уже есть код статьи"
              checked={hasCode}
              onChange={() => {
                const newHasCode = !hasCode;
                setHasCode(newHasCode);
                setArticleInfo(null);
                setCheckMessage('');
              }}
            />
          </Form.Group>
        </Col>
      </Row>

      {hasCode ? (
        <Row className="mt-4 d-flex row justify-content-center step5-from" style={{ height: 'auto' }}>
          <Col md={6}>
            <InputGroup className="mb-3">
              <Form.Label className="w-100">Введите код приглашения</Form.Label>
              <Form.Control
                type="text"
                placeholder="BUKETOV-XXX-XXXXXX"
                onChange={(e) => setCodeInput(e.target.value)}
                isInvalid={!!validationErrors.articleCode}
              />
              <Button
                variant="info"
                className="code-generation-btn"
                id="button-addon2"
                onClick={handleCheckCode}
              >
                Проверить статью
              </Button>

              <Form.Control.Feedback type="invalid">
                {validationErrors.articleCode}
              </Form.Control.Feedback>
            </InputGroup>
            {validationErrors.articleTitle && (
                                <div className='w-100' style={{ color: 'orange' }}>Вы должны подключиться к какой-то статье либо уберите галочку чтобы создать свою</div>
                            )}
            <p className="mt-2" style={{ color: '#555', fontSize: '16px' }}>
              Введите код, чтобы привязаться к уже существующей статье, созданной другим автором.
            </p>

            {checkMessage && (
              <div style={{ marginTop: '10px', color: articleInfo ? 'green' : 'red' }}>
                {checkMessage}
              </div>
            )}
            {articleInfo && (
              <div className='w-100 founded-article-card' >
                <p className='article-title'><strong>{articleInfo.title}</strong></p>
                <p className='article-section'>Секция: <strong>{getSectionName(articleInfo.section)}</strong></p>
                <p className='article-main-author'>Основной автор: <strong>{articleInfo.author}</strong></p>
                <hr />
                <a className='btn btn-primary code-generation-btn'  target="_blank" href={`http://localhost:5000${articleInfo.url}`}>Посмотреть</a>
              </div>
            )}
          </Col>
        </Row>
      ) : (
        <>
          {/* Если пользователь создаёт статью */}

          <Row className="mt-2 d-flex row justify-content-center step-form">
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Select value={formData.section} onChange={handleSectionChange} isInvalid={!!validationErrors.section}>
                  <option value="">Выберите раздел</option>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      <img src={option.image} style={{ width: '2rem', marginRight: '10px' }} alt="" />
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{validationErrors.section}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-1 d-flex row justify-content-center step-form">
            <Col md={6}>
              <Form.Group className="mb-3" controlId="articleTitle">
                <Form.Control
                  type="text"
                  placeholder="Введите название статьи"
                  value={formData.articleTitle || ''}
                  onChange={handleArticleTitleChange}
                  isInvalid={!!validationErrors.articleTitle}
                />
                <Form.Control.Feedback type="invalid">
                  {validationErrors.articleTitle}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Соавторы */}
          <Row className="mt-2 d-flex row justify-content-center step5-from">
            <Col md={6}>
              {coauthors.map((coauthor, index) => (
                <Row key={index} className="mb-2">
                  <Col md={3}>
                    <Form.Control
                      className="w-100"
                      type="text"
                      placeholder="Фамилия"
                      value={coauthor.lastName}
                      onChange={(e) => handleCoauthorChange(index, 'lastName', e.target.value)}
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Control
                      className="w-100"
                      type="text"
                      placeholder="Имя"
                      value={coauthor.firstName}
                      onChange={(e) => handleCoauthorChange(index, 'firstName', e.target.value)}
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Control
                      className="w-100"
                      type="text"
                      placeholder="Отчество"
                      value={coauthor.fatherName}
                      onChange={(e) => handleCoauthorChange(index, 'fatherName', e.target.value)}
                    />
                  </Col>
                  <Col md={3}>
                    <Button
                      variant="danger"
                      className="w-100 remove-coauthor-btn"
                      onClick={() => handleRemoveCoauthor(index)}
                    >
                      Удалить
                    </Button>
                  </Col>
                </Row>
              ))}
              <Button className="add-coauthor-btn" onClick={handleAddCoauthor}>
                Добавить соавтора
              </Button>
            </Col>
          </Row>

          {/* Код статьи (генерация) */}
          <Row className="mt-3 d-flex row justify-content-center step5-from">
            <Col md={6}>
              <InputGroup>
                <Form.Label className="w-100">Код статьи (приглашения)</Form.Label>
                <Form.Control
                  type="text"
                  value={articleCode}
                  readOnly
                />
                <Button className="code-generation-btn" onClick={handleCopyCode}>
                  Скопировать
                </Button>
              </InputGroup>
            </Col>
          </Row>

          {/* Загрузка документа */}
          <Row className="mt-3 d-flex row justify-content-center step5-from">
            <Col md={6}>
              <InputGroup>
                <Form.Label className="w-100">Прикрепить документ (PDF/DOCX)</Form.Label>
                <Form.Control
                  type="file"
                  
                  onChange={handleFileChange}
                />
                <Button
                  className="article-upload-btn"
                  variant="success"
                  onClick={handleUploadDocument}> 
                  Загрузить документ
                </Button>
              </InputGroup>
              {formData.articleFileUrl && (
                <div className="mt-2" style={{ color: 'green' }}>
                  Файл загружен:{' '}
                  <a href={`http://localhost:5000${formData.articleFileUrl}`} target="_blank" rel="noreferrer">
                    Просмотреть
                  </a>
                </div>
              )}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};
