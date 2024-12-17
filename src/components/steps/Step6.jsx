import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'

export const Step6 = ({ formData, setFormData, validationErrors, currStep }) => {
  
  return (
    <div>
      <Container style={{ padding: '0', height: '50vh'  }}>
        <br />
        <h3 className='text-start' style={{fontWeight: '500', color: 'black'}}>Шаг { currStep } из { currStep }. Вход в систему</h3>
        <br />
        <Row className='d-flex row justify-content-center'>
          <Col lg={4} xs={12}>
            <Row className='step-form d-flex row justify-content-center'>
              <Col  xs={12}>
                <input
                  type="text"
                  className='form-control'
                  placeholder="Имя"
                  value={formData.email || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
                {validationErrors.email && <div style={{ color: 'red' }}>{validationErrors.email}</div>}
              </Col>
              <Col  xs={12}>
                <input
                  type="password"
                  placeholder="Пароль"
                  className='form-control w-100'
                  value={formData.password || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                />
                {validationErrors.password && <div style={{ color: 'red' }}>{validationErrors.password}</div>}
              </Col>
              <Col  xs={12}>
                <input
                  type="password"
                  placeholder="Потвердите пароль"
                  className='form-control w-100'
                  value={formData.password || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                />
                {validationErrors.password && <div style={{ color: 'red' }}>{validationErrors.password}</div>}
              </Col>

            </Row>
          </Col>
        </Row>

      </Container>

    </div>
  );
};
