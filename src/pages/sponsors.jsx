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
                height: '200vh',
                backgroundSize: 'cover'
                 ,background: `url(${largeTriangles2})`
            }}>
            <Container className="participants">
                <Row>
                    <Col className="participants-list"  md={12}>
                        <h3 className="mb-4">{t('sponsors.title')}</h3>
                        {/* <p  style={{margin: '0', fontWeight: '300'}}>{t('sponsors.p1')}</p> */}
                        {/* <hr /> */}
                       <iframe src="/program.pdf" width="100%" height="1500px" style={{border: '1px solid #2196F3', boxShadow: '1px 1px 8px rgba(43, 158, 252, 0.58)'}}/>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};
