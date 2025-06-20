import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Calendar2Check, GeoAlt, PinMap, Mortarboard, PersonVideo3, Award, Clipboard, Buildings } from 'react-bootstrap-icons'

import { Link, useNavigate } from "react-router-dom";
import '../styles/main2.css';

import largeTriangles from '../assets/large-trianglesV2.svg'
import largeTriangles2 from '../assets/subtle-prism3.svg'
import arrow from '../assets/8080.png'
import thirdcontainer from '../assets/123456.svg'
import first_3_111 from '../assets/3_111.png'
import first_3_222 from '../assets/3_222.png'
import first_3_333 from '../assets/3_333.png'

import sec1 from '../assets/sec1.png'
import sec2 from '../assets/sec2.png'
import sec3 from '../assets/sec3.png'
import sec4 from '../assets/sec4.png'
import sec5 from '../assets/sec5.png'
import sec6 from '../assets/sec6.png'
import sec7 from '../assets/sec7.png'

import logo_buketov from '../assets/logo_buketov.png'
import { useTranslation } from "react-i18next";

const Main = () => {
    const navigate = useNavigate();
    const { t } = useTranslation()
    const [showAttention, setShowAttention] = useState(false);

    // Эффект для периодического привлечения внимания к кнопке
    useEffect(() => {
        const attentionInterval = setInterval(() => {
            setShowAttention(true);
            setTimeout(() => setShowAttention(false), 1000); // Показываем анимацию на 1 секунду
        }, 8000); // Повторяем каждые 8 секунд

        // Очищаем интервал при размонтировании компонента
        return () => clearInterval(attentionInterval);
    }, []);

    return (
        <>
            <Container fluid
                className=" main-page-container d-flex align-items-center justify-content-center"
                style={{ background: `url(${largeTriangles})`, overflowY: 'scroll' }}>
                <Container>
                    <Row>
                        <Col></Col>
                        <Col md={6}><br /><br /><h1><span className="cnf-main-title">{t('main.view1.conference_title')}</span></h1>

                            <span style={{ fontWeight: '300', fontSize: '22px' }}>{t('main.view1.conference_subtitle')}</span>
                            <br />
                            <Row>

                                <Col md={12} lg={12} xs={12} style={{ margin: '12px auto' }}><Calendar2Check size={42} color="#0D47A1" />&nbsp;&nbsp;{t('main.view1.conference_date')}</Col>
                                <Col md={12} lg={12} xs={12} style={{ margin: '12px auto' }}><GeoAlt size={42} color="#0D47A1" />&nbsp;&nbsp;{t('main.view1.conference_location')}</Col>
                            </Row>

                            <Button 
                                onClick={() => { navigate('/certificates'); }} 
                                className={`main-click-btn ${showAttention ? 'attention' : ''}`}
                                style={{
                                    borderRadius: '1px',
                                   
                                }}
                            >
                                {t('certificates.title')}
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Container>

            <Container fluid className="" id="arrows"
                style={{
                    paddingTop: '24px',
                    paddingBottom: '8rem',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    background: `url(${largeTriangles2})`
                }}>
                <Container >
                    <Row>
                        <Col md={12} className="d-flex col align-items-center">
                            <div className="w-100 arrow-content-card">
                                <h1 style={{ color: 'white', fontWeight: '900' }}> {t('main.view2.title1')}</h1>
                                <div style={{ backgroundColor: 'transparent', margin: '24px auto', paddingTop: '24px', paddingBottom: "24px", borderTop: '4px solid #90cdff', borderBottom: '4px solid #90cdff' }}>
                                    <Row>
                                        <Col md={8}>
                                            <p style={{ color: 'white', fontWeight: '400' }}>
                                                {t('main.view2.p1')}</p>
                                            <p style={{ color: 'white' }}>{t('main.view2.p2')}</p>
                                            <ul style={{ color: 'white', fontSize: '18px' }}>
                                                <li>{t('main.view2.ul.li1')}</li>
                                                <li>{t('main.view2.ul.li2')}</li>
                                            </ul>
                                        </Col>
                                        <Col md={4} ><img src={arrow} className="img-fluid" alt="" /></Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                        {/* <Col md={4} className="arrow-image " >
                            
                        </Col> */}
                    </Row>
                    <Row>
                        <h1 style={{ color: 'white', marginBottom: '24px', fontWeight: '900' }}>{t('main.view2.title2')}</h1>
                        <Col lg={6} md={6} sm={6} xs={12}>
                            <div className="arrow-items-card w-100">
                                <Row className="d-flex row align-items-center">
                                    <Col className="col-8 text-end">
                                        <span>{t('main.view2.card.1')}</span>
                                    </Col>
                                    <Col className="col-4 text-start">
                                        <Award color="#2196F3" style={{
                                            margin: '48px auto'
                                        }} size={100} />
                                    </Col>
                                </Row>

                            </div>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={12}>
                            <div className="arrow-items-card w-100 ">
                                <Row className="d-flex row align-items-center">
                                    <Col className="col-8 text-end">
                                        <span>{t('main.view2.card.2')}</span>
                                    </Col>
                                    <Col className="col-4 text-start">
                                        <Mortarboard color="#2196F3" style={{
                                            margin: '48px auto'
                                        }} size={100} />
                                    </Col>
                                </Row>

                            </div>
                        </Col>

                        <Col lg={6} md={6} sm={6} xs={12}>
                            <div className="arrow-items-card w-100">
                                <Row className="d-flex row align-items-center">
                                    <Col className="col-8 text-end">
                                        <span>{t('main.view2.card.3')}</span>
                                    </Col>
                                    <Col className="col-4 text-start">
                                        <PersonVideo3 color="#2196F3" style={{
                                            margin: '48px auto'
                                        }} size={100} />
                                    </Col>
                                </Row>

                            </div>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={12}>
                            <div className="arrow-items-card w-100">
                                <Row className="d-flex row align-items-center">
                                    <Col className="col-8 text-end">
                                        <span>{t('main.view2.card.4')}</span>
                                    </Col>
                                    <Col className="col-4 text-start">
                                        <Buildings color="#2196F3" style={{
                                            margin: '48px auto'
                                        }} size={100} />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                    <br />
                </Container>
            </Container>
            <Container fluid className="main-page-container" id="format" style={{
                height: 'auto',
                paddingBottom: '12rem',
                background: `url(${thirdcontainer})`, paddingTop: '8rem'
            }}>
                <Container>
                    <Row>
                        <Col className="col-12">
                            <h1 style={{
                                color: '#2196F3',
                                fontWeight: '900'
                            }}>{t('main.view3.title')}</h1>
                            <hr />
                        </Col>
                        <Col md={8} lg={8} className="d-flex row align-items-center third1-section-card">
                            <div>
                                <h2>{t('main.view3.cards.1.h')}</h2>
                                <br />
                                <p>{t('main.view3.cards.1.p')}</p>
                            </div>
                        </Col>
                        <Col className="third-section-card text-end" lg={4}>
                            <img src={first_3_111} className="img-fluid" alt="" />
                        </Col>
                        <Col className="third-section-card text-end" lg={4}>
                            <img src={first_3_222} className="img-fluid" alt="" />
                        </Col>
                        <Col md={8} lg={8} className="d-flex row align-items-center text-end third1-section-card">
                            <div>
                                <h2>{t('main.view3.cards.2.h')}</h2>
                                <br />
                                <p>{t('main.view3.cards.2.p')}</p>
                            </div>
                        </Col>
                        <Col md={8} lg={8} className="d-flex row align-items-center third1-section-card">
                            <div>
                                <h2>{t('main.view3.cards.3.h')}</h2>
                                <br />
                                <p>{t('main.view3.cards.3.p')}</p>
                            </div>
                        </Col>
                        <Col className="third-section-card text-end" lg={4}>
                            <img src={first_3_333} className="img-fluid" alt="" />
                        </Col>
                        <Col md={12} lg={12} className="d-flex row align-items-center third1-section-card">
                            <div>
                                <br />
                                <hr />
                                <p style={{fontSize: '19px'}}>{t('main.view3.cards.4.p')}</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Container fluid className="main-page-container" id="sections" style={{
                paddingTop: '8rem',
                paddingBottom: '8rem',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                background: `url(${largeTriangles2})`,
                height: 'auto'
            }}>
                <Container>
                    <Row>
                        <Col className="col-12">
                            <h1 style={{
                                color: 'white', fontWeight: '900', marginBottom: '42px'
                            }}>{t('main.view4.title')}</h1>

                        </Col>
                        <Col lg={4}>
                            <div className="section-card w-100" style={{ borderLeft: '8px solid #E53935' }}>
                                <Row>
                                    <Col className="col-12" style={{ minHeight: '100px' }}>
                                        <span>{t('main.view4.card.1')}</span>

                                    </Col>
                                    <Col className="col-12 text-center">
                                        <img src={sec1} style={{ width: '14rem', opacity: '0.8' }} alt="" />

                                    </Col>
                                </Row>
                            </div>
                        </Col>
                       <Col lg={4}>
                            <div className="section-card w-100" style={{ borderLeft: '8px solid purple' }}>
                                <Row>
                                    <Col className="col-12 d-flex row align-items-center" style={{ minHeight: '100px' }}>
                                        <span>{t('sections.socio')}</span>
                                    </Col>
                                    <Col className="col-12 text-center">
                                        <img src={sec7} style={{ width: '14rem', opacity: '0.8' }} alt="" />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
 <Col lg={4}>
                            <div className="section-card w-100" style={{ borderLeft: '8px solid #4A90E2' }}>
                                <Row>
                                    <Col className="col-12" style={{ minHeight: '100px' }}>
                                        <span>{t('main.view4.card.2')}</span>
                                    </Col>
                                    <Col className="col-12 text-center">
                                        <img src={sec2} style={{ width: '14rem', opacity: '0.8' }} alt="" />

                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="section-card w-100" style={{ borderLeft: '8px solid #FFC107' }}>
                                <Row>
                                    <Col className="col-12" style={{ minHeight: '100px' }}>
                                        <span>{t('main.view4.card.3')}</span>

                                    </Col>
                                    <Col className="col-12 text-center">
                                        <img src={sec3} style={{ width: '14rem', opacity: '0.8' }} alt="" />
                                    </Col>
                                </Row>

                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="section-card w-100" style={{ borderLeft: '8px solid #43A047' }}>
                                <Row>
                                    <Col className="col-12 d-flex row align-items-center" style={{ minHeight: '100px' }}>
                                        <span>{t('main.view4.card.4')}</span>
                                    </Col>
                                    <Col className="col-12 text-center">
                                        <img src={sec4} style={{ width: '14rem', opacity: '0.8' }} alt="" />
                                    </Col>
                                </Row>

                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="section-card w-100" style={{ borderLeft: '8px solid #A066D3' }}>
                                <Row>
                                    <Col className="col-12 d-flex row align-items-center" style={{ minHeight: '100px' }}>
                                        <span>{t('main.view4.card.5')}</span>
                                    </Col>
                                    <Col className="col-12 text-center">
                                        <img src={sec5} style={{ width: '14rem', opacity: '0.8' }} alt="" />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="section-card w-100" style={{ borderLeft: '8px solid aqua' }}>
                                <Row>
                                    <Col className="col-12 d-flex row align-items-center" style={{ minHeight: '100px' }}>
                                        <span>{t('main.view4.card.6')}</span>
                                    </Col>
                                    <Col className="col-12 text-center">
                                        <img src={sec6} style={{ width: '14rem', opacity: '0.8' }} alt="" />
                                    </Col>
                                </Row>
                            </div>
                        </Col>                               
            
                       
                    </Row>
                </Container>
            </Container>

            <Container fluid className="main-page-container footer" id="orgcommittee" style={{
                paddingTop: '8rem',
                paddingBottom: '8rem',
                height: 'auto',
                background: `url(${thirdcontainer})`

            }}>
                <Container >
                    <Row>
                        <Col className="col-12">
                            <h1 style={{
                                color: '#2196F3', fontWeight: '900', marginBottom: '42px'
                            }}>{t('main.view5.orgcommittee.title')}</h1>
                        </Col>
                        <Col className="col-12">
                            <span style={{
                                fontWeight: 'bold',
                                fontSize: '18px'
                            }}>{t('main.view5.orgcommittee.chairman')}</span>
                            <br />
                            <span className="orgcommitt-span">{t('main.view5.orgcommittee.chairman_name')}</span>
                        </Col>
                        <Col className="col-12">
                            <span style={{
                                fontWeight: 'bold',
                                fontSize: '18px'
                            }}>{t('main.view5.orgcommittee.cochairs')}</span>
                            <br />
                            <Row>
                                <Col md={12}>
                                    <span className="orgcommitt-span">
                                        {t('main.view5.orgcommittee.cochairs_list.1')}
                                    </span>
                                </Col>
                                <Col md={12}>
                                    <span className="orgcommitt-span">
                                        {t('main.view5.orgcommittee.cochairs_list.2')}
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                        <Col className="col-12">
                            <span style={{
                                fontWeight: 'bold',
                                fontSize: '18px'
                            }}> {t('main.view5.orgcommittee.committee_members')}</span>
                            <br />
                            <Row>
                                <Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.1')}</span>
                                </Col>
                                <Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.2')}</span>
                                </Col>
                                <Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.3')}</span>
                                </Col>
                                <Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.4')}</span>
                                </Col>
                                <Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.5')}</span>
                                </Col>
                                <Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.6')}</span>
                                </Col>
                                <Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.7')}</span>
                                </Col>
                                <Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.8')}</span>
                                </Col>
                                <Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.9')}</span>
                                </Col>
                                <Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.10')}</span>
                                </Col>
                                <Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.11')}</span>
                                </Col>
                                <Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.12')}</span>
                                </Col>
                                <Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.13')}</span>
                                </Col>
                                <Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.14')}</span>
                                </Col>
                                <Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.15')}</span>
                                </Col>
                                <Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.16')}</span>
                                </Col>
                                <Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.17')}</span>
                                </Col>
                                <Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.18')}</span>
                                </Col>
                                <Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.19')}</span>
                                </Col>
                                <Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.20')}</span>
                                </Col>
                                <Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.21')}</span>
                                </Col>
                                <Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.22')}</span>
                                </Col>
                                <Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.23')}</span>
                                </Col>
                                <Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.24')}</span>
                                </Col>
                                <Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.25')}</span>
                                </Col>
                                <Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.26')}</span>
                                </Col>
                                <Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.27')}</span>
                                </Col>
                                <Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.28')}</span>
                                </Col>
                                <Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.29')}</span>
                                </Col>
<Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.30')}</span>
                                </Col>
<Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.31')}</span>
                                </Col>
<Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.32')}</span>
                                </Col>
<Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.33')}</span>
                                </Col>
<Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.34')}</span>
                                </Col>
<Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.35')}</span>
                                </Col>
<Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.36')}</span>
                                </Col>
<Col md={12}>
                                    <span className="orgcommitt-span">{t('main.view5.orgcommittee.members_list.37')}</span>
                                </Col>
				
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>

            <Container fluid className="main-page-container footer" id="orgcommittee" style={{
                paddingTop: '8rem',
                paddingBottom: '8rem',
                height: 'auto',
                background: `url(${largeTriangles2})`

            }}>
                <Container >
                    <Row>
                        <Col className="col-12">
                            <h1 style={{
                                color: 'white', fontWeight: '900', marginBottom: '42px'
                            }}>{t('main.view6.title')}</h1>
                            <Col className="col-12">
                                <span style={{
                                    fontWeight: 'bold',
                                    fontSize: '18px',
                                    color: 'white'
                                }}>{t('main.view6.pred.nm')}</span>
                                <br />
                                <Row style={{ color: 'white' }}>
                                    <Col md={12}>
                                        <span className="orgcommitt-span">
                                            {t('main.view6.pred.1')}
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={12}><br /></Col>
                            <Col className="col-12">
                                <span style={{
                                    fontWeight: 'bold',
                                    fontSize: '18px',
                                    color: 'white'
                                }}>{t('main.view6.zampred.nm')}</span>
                                <br />
                                <Row style={{ color: 'white' }}>
                                    <Col md={12}>
                                        <span className="orgcommitt-span">{t('main.view6.zampred.1')}</span>
                                    </Col>
                                    <Col md={12}>
                                        <span className="orgcommitt-span">{t('main.view6.zampred.2')}</span>
                                    </Col>
<Col md={12}>
                                        <span className="orgcommitt-span">{t('main.view6.zampred.3')}</span>
                                    </Col>                               
 </Row>
                            </Col>
                            <Col md={12}><br /></Col>
                            <Col className="col-12">
                                <span style={{
                                    fontWeight: 'bold',
                                    fontSize: '18px',
                                    color: 'white'
                                }}>{t('main.view6.chlns.title')}</span>
                                <br />
                                <Row style={{ color: 'white' }}>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.1')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.2')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.3')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.4')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.5')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.6')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.7')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.8')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.9')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.10')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.11')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.12')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.13')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.14')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.15')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.16')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.17')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.18')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.19')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.20')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.21')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.22')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.23')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.24')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.25')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.26')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.27')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.28')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.29')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.chlns.30')}</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={12}><br /></Col>
                            <Col className="col-12">
                                <span style={{
                                    fontWeight: 'bold',
                                    fontSize: '18px',
                                    color: 'white'
                                }}>{t('main.view6.scien.title')}</span>
                                <br />
                                <Row style={{ color: 'white' }}>
                                    <Col md={12}>
                                        <span className="orgcommitt-span">{t('main.view6.scien.name')}</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={12}><br /></Col>
                            <Col className="col-12">
                                <span style={{
                                    fontWeight: 'bold',
                                    fontSize: '18px',
                                    color: 'white'
                                }}>{t('main.view6.secretarials.title')}</span>
                                <br />
                                <Row style={{ color: 'white' }}>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.secretarials.1')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.secretarials.2')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.secretarials.3')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.secretarials.4')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.secretarials.5')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.secretarials.6')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.secretarials.7')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.secretarials.8')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.secretarials.9')}</span>
                                    </Col>
                                    <Col md={4}>
                                        <span className="orgcommitt-span">{t('main.view6.secretarials.10')}</span>
                                    </Col>
                                </Row>
                            </Col>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}

export default Main;
