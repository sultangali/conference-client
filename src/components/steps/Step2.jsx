import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export const Step2 = ({ formData, setFormData, validationErrors }) => {
  const { t } = useTranslation();
  const [showOtherPosition, setShowOtherPosition] = React.useState(false);
  const [showOtherRank, setShowOtherRank] = React.useState(false);
  const [showOtherDegree, setShowOtherDegree] = React.useState(false);

  return (
    <Container fluid style={{ padding: '0' }}>
      <Row className="d-flex row justify-content-center">
        <Col lg={4} xs={12}>
          <Row className="step-form d-flex row justify-content-center">
            <Col xs={12}>
              <Form.Label>{t('registration.step2.organizationLabel')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('registration.step2.organizationPlaceholder')}
                value={formData.organization || ''}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, organization: e.target.value }))
                }
              />
              {validationErrors.organization && (
                <div style={{ color: 'red' }}>{validationErrors.organization}</div>
              )}
            </Col>
            <Col xs={12} className='mt-3'>
              <Form.Label>{t('registration.step2.positions.positionLabel')}</Form.Label>
              <Form.Select
                aria-label="Position"
                className=""
                style={{ marginBottom: '10px' }}
                value={formData.position || ''}
                onChange={(e) => {
                  const selectedPosition = e.target.value;
                  setFormData((prev) => ({ ...prev, position: selectedPosition }));
                  setShowOtherPosition(selectedPosition === 'otherPosition');
                }}
              >
                <option value="">{t('registration.step2.positions.choose')}</option>
                <option value="researcher">{t('registration.step2.positions.researcher')}</option>
                <option value="lecturer">{t('registration.step2.positions.lecturer')}</option>
                <option value="companyRep">{t('registration.step2.positions.companyRep')}</option>
                <option value="doctoralStudent">{t('registration.step2.positions.doctoralStudent')}</option>
                <option value="mastersStudent">{t('registration.step2.positions.mastersStudent')}</option>
                <option value="student">{t('registration.step2.positions.student')}</option>
                {/* <option value="otherPosition">{t('registration.step2.positions.other')}</option> */}
              </Form.Select>
              {/* {showOtherPosition && (
                <Form.Control
                  type="text"
                  style={{ marginTop: '10px' }}
                  placeholder={t('step2.otherPositionPlaceholder')}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, position: e.target.value }))
                  }
                />
              )} */}
              {validationErrors.position && (
                <div style={{ color: 'red' }}>{validationErrors.position}</div>
              )}
            </Col>
            <Col xs={12} className="mt-2">
              <Form.Label>{t('registration.step2.rank.rankLabel')}</Form.Label>
              <Form.Select
                aria-label="Academic Rank"
                className=""
                value={formData.rank || ''}
                onChange={(e) => {
                  const selectedRank = e.target.value;
                  setFormData((prev) => ({ ...prev, rank: selectedRank }));
                  setShowOtherRank(selectedRank === 'otherRank');
                }}
              >
                <option value="">{t('registration.step2.rank.choose')}</option>
                <option value="professor">{t('registration.step2.rank.professor')}</option>
                <option value="associateProfessor">{t('registration.step2.rank.associateProfessor')}</option>
                <option value="-">-</option>
              </Form.Select>
              {showOtherRank && (
                <Form.Control
                  type="text"
                  style={{ marginTop: '10px' }}
                  placeholder={t('step2.otherRankPlaceholder')}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, rank: e.target.value }))
                  }
                />
              )}
              {validationErrors.rank && (
                <div style={{ color: 'red' }}>{validationErrors.rank}</div>
              )}
            </Col>
            <Col xs={12} className="mt-3">
              <Form.Label>{t('registration.step2.degree.degreeLabel')}</Form.Label>
              <Form.Select
                aria-label="Academic Degree"
                value={formData.degree || ''}
                onChange={(e) => {
                  const selectedDegree = e.target.value;
                  setFormData((prev) => ({ ...prev, degree: selectedDegree }));
                  setShowOtherDegree(selectedDegree === 'otherDegree');
                }}
              >
                <option value="">{t('registration.step2.degree.choose')}</option>
                <option value="doctorOfSciences">{t('registration.step2.degree.doctorOfSciences')}</option>
                <option value="candidateOfSciences">{t('registration.step2.degree.candidateOfSciences')}</option>
                <option value="phd">{t('registration.step2.degree.phd')}</option>
                <option value="master">{t('registration.step2.degree.master')}</option>
                <option value="bachelor">{t('registration.step2.degree.bachelor')}</option>
                <option value="-">-</option>
              </Form.Select>
              {showOtherDegree && (
                <Form.Control
                  type="text"
                  style={{ marginTop: '10px' }}
                  placeholder={t('step2.otherDegreePlaceholder')}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, degree: e.target.value }))
                  }
                />
              )}
              {validationErrors.degree && (
                <div style={{ color: 'red' }}>{validationErrors.degree}</div>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
      <br />
    </Container>
  );
};
