import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import largeTriangles2 from '../assets/subtle-prism3.svg';
import { useTranslation } from "react-i18next";

export const Details = () => {
    const { t } = useTranslation()
    return (
        <Container fluid className=""
            style={{
                paddingTop: '0px',
                paddingBottom: '8rem',
                backgroundRepeat: 'repeat',
                backgroundSize: 'cover'
                 ,background: `url(${largeTriangles2})`
            }}>
            <Container className="participants" 
            // style={ participants?.length < 20 && {
            //     height: '90vh'
            // }}
            >
                <Row>
                    <Col className="participants-list"  md={12}>
                        <h3 className="mb-4">{t('details.title')}</h3>
                        <p  style={{margin: '0',fontSize: '15px', fontWeight: '300'}}><b style={{fontWeight: 'bold'}}>{t('details.b1')}</b> {" "}{t('details.p1')}</p>
                        <hr />
				<p style={{margin: '0',fontSize: '15px', fontWeight: 'bold'}}>{t('details.b4')}</p>
                        <ul>
                                <li>10 000 {t('details.la1')}</li>
                                <li>20 USD {t('details.la2')}</li>
                        </ul>
                        <p style={{margin: '0', fontSize: '15px', fontWeight: '300'}}>{t('details.p10')}</p>                       
			<hr />
 <p  style={{margin: '0',fontSize: '15px', fontWeight: '300'}}>{t('details.p2')}</p>
                        
                        <p style={{margin: '0',fontSize: '15px', fontWeight: '300'}}>БИН 990540002444</p>
<p  style={{margin: '0',fontSize: '15px', fontWeight: '300'}}>БИК HSBKKZKX</p><p  style={{margin: '0',fontSize:'15px', fontWeight: '300'}}>КБе 16</p>
                       <br />
                       <p style={{margin: '0',fontSize: '15px', fontWeight: '300'}}>{t('details.p3')}</p>
                       <p style={{margin: '0',fontSize: '15px', fontWeight: '300'}}>ИИК KZ796010191000077867</p>
                       <p style={{margin: '0',fontSize: '15px', fontWeight: '300'}}>БСК/БИК  HSBKKZKX</p>
                       <br />
                       <p style={{margin: '0',fontSize: '15px', fontWeight: '300'}}>{t('details.p4')}</p>
                       <p style={{margin: '0',fontSize: '15px', fontWeight: '300'}}>ИИК KZ988560000004472257</p>
                       <p style={{margin: '0',fontSize: '15px', fontWeight: '300'}}>БСК/БИК  KCJBKZKX</p>
                       <hr />
                       <p style={{margin: '0',fontSize: '15px', fontWeight: '300'}}><b style={{fontWeight: 'bold'}}>{t('details.b2')}</b>{" "}{t('details.p5')} </p>
                       <p style={{margin: '0',fontSize: '15px', fontWeight: '300'}}><b style={{fontWeight: 'bold'}}>{t('details.b1')}</b>{" "}{t('details.p6')} </p>
                       <br />
                       <p style={{margin: '0',fontSize: '15px', fontWeight: '300'}}>{t('details.p7')} </p>
                       <p style={{margin: '0',fontSize: '15px', fontWeight: '300'}}>{t('details.p8')} </p>
                       <p style={{margin: '0',fontSize: '15px', fontWeight: '300'}}>{t('details.p9')} </p>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};
