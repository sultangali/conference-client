import React from 'react';
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { axios } from '../../utils';

export const Step4 = ({ formData, setFormData, validationErrors }) => {
  const { t } = useTranslation();

  const coauthors = formData.coauthors || [];
  const [file, setFile] = React.useState(formData.articleFile || null);

  const handleSectionChange = (e) => {
    setFormData((prev) => ({ ...prev, section: e.target.value }));
  };

  const handleTitleChange = (e) => {
    setFormData((prev) => ({ ...prev, articleTitle: e.target.value }));
  };

  const handleAddCoauthor = () => {
    const newCoauthor = {
      lastName: '',
      firstName: '',
      fatherName: '',
      organization: '',
      position: '',
      rank: '',
      degree: '',
      participationForm: '',
    };
    setFormData((prev) => ({
      ...prev,
      coauthors: [...(prev.coauthors || []), newCoauthor],
    }));
  };

  const handleRemoveCoauthor = (index) => {
    const updated = [...coauthors];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, coauthors: updated }));
  };

  const handleCoauthorFieldChange = (index, field, value) => {
    const updated = [...coauthors];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, coauthors: updated }));
  };
  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files?.[0];
  //   if (selectedFile) {
  //     setFile(selectedFile);
  //     setFormData((prev) => ({ ...prev, articleFile: selectedFile }));
  //   }
  // };
  const handleChangeFile = async (event) => {
    try {
      const formDataData = formData; // Получаем актуальные данные формы

      const formData2 = new FormData();
      const selectedFile = event.target.files?.[0];
      setFile(selectedFile)
      if (!selectedFile) return alert("Выберите файл!");

      // ✅ Добавляем файл
      formData2.append("file", selectedFile);

      // ✅ Добавляем актуальные данные секции
      formData2.append("section", formDataData.section || "no_section");

      // ✅ Добавляем ФИО корреспондента (из `formData`)
      const correspondentName = `${formDataData.lastName || "no_lastname"}_${formDataData.firstName || "no_firstname"}_${formDataData.fatherName || "no_fathername"}`;
      formData2.append("correspondentName", correspondentName);

      console.log("📤 Отправка FormData:", {
        file: selectedFile.name,
        section: formData2.get("section"),
        correspondentName: formData2.get("correspondentName"),
      });

      const { data } = await axios.post("/api/upload/article/problem", formData2, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Сервер ответил:", data);

      setFormData((prev) => ({ ...prev, articleFile: data.url }));
    } catch (error) {
      console.warn("Ошибка загрузки:", error);
      alert("Ошибка при загрузке файла");
    }
  };



  console.log("file", file, "formData", formData)
  return (
    <Container fluid style={{ padding: '0' }}>
      <Row className="d-flex row justify-content-center">
        <Col lg={12} xs={12}>
          <Row className="step-form d-flex row justify-content-center">
            <Col xs={12} style={{ marginBottom: '12px' }}>
              <Form.Label>{t('step4.section')} *</Form.Label>
              <Form.Select value={formData.section || ''} onChange={handleSectionChange}>
                <option value="">{t('step4.selectSection')}</option>
                <option value="section-1">{t('sections.mathModeling')}</option>
                <option value="section-2">{t('sections.mathProblems')}</option>
                <option value="section-3">{t('sections.aiML')}</option>
                <option value="section-4">{t('sections.mechanicsRobotics')}</option>
                <option value="section-5">{t('sections.teachingMethods')}</option>
                <option value="section-6">{t('sections.translationProblems')}</option>
                <option value="section-7">{t('sections.socio')}</option>
              </Form.Select>
              {validationErrors.section && (
                <div style={{ color: 'red' }}>{validationErrors.section}</div>
              )}
            </Col>

            <Col xs={12} style={{ marginBottom: '12px' }}>
              <Form.Label>{t('step4.articleTitle')} *</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('step4.enterArticleTitle')}
                value={formData.articleTitle || ''}
                onChange={handleTitleChange}
              />
              {validationErrors.articleTitle && (
                <div style={{ color: 'red' }}>{validationErrors.articleTitle}</div>
              )}
            </Col>

            <Col xs={12}>
              <p style={{ fontWeight: 'bold' }}>{t('step4.coauthors')}</p>
              <Table bordered striped className='coauthor-tbl-inpt'>
                <thead>
                  <tr>
                    <th>{t('coauthor.lastName')}</th>
                    <th>{t('coauthor.firstName')}</th>
                    <th>{t('coauthor.fatherName')}</th>
                    <th>{t('coauthor.organization')}</th>
                    <th>{t('coauthor.position')}</th>
                    <th>{t('coauthor.rank')}</th>
                    <th>{t('coauthor.degree')}</th>
                    <th>{t('coauthor.participationForm')}</th>
                    <th>{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {coauthors.map((coauthor, index) => (
                    <tr key={index}>
                      <td>
                        <Form.Control
                          type="text"
                          value={coauthor.lastName}
                          onChange={(e) => handleCoauthorFieldChange(index, 'lastName', e.target.value)}
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="text"
                          value={coauthor.firstName}
                          onChange={(e) => handleCoauthorFieldChange(index, 'firstName', e.target.value)}
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="text"
                          value={coauthor.fatherName}
                          onChange={(e) => handleCoauthorFieldChange(index, 'fatherName', e.target.value)}
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="text"
                          value={coauthor.organization}
                          onChange={(e) => handleCoauthorFieldChange(index, 'organization', e.target.value)}
                        />
                      </td>
                      <td>
                        <Form.Select
                          value={coauthor.position}
                          onChange={(e) => handleCoauthorFieldChange(index, 'position', e.target.value)}
                        >
                          <option value="">-- {t('select')} --</option>
                          <option value="researcher">{t('registration.step2.positions.researcher')}</option>
                          <option value="lecturer">{t('registration.step2.positions.lecturer')}</option>
                          <option value="companyRep">{t('registration.step2.positions.companyRep')}</option>
                          <option value="doctoralStudent">{t('registration.step2.positions.doctoralStudent')}</option>
                          <option value="mastersStudent">{t('registration.step2.positions.mastersStudent')}</option>
                          <option value="student">{t('registration.step2.positions.student')}</option>
                          
                        </Form.Select>
                      </td>
                      <td>
                        <Form.Select
                          value={coauthor.rank}
                          onChange={(e) => handleCoauthorFieldChange(index, 'rank', e.target.value)}
                        >
                          <option value="">-- {t('select')} --</option>
                          <option value="professor">{t('registration.step2.rank.professor')}</option>
                          <option value="associateProfessor">{t('registration.step2.rank.associateProfessor')}</option>
                          <option value="-">-</option>
                        </Form.Select>
                      </td>
                      <td>
                        <Form.Select
                          value={coauthor.degree}
                          onChange={(e) => handleCoauthorFieldChange(index, 'degree', e.target.value)}
                        >
                          <option value="">-- {t('select')} --</option>
                          <option value="doctorOfSciences">{t('registration.step2.degree.doctorOfSciences')}</option>
                          <option value="candidateOfSciences">{t('registration.step2.degree.candidateOfSciences')}</option>
                          <option value="phd">{t('registration.step2.degree.phd')}</option>
                          <option value="master">{t('registration.step2.degree.master')}</option>
                          <option value="bachelor">{t('registration.step2.degree.bachelor')}</option>
                          <option value="-">-</option>
                        </Form.Select>
                      </td>
                      <td>
                        <Form.Select
                          value={coauthor.participationForm}
                          onChange={(e) => handleCoauthorFieldChange(index, 'participationForm', e.target.value)}
                        >
                          <option value="">-- {t('select')} --</option>
                          <option value="online">{t('participation_form.online')}</option>
                          <option value="offline">{t('participation_form.offline')}</option>
                          <option value="mixed">{t('participation_form.mixed')}</option>
                        </Form.Select>
                      </td>
                      <td>
                        <Button variant="danger" onClick={() => handleRemoveCoauthor(index)}>
                          {t('delete')}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button variant="success" style={{
                border: '1px solid #43A047',
                borderRadius: '1px',
                backgroundColor: '#43A047',
                color: 'white'
              }} onClick={handleAddCoauthor}>{t('step4.addCoauthor')}</Button>
            </Col>
            <Col xs={12} style={{ marginTop: '20px' }}>
              <Form.Label>{t('step4.attachFile')}</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf, .doc, .docx, .tex"
                onChange={handleChangeFile}
              />
              {file && (
                <span style={{ color: 'green', marginTop: '5px' }}>
                  {formData?.articleFile &&
                    <span>{t('step4.fileSelected')} <a href={`https://conference.buketov.edu.kz${formData?.articleFile}`}>Посмотреть</a>
                    </span>}
                </span>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
