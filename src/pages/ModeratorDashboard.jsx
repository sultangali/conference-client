import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import axios from "../utils/axios.js";
import { useTranslation } from "react-i18next";

export const ModeratorDashboard = () => {
  const [articles, setArticles] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const { t } = useTranslation();

  const sectionName = (section) => {
    switch (section) {
      case 'section-1':
        return t('sections.mathModeling');
      case 'section-2':

        return t('sections.mathProblems');
      case 'section-3':

        return t('sections.aiML');
      case 'section-4':

        return t('sections.mechanicsRobotics');
      case 'section-5':

        return t('sections.teachingMethods');
      case 'section-6':

        return t('sections.translationProblems');
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
    try {
      await axios.patch(`/api/articles/${id}`, { status });
      fetchArticles();
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
    switch(articleStatus) {
      case "process": 
        return t("article.status.process")
        case "approved": 
        return t("article.status.approved")
        case "denied": 
        return t("article.status.denied")
    }
  }

  return (
    <Container>

      <h3 style={{
        marginTop: '8rem',
        fontWeight: '600'
      }}>{t('moderator.title')}</h3>
      <hr />
      {/* Фильтры */}
      <div className="filter-container">
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
          <option value="section-2">{t('sections.mathProblems')}</option>
          <option value="section-3">{t('sections.aiML')}</option>
          <option value="section-4">{t('sections.mechanicsRobotics')}</option>
          <option value="section-5">{t('sections.teachingMethods')}</option>
          <option value="section-6">{t('sections.translationProblems')}</option>
        </Form.Select>
        <Form.Select value={selectedStatus} style={{
          borderRadius: '0'
        }} onChange={(e) => setSelectedStatus(e.target.value)}>
          <option value="">{t('moderator.article.statuses')}</option>
          <option value="approved">{t("article.status.approved")}</option>
          <option value="process">{t("article.status.process")}</option>
          <option value="denied">{t("article.status.denied")}</option>
        </Form.Select>
      </div>
      {/* Скроллируемая таблица */}
      <div className="table-container">
        <Table bordered striped hover>
          <thead>
            <tr>
              <th>{t('moderator.article.name')}</th>
              <th>{t('moderator.article.authors')}</th>
              <th>{t('moderator.article.section')}</th>
              <th>{t('moderator.article.status')}</th>
              <th className="text-center" style={{ width: 'auto' }}>{t('moderator.article.file')}</th>
              <th className="text-end">{t('moderator.article.action')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.map((article) => (
              <tr key={article._id}>
                <td className="align-middle" style={{width: 'auto'}}>{article.title}</td>
                <td className="align-middle" style={{width: '200px'}}>
                  {article.correspondent ? (
                    <>
                      {article.correspondent.lastname} {article.correspondent.firstname}
                      {article.correspondent.coauthors?.length > 0 && (
                        `, ${article.correspondent.coauthors.map(coauthor => `${coauthor.lastname} ${coauthor.firstname}`).join(", ")}`
                      )}
                    </>
                  ) : t('moderator.article.unknownauthor')}
                </td>

                <td className="align-middle" style={{width: '200px'}}>{sectionName(article.section)}</td>
                <td style={article?.status == "approved" ? {
                  backgroundColor: '#43A047', color: 'white'
                } : article?.status == "denied" ? {
                  backgroundColor: '#E53935', color: 'white'
                } : {
                  backgroundColor: '#098cf7', color: 'white'
                }} className="text-center align-middle">{getArticleStatus(article.status) }</td>
                <td className="align-middle text-center">{article.file_url ? <a href={`http://localhost:5000${article.file_url}`} download>{t('moderator.article.download')}</a> : t('moderator.article.notfoundfile')}</td>
                <td className="text-end">
                  <button className="btn btn-mdtr1 "
                    onClick={() => updateArticleStatus(article._id, "approved")}>
                    {t("article.status.is.approved")}
                  </button>{' '}
                  <button className="btn btn-mdtr2" onClick={() => updateArticleStatus(article._id, "process")} >
                  {t("article.status.is.process")}
                  </button>{' '}
                  <button className=" btn btn-mdtr3" onClick={() => updateArticleStatus(article._id, "denied")}>
                  {t("article.status.is.denied")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Стили */}
      <style>{`
        .filter-container {
          display: flex;
          gap: 10px;
          margin-bottom: 10px;
        }

        .table-container {
          max-height: 70vh; /* 🔥 Высота скролла */
          overflow-y: auto;
          border: 1px solid #ddd;
        }
      `}</style>
    </Container>
  );
};

