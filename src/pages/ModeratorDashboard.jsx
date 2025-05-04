import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Table, Button, Modal, InputGroup } from "react-bootstrap";
import axios from "../utils/axios.js";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { FaFileAlt, FaReceipt, FaEnvelope, FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaQuestionCircle, FaCommentDots } from "react-icons/fa";

export const ModeratorDashboard = () => {
  const [articles, setArticles] = useState([])
  const userData = useSelector((state) => state.user.profile);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showMailModal, setShowMailModal] = useState(false);
  const [mailTo, setMailTo] = useState("");
  const [mailSubject, setMailSubject] = useState("");
  const [mailBody, setMailBody] = useState("");
  const [mailLoading, setMailLoading] = useState(false);
  const [mailSuccess, setMailSuccess] = useState("");
  const [mailError, setMailError] = useState("");

  const { t } = useTranslation();

  const sectionName = (section) => {
    switch (section) {
      case 'section-1':
        return t('sections.mathModeling');
      case 'section-3':
        return t('sections.mathProblems');
      case 'section-4':
        return t('sections.aiML');
      case 'section-5':
        return t('sections.mechanicsRobotics');
      case 'section-6':
        return t('sections.teachingMethods');
      case 'section-7':
        return t('sections.translationProblems');
      case 'section-2':
        return t('sections.socio');
    }
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data } = await axios.get("/api/articles");
      setArticles(data.sort((a, b) => a.title.localeCompare(b.title))); // Сортируем по названию
    } catch (error) {
      console.error("Ошибка загрузки статей", error);
    }
  };

  const updateArticleStatus = async (id, status) => {
    let comment = "";
    if (status === "denied" || status === "revision") {
      comment = prompt("Пожалуйста, предоставьте комментарий для изменения статуса:");
      if (comment === null) return; // User cancelled the prompt
    }
    
    try {
      await axios.patch(`/api/articles/${id}`, 
        { status, comment },
        { 
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Ошибка обновления статуса", error);
    }
  };

  // Фильтрация статей
  const filteredArticles = articles.filter((article) => {
    return (
      (searchTitle === "" || article.title.toLowerCase().includes(searchTitle.toLowerCase())) &&
      (searchAuthor === "" || (article.correspondent?.lastname + " " + article.correspondent?.firstname).toLowerCase().includes(searchAuthor.toLowerCase())) &&
      (selectedSection === "" || article.section === selectedSection) &&
      (selectedStatus === "" || article.status === selectedStatus)
    );
  });

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
        return t('registration.step2.researcher');
      case "lecturer":
        return t('registration.step2.lecturer');
      case "companyRep":
        return t('registration.step2.companyRep');
      case "doctoralStudent":
        return t('registration.step2.doctoralStudent');
      case "mastersStudent":
        return t('registration.step2.mastersStudent');
      case "student":
        return t('registration.step2.student');
      case "otherPosition":
        return t('registration.step2.other');
    }
  }

  const getRankName = (rankname) => {
    switch (rankname) {
      case "professor":
        return t('registration.step2.professor');
      case "associateProfessor":
        return t('registration.step2.associateProfessor')
    }
  }

  const getDegreeName = (degree) => {
    switch (degree) {
      case "doctorOfSciences":
        return t('registration.step2.doctorOfSciences');
      case "candidateOfSciences":
        return t('registration.step2.candidateOfSciences');
      case "phd":
        return t('registration.step2.phd');
      case "master":
        return t('registration.step2.master');
      case "bachelor":
        return t('registration.step2.bachelor');
    }
  }

  const getRoleName = (rolename) => {
    switch (rolename) {
      case "correspondent":
        return t("role.correspondent")
      case "coauthor":
        return t("role.coauthor")
      case "moderator":
        return t("role.moderator")
    }
  }

  const getArticleStatus = (articleStatus) => {
    switch (articleStatus) {
      case "process":
        return t("article.status.process");
      case "approved":
        return t("article.status.approved");
      case "denied":
        return t("article.status.denied");
      case "revision":
        return t("article.status.revision");
    }
  }

  // Новый геттер для статуса квитанции с бейджем и иконкой
  const getReceiptBadge = (article) => {
    if (!article?.receipt_url) {
      return <span className="badge bg-secondary d-flex align-items-center" style={{gap: 4}}><FaQuestionCircle /> {t('receipt.status.not_uploaded')}</span>;
    }
    switch (article?.receipt_status) {
      case 'pending':
        return <span className="badge bg-warning text-dark d-flex align-items-center" style={{gap: 4}}><FaHourglassHalf /> {t('receipt.status.pending')}</span>;
      case 'approved':
        return <span className="badge bg-success d-flex align-items-center" style={{gap: 4}}><FaCheckCircle /> {t('receipt.status.approved')}</span>;
      case 'rejected':
        return <span className="badge bg-danger d-flex align-items-center" style={{gap: 4}}><FaTimesCircle /> {t('receipt.status.rejected')}</span>;
      default:
        return <span className="badge bg-secondary d-flex align-items-center" style={{gap: 4}}><FaQuestionCircle /> {t('receipt.status.not_uploaded')}</span>;
    }
  };

  // Функция отправки письма (пример через API)
  const handleSendMail = async () => {
    setMailLoading(true);
    setMailSuccess("");
    setMailError("");
    try {
      await axios.post("/api/send-email", {
        to: mailTo,
        subject: mailSubject,
        text: mailBody
      });
      setMailSuccess(t('receipt.success'));
      setMailBody("");
    } catch (e) {
      setMailError(t('receipt.error'));
    } finally {
      setMailLoading(false);
    }
  };

  // Новый тумблер для receipt_status
  const handleReceiptToggle = async (article) => {
    const newStatus = article.receipt_status === 'approved' ? 'pending' : 'approved';
    try {
      await axios.patch(`/api/articles/${article._id}/receipt-status`, {
        receipt_status: newStatus
      });
      fetchArticles();
    } catch (error) {
      // Можно добавить уведомление об ошибке
    }
  };

  return (userData?.role === 'moderator' && (
    <Container fluid style={{marginTop: '7rem'}}>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1rem'
      }}>
        <h4 style={{
          fontWeight: '600',
          fontSize: '1.5rem',
          color: '#1976d2',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <FaFileAlt size={19} />
          {t('moderator.title')}
        </h4>
        <span style={{
          backgroundColor: '#e3f2fd',
          color: '#1976d2',
          padding: '0.2rem 1.4rem',
          borderRadius: '24px',
          fontSize: '1.2rem',
          fontWeight: '500'
        }}>
          {articles.length} {t('moderator.articles')}
        </span>
      </div>
      
      <Row className="mb-3">
      <Col md={3}>
          <div className="p-2 border rounded shadow-sm bg-white">
            <div className="d-flex align-items-center">
              <div className="p-3 rounded-square me-2" style={{backgroundColor: '#e8f5e9'}}>
                <FaCheckCircle size={20} color="#43a047"/>
              </div>
              <div>
                <small className="text-muted">{t('moderator.summary.approved')}</small>
                <h4 className="mb-0 fw-bold">{articles.filter(a => a.status === 'approved').length}</h4>
              </div>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="p-2 border rounded shadow-sm bg-white">
            <div className="d-flex align-items-center">
              <div className="p-3 rounded-square me-2" style={{backgroundColor: '#e3f2fd'}}>
                <FaFileAlt size={20} color="#1976d2"/>
              </div>
              <div>
                <small className="text-muted">{t('moderator.summary.process')}</small>
                <h4 className="mb-0 fw-bold">{articles.filter(a => a.status === 'process').length}</h4>
              </div>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="p-2 border rounded shadow-sm bg-white">
            <div className="d-flex align-items-center">
              <div className="p-3 rounded-square me-2" style={{backgroundColor: '#fff3e0'}}>
                <FaHourglassHalf size={20} color="#f57c00"/>
              </div>
              <div>
                <small className="text-muted">{t('moderator.summary.inProcess')}</small>
                <h4 className="mb-0 fw-bold">{articles.filter(a => a.status === 'revision').length}</h4>
              </div>
            </div>
          </div>
        </Col>
        
        <Col md={3}>
          <div className="p-2 border rounded shadow-sm bg-white">
            <div className="d-flex align-items-center">
              <div className="p-3 rounded-square me-2" style={{backgroundColor: '#ffebee'}}>
                <FaTimesCircle size={20} color="#e53935"/>
              </div>
              <div>
                <small className="text-muted">{t('moderator.summary.denied')}</small>
                <h4 className="mb-0 fw-bold">{articles.filter(a => a.status === 'denied').length}</h4>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <div className="p-3 border bg-light h-100">
            <h5 className="mb-3">{t('moderator.filters.bySection')}</h5>
            {['section-1', 'section-2', 'section-3', 'section-4', 'section-5', 'section-6', 'section-7'].map(section => (
              <div key={section} className="d-flex justify-content-between mb-2">
                <span>{sectionName(section)}:</span>
                <span className="fw-bold">{articles.filter(a => a.section === section).length}</span>
              </div>
            ))}
          </div>
        </Col>
        <Col md={4}>
          <div className="p-3 border bg-light h-100">
            <h5 className="mb-3">{t('moderator.filters.byStatus')}</h5>
            {['approved', 'process', 'revision', 'denied'].map(status => (
              <div key={status} className="d-flex justify-content-between mb-2">
                <span>{t(`article.status.${status}`)}:</span>
                <span className="fw-bold">{articles.filter(a => a.status === status).length}</span>
              </div>
            ))}
          </div>
        </Col>
        <Col md={4}>
          <div className="p-3 border bg-light h-100">
            <h5 className="mb-3">{t('moderator.filters.byReceipt')}</h5>
            <div className="d-flex justify-content-between mb-2">
              <span>{t('receipt.status.approved')}:</span>
              <span className="fw-bold">{articles.filter(a => a.receipt_status === 'approved').length}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>{t('receipt.status.pending')}:</span>
              <span className="fw-bold">{articles.filter(a => a.receipt_status === 'pending').length}</span>
            </div>
          </div>
        </Col>
      </Row>
      {/* Фильтры */}
      <div className="filter-container mb-3">
        <Form.Control
          type="text"
          placeholder={t('moderator.article.plname')}
          style={{
            borderRadius: '0'
          }}
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <Form.Control
          type="text"
          placeholder={t('moderator.article.plauthorfio')}
          style={{
            borderRadius: '0'
          }}
          value={searchAuthor}
          onChange={(e) => setSearchAuthor(e.target.value)}
        />
        <Form.Select value={selectedSection} style={{
          borderRadius: '0'
        }} onChange={(e) => setSelectedSection(e.target.value)}>
          <option value="">{t('moderator.article.sections')}</option>
          <option value="section-1">{t('sections.mathModeling')}</option>
          <option value="section-2">{t('sections.socio')}</option>         
          <option value="section-3">{t('sections.mathProblems')}</option>
          <option value="section-4">{t('sections.aiML')}</option>
          <option value="section-5">{t('sections.mechanicsRobotics')}</option>
          <option value="section-6">{t('sections.teachingMethods')}</option>
          <option value="section-7">{t('sections.translationProblems')}</option>
        </Form.Select>
        <Form.Select value={selectedStatus} style={{
          borderRadius: '0'
        }} onChange={(e) => setSelectedStatus(e.target.value)}>
          <option value="">{t('moderator.article.statuses')}</option>
          <option value="approved">{t("article.status.approved")}</option>
          <option value="process">{t("article.status.process")}</option>
          <option value="revision">{t("article.status.revision")}</option>
          <option value="denied">{t("article.status.denied")}</option>
        </Form.Select>
      </div>
      {/* Таблица */}
      <div className="table-container">
        <Table bordered striped hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>{t('moderator.article.name')}</th>
              <th>{t('moderator.article.authors')}</th>
              <th>{t('moderator.article.section')}</th>
              <th>{t('moderator.article.status')}</th>
              <th className="text-center">{t('moderator.article.file')}</th>
              <th className="text-center">{t('moderator.article.action')}</th>
              <th className="text-center">{t('moderator.article.mail', 'Письмо')}</th>
              <th className="text-center">{t('moderator.article.receipt')}</th>
              
            </tr>
          </thead>
          <tbody>
            {filteredArticles.map((article, idx) => (
              <tr key={article._id}>
                <td className="align-middle text-center">{idx + 1}</td>
                <td className="align-middle">{article.title}</td>
                <td className="align-middle">
                  {article.correspondent ? (
                    <>
                      {article.correspondent.lastname} {article.correspondent.firstname}
                      {article.correspondent.coauthors?.length > 0 && (
                        `, ${article.correspondent.coauthors.map(coauthor => `${coauthor.lastname} ${coauthor.firstname}`).join(", ")}`
                      )}
                    </>
                  ) : t('moderator.article.unknownauthor')}
                </td>
                <td className="align-middle">{sectionName(article.section)}</td>
                {/* Статус статьи */}
                <td className={`align-middle text-center ${
                  article.status === "approved" ? "bg-success text-white" :
                  article.status === "process" ? "bg-primary text-white" :
                  article.status === "revision" ? "bg-warning text-dark" :
                  article.status === "denied" ? "bg-danger text-white" : ""
                }`}>
                  {article.status === "approved" ? <><FaCheckCircle className="me-1" />{t('article.status.approved')}</> :
                   article.status === "process" ? <><FaHourglassHalf className="me-1" />{t('article.status.process')}</> :
                   article.status === "revision" ? <><FaQuestionCircle className="me-1" />{t('article.status.revision')}{article.comment ? <><hr style={{marginTop: 4, marginBottom: 4}} /><FaCommentDots className="ms-1" />{" "}{article.comment}</> : ""}</> :
                   <><FaTimesCircle className="me-1" />{t('article.status.denied')}{article.comment ? <><hr style={{marginTop: 4, marginBottom: 4}} /><FaCommentDots className="ms-1" />{" "}{article.comment}</> : ""}</>}
                </td>
                {/* Скачать статью */}
                <td className="align-middle text-center">
                  {article.file_url ? (
                    <a href={`https://conference.buketov.edu.kz${article.file_url}`} download title={t('moderator.article.download')}><FaFileAlt size={20} /></a>
                  ) : <FaFileAlt color="#bdbdbd" size={20} title={t('moderator.article.notfoundfile')} />}
                </td>
                {/* Действия (select options) */}
                <td className="align-middle text-center">
                  <Form.Select 
                    value={article.status}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      updateArticleStatus(article._id, newStatus);}} 
                    style={{ width: 'auto', borderRadius: '0', display: 'inline-block', minWidth: 120 }}
                    size="sm"
                  >
                    <option value="approved">{t("article.status.is.approved")}</option>
                    <option value="process">{t("article.status.is.process")}</option>
                    <option value="revision">{t("article.status.is.revision")}</option>
                    <option value="denied">{t("article.status.is.denied")}</option>
                  </Form.Select>
                </td>
                {/* Письмо: отдельная колонка */}
                <td className="align-middle text-center">
                  <Button variant="outline-dark" size="sm" style={{ borderRadius: 20, padding: '2px 7px' }}
                    onClick={() => {
                      setMailTo(article.correspondent?.email || "");
                      setMailSubject("");
                      setMailBody("");
                      setShowMailModal(true);
                    }}
                  >
                    <FaEnvelope />
                  </Button>
                </td>
                {/* Квитанция: иконка, бейдж, тумблер */}
                <td className="align-middle text-center receipt-cell">
                  <div className="receipt-row-flex">
                    {/* Иконка скачивания квитанции */}
                    <div className="receipt-icon">
                      {article.receipt_url ? (
                        <a href={`https://conference.buketov.edu.kz${article.receipt_url}`} download title={t('moderator.article.downloadReceipt')} className="receipt-download-link">
                          <FaReceipt size={22} />
                        </a>
                      ) : <FaReceipt color="#bdbdbd" size={22} title={t('moderator.article.noReceipt')} />}
                    </div>
                    {/* Иконка статуса квитанции (без текста) */}
                    <div className="receipt-status-icon">
                      {(!article?.receipt_url || article?.receipt_status === 'not_uploaded') && <FaQuestionCircle color="#bdbdbd" size={20} title={t('receipt.status.not_uploaded')} />}
                      {article?.receipt_status === 'pending' && <FaHourglassHalf color="#ff9800" size={20} title={t('receipt.status.pending')} />}
                      {article?.receipt_status === 'approved' && <FaCheckCircle color="#219653" size={20} title={t('receipt.status.approved')} />}
                      {article?.receipt_status === 'rejected' && <FaTimesCircle color="#f44336" size={20} title={t('receipt.status.rejected')} />}
                    </div>
                    {/* Тумблер */}
                    <div className="receipt-switch-row">
                      {article.receipt_url && (
                        <Form.Check
                          type="switch"
                          id={`receipt-status-${article._id}`}
                          label=""
                          checked={article.receipt_status === 'approved'}
                          onChange={() => handleReceiptToggle(article)}
                          className="receipt-switch"
                        />
                      )}
                    </div>
                  </div>
                </td>
                
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {/* Модальное окно для отправки письма */}
      <Modal show={showMailModal} onHide={() => setShowMailModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title><FaEnvelope className="me-2" />{t('moderator.article.sendMail', 'Отправить письмо')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={mailTo} onChange={e => setMailTo(e.target.value)} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t('moderator.article.mailSubject', 'Тема')}</Form.Label>
              <Form.Control type="text" value={mailSubject} onChange={e => setMailSubject(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t('moderator.article.mailBody', 'Сообщение')}</Form.Label>
              <Form.Control as="textarea" rows={4} value={mailBody} onChange={e => setMailBody(e.target.value)} />
            </Form.Group>
            {mailSuccess && <div className="alert alert-success">{mailSuccess}</div>}
            {mailError && <div className="alert alert-danger">{mailError}</div>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMailModal(false)}>{t('buttons.back', 'Назад')}</Button>
          <Button variant="primary" onClick={handleSendMail} disabled={mailLoading}>
            {mailLoading ? t('receipt.uploading') : t('moderator.article.send', 'Отправить')}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Стили */}
      <style>{`
        .filter-container {
          display: flex;
          gap: 10px;
          margin-bottom: 10px;
        }
        .table-container {
          max-height: 70vh;
          overflow-y: auto;
          border: 1px solid #ddd;
        }
        .badge {
          font-size: 0.95em;
          padding: 0.45em 0.8em;
        }
        .receipt-cell {
          background: #f6f6f6;
          min-width: 180px;
          vertical-align: middle;
        }
        .receipt-row-flex {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 1.1rem;
          min-height: 60px;
        }
        .receipt-icon {
          display: flex;
          align-items: center;
        }
        .receipt-download-link {
          color: #1976d2;
          transition: color 0.2s;
        }
        .receipt-download-link:hover {
          color: #0d47a1;
        }
        .receipt-status-icon {
          display: flex;
          align-items: center;
        }
        .receipt-switch-row {
          display: flex;
          align-items: center;
        }
        .receipt-switch .form-check-input {
          cursor: pointer;
        }
      `}</style>
    </Container>
  ))
};
