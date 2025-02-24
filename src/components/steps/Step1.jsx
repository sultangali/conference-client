import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

export const Step1 = ({ formData, setFormData, validationErrors }) => {
  const { t } = useTranslation();
  const [phone, setPhone] = React.useState(formData.phone || '');

  React.useEffect(() => {
    setFormData(prev => ({ ...prev, phone: phone }));
  }, [phone]);

  return (
    <div>
      <Container style={{ padding: '0', height: '50vh' }}>
        <Row className='d-flex row justify-content-center'>
          <Col lg={4} xs={12}>
            <Row className='step-form1 d-flex row justify-content-center'>
            <Col xs={12}>
                <input
                  type="text"
                  placeholder={t('registration.step1.lastName')}
                  className='form-control w-100 inpt'
                  value={formData.lastName || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                />
                {validationErrors.lastName && <div style={{ color: 'red' }}>{validationErrors.lastName}</div>}
              </Col>
              <Col xs={12}>
                <input
                  type="text"
                  className='form-control inpt'
                  placeholder={t('registration.step1.firstName')}
                  value={formData.firstName || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                />
                {validationErrors.firstName && <div style={{ color: 'red' }}>{validationErrors.firstName}</div>}
              </Col>
              
              <Col xs={12}>
                <input
                  type="text"
                  placeholder={t('registration.step1.fatherName')}
                  className='form-control w-100 inpt'
                  value={formData.fatherName || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, fatherName: e.target.value }))}
                />
                {validationErrors.fatherName && <div style={{ color: 'red' }}>{validationErrors.fatherName}</div>}
              </Col>
              <Col xs={12}>
                <PhoneInput
                  defaultCountry="KZ"
                  placeholder={t('registration.step1.phone')}
                  style={{ paddingLeft: '8px', paddingRight: '8px' }}
                  className='inpt'
                  value={formData.phone || phone}
                  onChange={setPhone}
                />
                {validationErrors.phone && <div style={{ color: 'red' }}>{validationErrors.phone}</div>}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
