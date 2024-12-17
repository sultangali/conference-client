import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

export const Step2 = ({ formData, setFormData, validationErrors }) => {

  const [showOtherInput, setShowOtherInput] = React.useState(false)
  const [showRankInput, setShowRankInput] = React.useState(false)
  const [showDegreeInput, setShowDegreeInput] = React.useState(false)

  return (
    <Container style={{ padding: '0', height: 'auto' }}>
      <br />
      <h3 className='text-start' style={{ fontWeight: '500', color: 'black' }}>Шаг 2 из 4. Место работы</h3>
      <br />
      <Row className='d-flex row justify-content-center'>
        <Col lg={4} xs={12}>
          <Row className='step-form d-flex row justify-content-center'>
            <Col xs={12}>
              <input
                type="text"
                placeholder="Место работы"
                className='form-control w-100'
                value={formData.organization || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
              />
              {validationErrors.organization && <div style={{ color: 'red' }}>{validationErrors.organization}</div>}
            </Col>
            <Col xs={12}>
              <Form.Select
                aria-label="Position"
                style={{ marginBottom: '10px' }}
                // value={formData.position || ''}
                className=''

                onChange={(e) => {
                  const selectedPosition = e.target.value;
                  setFormData(prev => ({ ...prev, position: selectedPosition }));
                  // Если выбрано "Другое", показываем input
                  if (selectedPosition === "other") {
                    setShowOtherInput(true);
                  } else {
                    setShowOtherInput(false);
                  }
                }}
              >
                <option value="">Выберите должность</option>
                <option value="Professor">Профессор</option>
                <option value="Researcher">Научный сотрудник</option>
                <option value="Engineer">Инженер</option>
                <option value="Teacher">Преподаватель</option>
                <option value="SeniorTeacher">Старший преподаватель</option>
                <option value="LaboratoryAssistant">Лаборант</option>
                <option value="HeadOfDepartment">Заведующий кафедрой</option>
                <option value="DeputyDean">Заместитель декана</option>
                <option value="Dean">Декан</option>
                <option value="other">Другая должность</option>
              </Form.Select>

              {showOtherInput && (
                <Form.Control
                  type="text"
                  className=''
                  style={{ marginTop: '10px', borderTopWidth: '1px' }}
                  placeholder="Введите вашу должность"
                  // value={formData.position || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                />
              )}
              {validationErrors.position && <div style={{ color: 'red' }}>{validationErrors.position}</div>}
            </Col>
            <Col xs={12}>
              <Form.Select
                className=''
                aria-label="Academic Rank"
                // value={formData.rank || ''}
                onChange={(e) => {
                  const selectedRank = e.target.value;
                  setFormData(prev => ({ ...prev, rank: selectedRank }))
                  if (selectedRank === "otherrank") {
                    setShowRankInput(true);
                  } else {
                    setShowRankInput(false);
                  }
                }}
              >
                <option value="">Выберите ученое звание</option>
                <option value="Professor">Профессор</option>
                <option value="SeniorResearcher">Старший научный сотрудник</option>
                <option value="AssociateProfessor">Доцент</option>
                <option value="AssistantProfessor">Ассистент профессора</option>
                <option value="Researcher">Научный сотрудник</option>
                <option value="JuniorResearcher">Младший научный сотрудник</option>
                <option value="GraduateStudent">Аспирант</option>
                <option value="Student">Студент</option>
                <option value="otherrank">Другое звание</option>
              </Form.Select>
              {showRankInput && (
                <Form.Control
                  type="text"
                  className=''
                  style={{ marginTop: '10px', borderTopWidth: '1px', marginBottom: '0' }}
                  placeholder="Введите ваше учёное звание"
                  onChange={(e) => setFormData(prev => ({ ...prev, rank: e.target.value }))}
                />
              )}
              {validationErrors.rank && <div style={{ color: 'red' }}>{validationErrors.rank}</div>}
            </Col>
            <Col xs={12}>
              <Form.Select
                aria-label="Academic Degree"
                style={{ marginTop: '10px' }}
                // value={formData.degree || ''}
                onChange={(e) => {
                  const selectedDegree = e.target.value;
                  setFormData(prev => ({ ...prev, degree: selectedDegree }))
                  if (selectedDegree === "otherdegree") {
                    setShowDegreeInput(true);
                  } else {
                    setShowDegreeInput(false);
                  }
                }}
              >
                <option value="">Выберите ученую степень</option>
                <option value="DoctorOfScience">Доктор наук (DSc)</option>
                <option value="CandidateOfScience">Кандидат наук (PhD)</option>
                <option value="MasterOfScience">Магистр наук (MSc)</option>
                <option value="BachelorOfScience">Бакалавр наук (BSc)</option>
                <option value="otherdegree">Другая степень</option>
                {/* Добавьте другие варианты ученых степеней */}
              </Form.Select>
              {showDegreeInput && (
                <Form.Control
                  type="text"
                  className=''
                  style={{ marginTop: '10px', borderTopWidth: '1px', marginBottom: '0' }}
                  placeholder="Введите вашу ученую степень"
                  onChange={(e) => setFormData(prev => ({ ...prev, degree: e.target.value }))}
                />
              )}
              {validationErrors.degree && <div style={{ color: 'red' }}>{validationErrors.degree}</div>}
            </Col>
          </Row>
        </Col>
      </Row>
      <br />
    </Container>

  );
};
