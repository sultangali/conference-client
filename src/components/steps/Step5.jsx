import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export const Step5 = ({ formData, setFormData, validationErrors, currStep }) => {
    
    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, participationForm: e.target.value }));
    };

    return (

        <Container >
            <br />
            <h3 className='text-start' style={{ fontWeight: '500', color: 'black' }}>Шаг 6 из {currStep}. Форма участия</h3>
            <Row className='d-flex row align-items-center justify-content-center' style={{ padding: '0', height: '43vh' }}>
                <Col lg={6} xs={12}>
                    <Row className='step-form d-flex row justify-content-center'>
                        <Col lg={12} xs={12}>
                            <label>
                                <input
                                    type="radio"
                                    name="participationForm"
                                    value="online"
                                    checked={formData.participationForm === 'online'}
                                    onChange={handleChange}
                                />
                                &nbsp; Онлайн
                            </label>
                        </Col>
                        <Col className='col-12'><br /></Col>
                        <Col lg={12} xs={12}>
                            <label>
                                <input
                                    type="radio"
                                    name="participationForm"
                                    value="offline"
                                    checked={formData.participationForm === 'offline'}
                                    onChange={handleChange}
                                />
                                &nbsp; Офлайн
                            </label>

                        </Col>
                        <Col className='col-12'><br /></Col>
                        <Col lg={12} xs={12}>
                            <label>
                                <input
                                    type="radio"
                                    name="participationForm"
                                    value="mixed"
                                    checked={formData.participationForm === 'mixed'}
                                    onChange={handleChange}
                                />
                                &nbsp; Смешанный
                            </label>

                        </Col>
                        <Col lg={12}>
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
