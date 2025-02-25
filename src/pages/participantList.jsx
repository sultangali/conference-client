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
                                            <td>{user.position || "—"}</td>
                                            <td>{user.rank || "—"}</td>
                                            <td>{user.degree || "—"}</td>
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
