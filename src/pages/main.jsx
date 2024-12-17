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

import logo_buketov from '../assets/logo_buketov.png'

const Main = () => {
    const navigate = useNavigate();

    return (
        <>
            <Container fluid
                className=" main-page-container d-flex align-items-center justify-content-center"
                style={{ background: `url(${largeTriangles})`, overflowY: 'scroll' }}>
                <Container>
                    <Row>
                        <Col></Col>
                        <Col md={6}><br /><br /><h1><span className="cnf-main-title">МЕЖДУНАРОДНАЯ НАУЧНАЯ КОНФЕРЕНЦИЯ</span></h1>

                            <span style={{ fontWeight: '300', fontSize: '22px' }}>посвященная 100-летию академика Е.А.Букетова «Актуальные вопросы междисциплинарных научных исследований»</span>
                            <br />
                            <Row>
                                <Col className="col-12"><br /></Col>
                                <Col md={6} lg={6} xs={12} style={{ margin: '12px auto' }}><Calendar2Check size={42} color="#0D47A1" />&nbsp;&nbsp;18-19 июня 2025 года</Col>
                                <Col md={6} lg={6} xs={12} style={{ margin: '12px auto' }}><GeoAlt size={42} color="#0D47A1" />&nbsp;&nbsp;г. Караганда</Col>
                            </Row>
                            <div style={{ marginTop: '12px', fontWeight: 'bold' }}></div>
                            <div style={{ marginTop: '12px', fontWeight: 'bold' }}></div>
                            <br />
                            <Button onClick={() => { navigate('/registration'); }} className="main-click-btn">Зарегистрироваться</Button>
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

                                <h1 style={{ color: 'white', fontWeight: '900' }}>Цель конференции</h1>
                                <div style={{ backgroundColor: 'transparent', margin: '24px auto', paddingTop: '24px', paddingBottom: "24px", borderTop: '4px solid #90cdff', borderBottom: '4px solid #90cdff' }}>
                                    <Row>
                                        <Col md={8}>
                                        <p style={{ color: 'white', fontWeight: '400' }}>Цель конференции — создать платформу для междисциплинарного взаимодействия учёных естественных наук и математиков с целью решения актуальных задач с использованием математического и компьютерного моделирования. Конференция объединит представителей различных научных дисциплин для обмена опытом, обсуждения результатов и продвижения научных знаний.
                                    Мы приглашаем всех научных исследователей в области естественных наук, заинтересованных в построении математических и компьютерных моделей для решения нерешённых проблем, представить свои задачи. Оргкомитет конференции предложит эти задачи математическому сообществу, которое будет разрабатывать теоретические и прикладные методы решения данных задач, что будет способствовать дальнейшему развитию научного сотрудничества.
                                    </p>
                                        </Col>
                                        <Col md={4} ><img src={arrow}  className="img-fluid" alt="" /></Col>
                                    </Row>
                                    <p style={{color: 'white'}}>Конференция будет состоять из двух этапов:</p>
                                    <ul style={{ color: 'white', fontSize: '18px' }}>
                                        <li>Предварительная работа с задачами — учёные из естественных наук представляют задачи, требующие математического моделирования. Эти задачи передаются математическому сообществу для решения.</li>
                                        <li>Пленарные заседания и секционные обсуждения — учёные, предложившие задачи, и математики, разработавшие решения, встречаются на конференции для детального обсуждения результатов и дальнейших шагов.</li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        {/* <Col md={4} className="arrow-image " >
                            
                        </Col> */}
                    </Row>
                    <Row>
                        <h1 style={{ color: 'white', marginBottom: '24px', fontWeight: '900' }}>Целевая аудитория</h1>
                        <Col lg={6} md={6} sm={6} xs={12}>
                            <div className="arrow-items-card w-100">
                                <Row className="d-flex row align-items-center">
                                    <Col className="col-8 text-end">
                                        <span>Исследователи и ученые в области естественных наук</span>
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
                                        <span>Студенты, магистранты и докторанты</span>
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
                                        <span>Преподаватели высшей школы</span>
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
                                        <span>Представители научных организаций и предприятий</span>
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
                            }}>Формат конференции</h1>
                            <hr />
                        </Col>
                        <Col md={8} lg={8} className="d-flex row align-items-center third1-section-card">
                            <div>
                                <h2>Пленарные лекции ведущих ученых</h2>
                                <br />
                                <p>Пленарные лекции предоставляют уникальную возможность познакомиться с работами признанных лидеров в области науки. Эти лекции направлены на обсуждение передовых исследований, инновационных методологий и значимых открытий, которые оказывают влияние на развитие конкретной области знаний. Доклады рассчитаны на широкую аудиторию и подчеркивают важность междисциплинарного подхода в современных научных исследованиях.</p>
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
                                <h2>Устные доклады и постерные сессии</h2>
                                <br />
                                <p>Устные доклады позволяют участникам представить результаты своих научных исследований в формате структурированных презентаций. Они сопровождаются обсуждениями, в рамках которых исследователи обмениваются идеями, получают обратную связь и формируют новые научные коллаборации. Постерные сессии, в свою очередь, предоставляют визуальную платформу для демонстрации исследовательских проектов. Этот формат стимулирует неформальное общение между участниками и способствует детальному обсуждению представленных данных.</p>
                            </div>
                        </Col>
                        <Col md={8} lg={8} className="d-flex row align-items-center third1-section-card">
                            <div>
                                <h2>Выставка научных достижений</h2>
                                <br />
                                <p>Выставка научных достижений демонстрирует практическое применение результатов исследований и передовые технологии, разработанные учеными и исследовательскими коллективами. Этот формат предоставляет площадку для демонстрации инновационных решений, взаимодействия с потенциальными партнерами и представителями индустрии, а также обмена опытом в области внедрения научных разработок в реальный сектор экономики.</p>
                            </div>
                        </Col>
                        <Col className="third-section-card text-end" lg={4}>
                            <img src={first_3_333} className="img-fluid" alt="" />
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
                            }}>Основные направления работы конференции</h1>

                        </Col>
                        <Col lg={4}>
                            <div className="section-card w-100" style={{ borderLeft: '8px solid #E53935' }}>
                                <Row>
                                    <Col className="col-12" style={{ minHeight: '100px' }}>
                                        <span>Математическое моделирование: Математические модели в физике, химии, биологии, экономике.</span>

                                    </Col>
                                    <Col className="col-12 text-center">
                                        <img src={sec1} style={{ width: '14rem', opacity: '0.8' }} alt="" />

                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="section-card w-100" style={{ borderLeft: '8px solid #4A90E2' }}>
                                <Row>
                                    <Col className="col-12" style={{ minHeight: '100px' }}>
                                        <span>Вычислительная химия и биология: Моделирование сложных систем, квантовые вычисления.</span>

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
                                        <span>Искусственный интеллект и машинное обучение: Применение ИИ в научных исследованиях, обработка больших данных.</span>

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
                                        <span>Прикладная механика и робототехника.</span>
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
                                        <span>Проблемы перевода научной терминологии.</span>
                                    </Col>
                                    <Col className="col-12 text-center">
                                        <img src={sec5} style={{ width: '14rem', opacity: '0.8' }} alt="" />
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
                            }}>Программный комитет конференции</h1>
                        </Col>
                        <Col lg={3} ><span className="orgcommitt-span">Н.О. Дулатбеков (председатель)</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span">М.И. Рамазанов (сопредседатель)</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span">А.Р. Ешкеев</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span">Н.И. Букетова</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span">M. Avcar (Турция)</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span">Н.И. Ватин (Россия)</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span">А.В. Псху (Россия)</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span">О.М. Мамчуев (Россия)</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span">В.В. Митюшев (Польша)</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span">Р.В. Селезнева (Польша)</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span">М.А. Садыбеков</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span">М.Т. Дженалиев</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span">Д. Сураган</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span">Ж.Ж. Байгунчеков</span></Col>

                        <Col lg={3} ><span className="orgcommitt-span">Д.Х. Қозыбаев</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span">Б.Торебек</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span">А.К. Зейниденов</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span">Т.М. Сериков</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span">М.К. Ибраев</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span">М.Е. Байкенов</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span">А.Г. Жумина</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span">А.М. Айткулов</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span">А.Н. Ламбекова</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span">Е.Т. Акбаев</span></Col>
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
                            }}>Оргкомитет конференции</h1>
                        </Col>
                        <Col lg={3} ><span className="orgcommitt-span" style={{color: 'white'}}>Е.М. Тажбаев (председатель)</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span" style={{color: 'white'}}>А.О. Танин (сопредседатель)</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span" style={{color: 'white'}}>С.Б. Ахажанов</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span" style={{color: 'white'}}>Д.Р. Бейсенова</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span" style={{color: 'white'}}>Г.Е. Жумабекова</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span" style={{color: 'white'}}>С.Қ. Жумагалиев</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span" style={{color: 'white'}}>А.Б. Кельдибекова</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span" style={{color: 'white'}}>М.Т. Космакова</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span" style={{color: 'white'}}>Р.А. Қайыров</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span" style={{color: 'white'}}>Н.Қ. Медеубаев</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span" style={{color: 'white'}}>Н.М. Мусина</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span" style={{color: 'white'}}>Р. Мұратхан</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span" style={{color: 'white'}}>Н.Т. Орумбаева</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span" style={{color: 'white'}}>Н.С. Сейтжан</span></Col>
                        <Col lg={3} ><span className="orgcommitt-span" style={{color: 'white'}}>Н.С. Токмагамбетов</span></Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}

export default Main;
