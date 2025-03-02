import React, { useEffect } from "react";
import { Container, Row, Col, Table, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchParticipants } from "../redux/store"; // Подключаем Redux action
import largeTriangles2 from '../assets/subtle-prism3.svg';
import { useTranslation } from "react-i18next";

export const ParticipantList = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch();
    const { participants, loading, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchParticipants());
    }, [dispatch]);
    const getparticipation_form = (form) => {
        switch (form) {
          case 'online':
            return t('participation_form.online');
          case 'offline':
            return t('participation_form.offline');
          case 'mixed':
            return t('participation_form.mixed');
        }
      }
    
      const getPositionName = (posname) => {
        switch (posname) {
          case "researcher":
            return t('registration.step2.positions.researcher');
          case "lecturer":
            return t('registration.step2.positions.lecturer');
          case "companyRep":
            return t('registration.step2.positions.companyRep');
          case "doctoralStudent":
            return t('registration.step2.positions.doctoralStudent');
          case "mastersStudent":
            return t('registration.step2.positions.mastersStudent');
          case "student":
            return t('registration.step2.positions.student');
          case "otherPosition":
            return t('registration.step2.positions.other');
        }
      }
    
      const getRankName = (rankname) => {
        switch (rankname) {
          case "professor":
            return t('registration.step2.rank.professor');
          case "associateProfessor":
            return t('registration.step2.rank.associateProfessor')
    
        }
      }
    
      const getDegreeName = (degree) => {
        switch (degree) {
          case "doctorOfSciences":
            return t('registration.step2.degree.doctorOfSciences');
          case "candidateOfSciences":
            return t('registration.step2.degree.candidateOfSciences');
          case "phd":
            return t('registration.step2.degree.phd');
          case "master":
            return t('registration.step2.degree.master');
          case "bachelor":
            return t('registration.step2.degree.bachelor');
        }
      }
    
    return (
        <Container fluid className=""
            style={{
                paddingTop: '24px',
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
                        <h3 className="mb-4">{t('participant.title')}</h3>
                        
                        {loading && <Spinner animation="border" />}
                        {error && <Alert variant="danger">{t('participant.error')}: {error}</Alert>}
                        {!loading && !error && participants?.length > 0 ? (
                            <Table striped bordered>
                                <thead>
                                    <tr>
                                        <th style={{borderColor: '#098cf7', fontWeight: '300', backgroundColor: '#098cf7', color: 'white'}}>№</th>
                                        <th style={{borderColor: '#098cf7', fontWeight: '300', backgroundColor: '#098cf7', color: 'white', width: '30%'}}>{t('participant.fio')}</th>
                                        <th style={{borderColor: '#098cf7', fontWeight: '300', backgroundColor: '#098cf7', color: 'white'}}>{t('participant.location')}</th>
                                        <th style={{borderColor: '#098cf7', fontWeight: '300', backgroundColor: '#098cf7', color: 'white'}}>{t('participant.position')}</th>
                                        <th style={{borderColor: '#098cf7', fontWeight: '300', backgroundColor: '#098cf7', color: 'white'}}>{t('participant.rank')}</th>
                                        <th style={{borderColor: '#098cf7', fontWeight: '300', backgroundColor: '#098cf7', color: 'white'}}>{t('participant.degree')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {participants.map((user, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{user.lastname} {user.firstname} {user.fathername || ""}</td>
                                            <td>{user.organization}</td>
                                            <td>{getPositionName(user.position)  || "—"}</td>
                                            <td>{getRankName(user.rank) || "—"}</td>
                                            <td>{getDegreeName(user.degree)  || "—"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            !loading && <p>{t('participant.notfound')}</p>
                        )}
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};
