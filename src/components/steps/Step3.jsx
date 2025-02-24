import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export const Step3 = ({ formData, setFormData, validationErrors }) => {
    const { t } = useTranslation();
    
    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, participationType: e.target.value }));
    };

    return (
        <Container style={{ padding: '0' }}>
            <Row className='d-flex row align-items-center justify-content-center' style={{ padding: '0', height: '43vh' }}>
                <Col lg={6} xs={12}>
                    <Row className='step-form d-flex row justify-content-center'>
                        <Col lg={12} xs={12}>
                            <label>
                                <input
                                    type="radio"
                                    name="participationType"
                                    value="problem"
                                    checked={formData.participationType === 'problem'}
                                    onChange={handleChange}
                                />
                                &nbsp; {t('registration.step3.provideProblem')}
                            </label>
                        </Col>
                        <Col className='col-12'><br /></Col>
                        <Col lg={12} xs={12}>
                            <label>
                                <input
                                    type="radio"
                                    name="participationType"
                                    value="solve"
                                    checked={formData.participationType === 'solve'}
                                    onChange={handleChange}
                                />
                                &nbsp; {t('registration.step3.solveProblem')}
                            </label>
                        </Col>
                        <Col lg={12}>
                            {validationErrors.participationType && (
                                <div style={{ color: 'red' }}>{validationErrors.participationType}</div>
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};
