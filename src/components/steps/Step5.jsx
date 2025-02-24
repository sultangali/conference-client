import React from 'react';
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export const Step5 = ({ formData, setFormData, validationErrors }) => {
  const { t } = useTranslation();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, participationForm: e.target.value }));
  };

  return (
    <Container>
      <Row style={{ height: '40vh' }} className="d-flex row align-items-center justify-content-center">
        <Col lg={6} xs={12}>
          <Row className="step-form d-flex row justify-content-center">
            <Col lg={12} xs={12}>
              <label>
                <input
                  type="radio"
                  name="participationForm"
                  value="online"
                  checked={formData.participationForm === 'online'}
                  onChange={handleChange}
                />
                &nbsp; {t('participation_form.online')}
              </label>
            </Col>
            <Col lg={12} xs={12} style={{ marginTop: '10px' }}>
              <label>
                <input
                  type="radio"
                  name="participationForm"
                  value="offline"
                  checked={formData.participationForm === 'offline'}
                  onChange={handleChange}
                />
                &nbsp; {t('participation_form.offline')}
              </label>
            </Col>
            <Col lg={12} xs={12} style={{ marginTop: '10px' }}>
              <label>
                <input
                  type="radio"
                  name="participationForm"
                  value="mixed"
                  checked={formData.participationForm === 'mixed'}
                  onChange={handleChange}
                />
                &nbsp; {t('participation_form.mixed')}
              </label>
            </Col>
            <Col lg={12} className='mt-2'>
              {validationErrors.participationForm && (
                <div style={{ color: 'red' }}>{validationErrors.participationForm}</div>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
