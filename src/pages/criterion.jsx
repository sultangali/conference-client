
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import {Cloud} from 'react-bootstrap-icons'
import tex from '../assets/tex.png'
import doc from '../assets/doc.png'
import { useTranslation } from 'react-i18next'

export const Criterion = () => {

    const { t } = useTranslation()
    
    return (<>
        <Container>
            <Row>
                <Col md={12}>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <h3 style={{
                        color: '#098cf7',
                        fontWeight: '700'
                    }}>{t('criterion.title')}</h3>
                    <hr />
                    <p style={{ fontSize: '1rem' }}>{t('criterion.p1')}</p>
                    <p style={{ fontSize: '1rem' }}>{t('criterion.p2')}</p>
                    <Row>
                        <Col md={8}>
                            <b><h6>{t('criterion.ul1.title')}</h6></b>
                            <ul>
                                <li>{t('criterion.ul1.li1')}</li>
                                <li>{t('criterion.ul1.li2')}</li>
                                <li>{t('criterion.ul1.li3')}</li>
                            </ul>

                            <b><h6>{t('criterion.ul2.title')}</h6></b>
                            <ul>
                                <li>{t('criterion.ul2.li1')}</li>
                                <li>{t('criterion.ul2.li2')}</li>
                                <li>{t('criterion.ul2.li3')}</li>
                            </ul>
                        </Col>
                        <Col className='d-flex col align-items-center' md={4}>
                            <Row className='d-flex col align-items-center'>
                                <Col className='col-6'>
                                    <button onClick={()=>{
                                        window.location.assign("/main.docx")
                                    }} className='templ-btn'>
                                        <img  className='img-fluid' src={doc} alt="" />
                                        <span>{t('criterion.download.docx')}</span>
                                    </button>
                                </Col>
                                <Col className='col-6'>
                                    <button className='templ-btn' onClick={()=>{
                                        window.location.assign("https://drive.google.com/file/d/1Zu4Huyu41Jd_yDQDMe2pSzRFED74e4D0/view?usp=sharing")
                                    }} >
                                        <img className='img-fluid' src={tex} alt="" />
                                        <span>{t('criterion.download.tex')}</span>
                                    </button>
                                </Col>
                                <Col md={12}>
                                <hr />
                                <a href="https://drive.google.com/drive/folders/1p7KlZwHdhrTAjA83LuGc0gFBFY5JbG9G?usp=sharing">{t('criterion.download.drive')}  &nbsp;<Cloud size={24}/></a>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={12}>
                            <b><h6>{t('criterion.ul3.title')}</h6></b>
                            <ul>
                                <li>{t('criterion.ul3.li1')}</li>
                                <li>{t('criterion.ul3.li2')}</li>
                                <li>{t('criterion.ul3.li3')}</li>
                            </ul>
                            <p style={{ fontSize: '1rem' }}>{t('criterion.plast')}</p>
                        </Col>
                    </Row>


                </Col>

            </Row>
        </Container>
    </>)
}
