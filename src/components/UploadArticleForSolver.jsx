import React, { useState } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";
import axios from "../utils/axios.js";
import { useTranslation } from "react-i18next";
import SubmitSolveArticle from "./SubmitSolveArticle.jsx";

const UploadArticleForSolver = ({ userData, problems }) => {

    const { t } = useTranslation();

    const [section, setSection] = useState("");
    const [articleTitle, setArticleTitle] = useState("");
    const [coauthors, setCoauthors] = useState([]);
    const [problem, setProblem] = useState("");
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");

    // Добавление нового соавтора
    const handleAddCoauthor = () => {
        setCoauthors([...coauthors, { lastName: "", firstName: "", fatherName: "", organization: "", position: "", rank: "", degree: "", participationForm: "" }]);
    };

    // Удаление соавтора
    const handleRemoveCoauthor = (index) => {
        setCoauthors(coauthors.filter((_, i) => i !== index));
    };

    // Изменение данных соавтора
    const handleCoauthorChange = (index, field, value) => {
        const updatedCoauthors = [...coauthors];
        updatedCoauthors[index][field] = value;
        setCoauthors(updatedCoauthors);
    };

    // Загрузка файла
    const handleFileUpload = async (event) => {
        try {
            const formData = new FormData();
            const selectedFile = event.target.files?.[0];
            if (!selectedFile) return alert("Выберите файл!");
            formData.append("file", selectedFile);
            formData.append("section", section);
            formData.append("articleTitle", articleTitle);
            formData.append("correspondentName", `${userData.lastname}_${userData.firstname}_${userData.fathername || ""}`);
            formData.append("problem", problem);
           // formData.append("coauthors", JSON.stringify(coauthors)); // Передаем соавторов как JSON
            const { data } = await axios.post("/api/upload/article/solve", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setUploadStatus("Файл успешно загружен!");
            setFile(data.url);
        } catch (error) {
            console.error("Ошибка загрузки:", error);
            setUploadStatus("Ошибка загрузки файла");
        }
    };

    const  getPositionName = (posname) => {
        switch (posname) {
            case "researcher": 
                return t('registration.step2.posname.researcher');
            case "lecturer": 
                return t('registration.step2.posname.lecturer');
            case "companyRep":
                return t('registration.step2.posname.companyRep');
            case "doctoralStudent":
                return t('registration.step2.posname.doctoralStudent');
            case "mastersStudent":
                return t('registration.step2.posname.mastersStudent');
            case "student": 
                return t('registration.step2.posname.student');
            case "otherPosition":
                return t('registration.step2.posname.other');
        }
    }

    const getRankName = (rankname) => {
        switch(rank) {
            case "professor":
                return t('registration.step2.rank.professor');
            case "associateProfessor":
                return t('registration.step2.rank.associateProfessor')
            
        }
    }

    const getDegreeName = () => {
        switch(degree) {
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
        <Container className="add-problem-article">
            <h3>{t('loadarticle')}</h3>

            {/* Выбор секции */}
            <Form.Group>
                <Form.Select className="mt-2" value={section} onChange={(e) => setSection(e.target.value)}>
                    <option value="">{t('choosesection')}</option>
                    <option value="section-1">{t('sections.mathModeling')}</option>
		    <option value="section-2">{t('sections.socio')}</option>                    
		    <option value="section-3">{t('sections.mathProblems')}</option>
                    <option value="section-4">{t('sections.aiML')}</option>
                    <option value="section-5">{t('sections.mechanicsRobotics')}</option>
                    <option value="section-6">{t('sections.teachingMethods')}</option>
                    <option value="section-7">{t('sections.translationProblems')}</option>
                
                </Form.Select>
            </Form.Group>
            
            {/* Ввод названия статьи */}
            <Form.Group>
                <Form.Control className="mt-2" required type="text" value={articleTitle} onChange={(e) => setArticleTitle(e.target.value)} placeholder={t('step4.enterArticleTitle')} />
            </Form.Group>
            <Form.Group>
                <Form.Select className="mt-2" value={problem} onChange={(e) => setProblem(e.target.value)}>
                    
                    <option value="">{t('chooseproblem')}</option>
                    {
                        problems.length > 0 && (problems.map((prob, i) => (
                            <option value={prob?._id}>{prob.title}</option>
                        ))) 
                    }
                </Form.Select>
            </Form.Group>
            <br />
            {/* Таблица соавторов */}
            <h3>{t('coauthors')}</h3>
            <Table striped bordered className=''>
                <thead>
                    <tr>
                        <th>{t('coauthor.lastName')}</th>
                        <th>{t('coauthor.firstName')}</th>
                        <th>{t('coauthor.fatherName')}</th>
                        <th>{t('coauthor.organization')}</th>
                        <th>{t('coauthor.positiions')}</th>
                        <th>{t('coauthor.rank')}</th>
                        <th>{t('coauthor.degree')}</th>
                        <th>{t('coauthor.participationForm')}</th>
                        <th>{t('coauthor.actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {coauthors.map((coauthor, index) => (
                        <tr key={index}>
                            <td ><Form.Control required type="text" value={coauthor.lastName} onChange={(e) => handleCoauthorChange(index, "lastName", e.target.value)} /></td>
                            <td ><Form.Control required type="text" value={coauthor.firstName} onChange={(e) => handleCoauthorChange(index, "firstName", e.target.value)} /></td>
                            <td ><Form.Control  type="text" value={coauthor.fatherName} onChange={(e) => handleCoauthorChange(index, "fatherName", e.target.value)} /></td>
                            <td ><Form.Control required type="text" value={coauthor.organization} onChange={(e) => handleCoauthorChange(index, "organization", e.target.value)} /></td>
                            <td >
                                <Form.Select required
                                    value={coauthor.evwe}
                                    onChange={(e) => handleCoauthorChange(index, 'position', e.target.value)}>
                                    <option value="">-- {t('select')} --</option>
                                    <option value="researcher">{t('registration.step2.positions.researcher')}</option>
                                    <option value="lecturer">{t('registration.step2.positions.lecturer')}</option>
                                    <option value="companyRep">{t('registration.step2.positions.companyRep')}</option>
                                    <option value="doctoralStudent">{t('registration.step2.positions.doctoralStudent')}</option>
                                    <option value="mastersStudent">{t('registration.step2.positions.mastersStudent')}</option>
                                    <option value="student">{t('registration.step2.positions.student')}</option>
                                    <option value="otherPosition">{t('registration.step2.positions.other')}</option>
                                </Form.Select>
                            </td>
                            <td >
                                <Form.Select required
                                    value={coauthor.rank}
                                    onChange={(e) => handleCoauthorChange(index, 'rank', e.target.value)}>
                                    <option value="">-- {t('select')} --</option>
                                    <option value="professor">{t('registration.step2.rank.professor')}</option>
                                    <option value="associateProfessor">{t('registration.step2.rank.associateProfessor')}</option>
                                    <option value="-">-</option>
                                </Form.Select>
                            </td>
                            <td >
                                <Form.Select required
                                    value={coauthor.degree}
                                    onChange={(e) => handleCoauthorChange(index, 'degree', e.target.value)}>
                                    <option value="">-- {t('select')} --</option>
                                    <option value="doctorOfSciences">{t('registration.step2.degree.doctorOfSciences')}</option>
                                    <option value="candidateOfSciences">{t('registration.step2.degree.candidateOfSciences')}</option>
                                    <option value="phd">{t('registration.step2.degree.phd')}</option>
                                    <option value="master">{t('registration.step2.degree.master')}</option>
                                    <option value="bachelor">{t('registration.step2.degree.bachelor')}</option>
                                    <option value="-">-</option>
                                </Form.Select>
                            </td>
                            <td >
                                <Form.Select required
                                    value={coauthor.participationForm}
                                    onChange={(e) => handleCoauthorChange(index, 'participationForm', e.target.value)}>
                                    <option value="">-- {t('select')} --</option>
                                    <option value="online">{t('participation_form.online')}</option>
                                    <option value="offline">{t('participation_form.offline')}</option>
                                    <option value="mixed">{t('participation_form.mixed')}</option>
                                </Form.Select>
                            </td>
                            <td>
                                <Button variant="danger" className="w-100" onClick={() => handleRemoveCoauthor(index)}> {t('delete')}</Button>
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
            
            {/* Загрузка файла */}
            <Form.Group>
                <Form.Control className="mt-3" type="file" accept=".pdf, .doc, .docx, .tex" onChange={handleFileUpload} />
            </Form.Group>
            {file && (
                <span style={{ color: 'green', marginTop: '5px' }}>
                  {file &&  
                  <span>{t('step4.fileSelected')} <a href={`https://conference.buketov.edu.kz${file}`}>{t('watch')}</a>  
                  </span> }
                </span>
              )}
              <hr />
              <div className="d-flex col justify-content-end">
              {/* <Button style={{
                borderColor: '#1168eb',
                backgroundColor: '#1168eb',
                padding: '10px 26px',
                color: 'white'
              }}>Создать статью</Button>  */}
              <SubmitSolveArticle formData={{ 
                articleTitle, 
                section, 
                correspondentId: userData._id, 
                problem, 
                file, 
                coauthors 
                }} />
              </div>
              
        </Container>
    );
};

export default UploadArticleForSolver;
