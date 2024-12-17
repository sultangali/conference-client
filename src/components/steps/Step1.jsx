import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export const Step1 = ({ formData, setFormData, validationErrors }) => {

  const [phone, setPhone] = React.useState()

  React.useEffect(() => {
    setFormData(prev => ({ ...prev, phone: phone }))
  }, [phone])

  return (
    <div>
      <Container style={{ padding: '0', height: '50vh' }}>
        <br />
        <h3 className='text-start' style={{ fontWeight: '500', color: 'black' }}>Шаг 1 из 4. Личная информация</h3>
        <br />
        <Row className='d-flex row justify-content-center'>
          <Col lg={4} xs={12}>
            <Row className='step-form1 d-flex row justify-content-center'>
              <Col xs={12}>
                <input
                  type="text"
                  className='form-control inpt'
                  placeholder="Имя*"
                  value={formData.firstName || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                />
                {validationErrors.firstName && <div style={{ color: 'red' }}>{validationErrors.firstName}</div>}
              </Col>
              <Col xs={12}>
                <input
                  type="text"
                  placeholder="Фамилия*"
                  className='form-control w-100 inpt'
                  value={formData.lastName || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                />
                {validationErrors.lastName && <div style={{ color: 'red' }}>{validationErrors.lastName}</div>}
              </Col>
              <Col xs={12}>
                <input
                  type="text"
                  placeholder="Отчество"
                  className='form-control w-100 inpt'
                  value={formData.fatherName || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, fatherName: e.target.value }))}
                />
                {validationErrors.fatherName && <div style={{ color: 'red' }}>{validationErrors.fatherName}</div>}
              </Col>
              <Col xs={12}>
                <PhoneInput
                  defaultCountry="KZ"
                  placeholder="Телефон*"
                  style={{
                    paddingLeft: '8px',
                    paddingRight: '8px',
                  }}
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
