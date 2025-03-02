import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import logo_buketov from '../assets/logo_buketov.png'
import { Envelope, Facebook, GeoAlt, Instagram, PinMap, Telephone, Twitter, Youtube } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
export const Footer = () => {
    const {t} = useTranslation()
    return (<>
                
            <Container fluid className="main-page-container footer" id="footer" style={{
                paddingTop: '8rem',
                paddingBottom: '8rem',
                height: 'auto',
                backgroundColor: '#0D47A1'

            }}>
                <Container>
                    <Row>
                        <Col sm={12} xs={12} lg={4}>
                            <img src={logo_buketov} style={{
                                margin: 'auto auto 24px auto'
                            }} className="img-fluid" alt="" />
                        </Col>
                        <Col sm={12} xs={12} lg={4}>
                            <h4>{t('main.footer.ul.title')}</h4>
                            <ul class="no-bullets">
                                <hr />
                                <li onClick={() => {  window.location.assign('/#arrows') }}>{t('main.footer.ul.li1')}</li>
                                <li onClick={() => {  window.location.assign('/#format') }}>{t('main.footer.ul.li2')}</li>
                                <li onClick={() => {  window.location.assign('/#sections') }}>{t('main.footer.ul.li3')}</li>
                                <li onClick={() => {  window.location.assign('/#orgcommittee') }}>{t('main.footer.ul.li4')}</li>
                           </ul>
                        </Col>
                        <Col sm={12} xs={12} lg={4}>
                            <h4>
                            {t('main.footer.contact.title')}
                            </h4>
                            <ul class="no-bullets">
                                <hr />
                                <li className="icon-lnk" onClick={() => {  window.location.assign('https://www.google.com/maps?ll=49.769837,73.125204&z=16&t=m&hl=ru&gl=KZ&mapclient=embed&q=%D1%83%D0%BB.+%D0%A3%D0%BD%D0%B8%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%82%D0%B5%D1%82%D1%81%D0%BA%D0%B0%D1%8F+28+%D0%9A%D0%B0%D1%80%D0%B0%D0%B3%D0%B0%D0%BD%D0%B4%D0%B0+100000') }}>
                                    <GeoAlt size={24}/>&nbsp; {t('main.footer.contact.location')}</li>
                                <Row><Col className="col-1"><Telephone size={24}/></Col>
                                    <Col className="col-auto icon-lnk" onClick={() => {window.location.assign('tel:+77212356430')}}> &nbsp;+ 7 7212 35-64-30</Col></Row>
                                <li >   </li>
                                <li className="icon-lnk" onClick={() => {  window.location.assign('mailto:mit@buketov.edu.kz') }}><Envelope size={24}/>&nbsp; mit@buketov.edu.kz</li>
                                <br />
                                <Row>
                                    <Col className="col-3 text-start"><Instagram className="icon-lnk" onClick={() => { window.location.assign('https://www.instagram.com/buketov.university/') } } size={32}/></Col>
                                    <Col className="col-3 text-start"><Youtube className="icon-lnk" onClick={() => {window.location.assign('https://www.youtube.com/channel/UCieeYzqMQng3nrXVGQhT0Kg')}} size={32}/> </Col>
                                    <Col className="col-3 text-start"><Facebook className="icon-lnk" onClick={() => {window.location.assign('https://www.facebook.com/buketov.university')}} size={32}/></Col>
                                    <Col className="col-3 text-start"><Twitter className="icon-lnk" onClick={() => {window.location.assign('https://x.com/press_ksu?mx=2')}} size={32}/>  </Col>
                                </Row>
                               
                                
                                
                                
                           </ul>
                        </Col>
                    </Row>
                </Container>
            </Container>
    </>)
}