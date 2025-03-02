import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import largeTriangles2 from '../assets/subtle-prism3.svg';
import { useTranslation } from "react-i18next";

export const Sponsors = () => {
    const { t } = useTranslation()
    return (
        <Container fluid className=""
            style={{
                paddingTop: '0px',
                paddingBottom: '8rem',
                backgroundRepeat: 'repeat',
                height: '100vh',
                backgroundSize: 'cover'
                 ,background: `url(${largeTriangles2})`
            }}>
            <Container className="participants">
                <Row>
                    <Col className="participants-list"  md={12}>
                        <h3 className="mb-4">{t('sponsors.title')}</h3>
                        <p  style={{margin: '0', fontWeight: '300'}}>{t('sponsors.p1')}</p>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};
