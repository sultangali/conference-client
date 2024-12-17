import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Calendar2Check, GeoAlt, PinMap } from 'react-bootstrap-icons'

import { useNavigate } from "react-router-dom";
import '../styles/main.css';

import largeTriangles from '../assets/large-triangles.svg'
import largeTriangles2 from '../assets/large-triangles2.svg'

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
                                <Col md={6} lg={6} xs={12} style={{ margin: '12px auto' }}><Calendar2Check size={42} color="#364C88" />&nbsp;&nbsp;18-19 июня 2025 года</Col>
                                <Col md={6} lg={6} xs={12} style={{ margin: '12px auto' }}><GeoAlt size={42} color="#364C88" />&nbsp;&nbsp;г. Караганда</Col>
                            </Row>
                            <div style={{ marginTop: '12px', fontWeight: 'bold' }}></div>
                            <div style={{ marginTop: '12px', fontWeight: 'bold' }}></div>
                            <br />
                            <Button onClick={() => { navigate('/registration'); }} className="main-click-btn">Зарегистрироваться</Button>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Container fluid className="main-page-container"  style={{ background: `url(${largeTriangles2})` }}>
                <Container>
                    <Row>
                        <Col lg={4}>

                        </Col>
                    </Row>
                </Container>
            </Container>
            <Container fluid className="main-page-container"  style={{ backgroundColor: 'black' }}>
                <Container>
                    <Row>
                        следущая секция
                    </Row>
                </Container>
            </Container>
            <Container fluid className="main-page-container" style={{ backgroundColor: 'red' }}>
                <Container>
                    <Row>
                        следущая секция
                    </Row>
                </Container>
            </Container>
        </>
    );
}

export default Main;
