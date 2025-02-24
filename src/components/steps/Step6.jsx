
import React, { useState } from 'react';
import { Container, Row, Col, Form, Table, Button, FormCheck } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export const Step6 = ({ formData, setFormData, validationErrors }) => {
  const { t } = useTranslation();

  return (
    <Container style={{ padding: '0', height: '50vh' }}>
      <Row className='d-flex row justify-content-center'>
        <Col lg={4} xs={12}>
          <Row className='step-form d-flex row justify-content-center'>
            <Col xs={12} className="mt-3">
              <label className='mb-1'>{t('registration.step6.email')}</label>
              <input
                type="text"
                id='inpt1'
                className='form-control w-100'
                value={formData.email || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
              {validationErrors.email && <div style={{ color: 'red' }}>{validationErrors.email}</div>}
            </Col>
            <Col xs={12} className="mt-3">
              <label className='mb-1'>{t('registration.step6.password')}</label>
              <input
                type="password"
                className='form-control w-100'
                value={formData.password || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              />
              {validationErrors.password && <div style={{ color: 'red' }}>{validationErrors.password}</div>}
            </Col>
            <Col xs={12} className="mt-3">
              <label className='mb-1'>{t('registration.step6.confirmPassword')}</label>
              <input
                type="password"
                className='form-control w-100'
                value={formData?.confirmPassword || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              />
              {validationErrors.confirmPassword && <div style={{ color: 'red' }}>{validationErrors.confirmPassword}</div>}
            </Col>
            <Col xs={12} className="mt-3">
            <Form.Check
                type="checkbox"
                id="custom-checkbox"
                label= {<div>&nbsp;{t('registration.step6.agree')} </div>}
                checked={formData?.checked}
                className='is-checkedd'
                onChange={(e) => setFormData(prev => ({ ...prev, checked: e.target.checked }))}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
