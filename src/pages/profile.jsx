import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Tab, Nav, Table, Button, Alert, ProgressBar, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchProblems, fetchUserProfile, selectIsAuth } from "../redux/store.js";
import { ContentSpinner } from "../components";
import { useTranslation } from "react-i18next";
import UploadArticleForSolver from "../components/UploadArticleForSolver.jsx";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import EventIcon from "@mui/icons-material/Event";
import ScienceIcon from "@mui/icons-material/Science";
import PeopleIcon from "@mui/icons-material/People";
import CelebrationIcon from "@mui/icons-material/Celebration";
import Typography from "@mui/material/Typography";
import moment from "moment";


const importantDates = [
  { date: "2025-03-15", event: "Конец регистрации (Problem)" },
  { date: "2025-06-01", event: "Конец регистрации (Solve)" },
  { date: "2025-06-17", event: "День заезда" },
  { date: "2025-06-18", event: "Открытие конференции" },
  { date: "2025-06-19", event: "Закрытие конференции" },
  { date: "2025-06-20", event: "День отъезда" },
];



const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.user.profile);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    dispatch(fetchUserProfile())
      .then(() => setLoading(false))
      .catch((err) => {
        console.error("Ошибка загрузки профиля:", err);
        setError(t("profile.errorLoading"));
        setLoading(false);
      });
  }, [dispatch, t]);

  if (!isAuth) {
    return (
      <Container className="d-flex row align-items-center justify-content-center" style={{ height: '50vh' }}>
        <Alert variant="warning">{t("profile.notAuthorized")}</Alert>
      </Container>
    );
  }

  if (loading) return <ContentSpinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!userData) {
    return (
      <Container className="d-flex row align-items-center justify-content-center" style={{ height: '50vh' }}>
        <Alert variant="danger">{t("profile.failedToLoad")}</Alert>
      </Container>
    );
  }

  console.log(userData)
  return (
    <Container style={{
      marginTop: '9rem'
    }}>

      <Tab.Container defaultActiveKey="personal">
        <Row>
          <Col md={12}>
            <Nav variant="pills" className="flex-row">
              <Nav.Item >
                <div className="pill-btn">
                  <Nav.Link className="nav-link" eventKey="personal">{t("profile.tabs.personal")}</Nav.Link>
                </div>
              </Nav.Item>
              {userData?.role !== "moderator" && (
                <Nav.Item>
                  <div className="pill-btn">
                    <Nav.Link className="nav-link" eventKey="article">{t("profile.tabs.article")}</Nav.Link>
                  </div>
                </Nav.Item>
              )}
              {userData?.role === "correspondent" && (
                <Nav.Item>
                  <div className="pill-btn">
                    <Nav.Link className="nav-link" eventKey="coauthors">{t("profile.tabs.coauthors")}</Nav.Link>
                  </div>
                </Nav.Item>
              )}
              {/* {userData?.role !== "coauthor" && ( */}
              <Nav.Item>
                <div className="pill-btn">
                  <Nav.Link className="nav-link" eventKey="timeline">{t("profile.tabs.timeline")}</Nav.Link>
                </div>
              </Nav.Item>
              {/* )} */}
            </Nav>
          </Col>
          {!userData?.isVerified ?
            <Col sm={12}>
              <br />
              <Alert variant="danger" style={{ borderRadius: "0" }}>
                {userData?.role === "correspondent" ? (
                  <span dangerouslySetInnerHTML={{ __html: t('verification_alert.correspondent', { email: userData?.email }) }} />
                ) : userData?.role === "coauthor" && (
                  <span dangerouslySetInnerHTML={{
                    __html: t('verification_alert.coauthor', {
                      lastname: userData?.correspondent_data?.lastname,
                      firstname: userData?.correspondent_data?.firstname,
                      email: userData?.correspondent_data?.email
                    })
                  }} />
                )}
              </Alert>
            </Col>

            :
            <Col sm={12}>
              <Tab.Content>
                <Tab.Pane eventKey="personal">
                  <PersonalInfo userData={userData} />
                </Tab.Pane>
                {userData?.role !== "moderator" && (
                  <Tab.Pane eventKey="article">
                    <MyArticle userData={userData} role={userData?.role} />
                  </Tab.Pane>
                )}
                {userData?.role == "correspondent" && (
                  <Tab.Pane eventKey="coauthors">
                    <CoauthorsTab userData={userData} />
                  </Tab.Pane>
                )}
                <Tab.Pane eventKey="timeline">
                  <TimelineTab userData={userData} />
                </Tab.Pane>

              </Tab.Content>
            </Col>
          }
        </Row>
      </Tab.Container>
    </Container>
  );
};

function PersonalInfo({ userData }) {


  const { t } = useTranslation();
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

  return (
    <div>
      <br />
      <h3>{t('profile.main.title')}</h3>
      <br />
      <Table bordered striped  >
        {
          userData?.role == "correspondent" ?
            <tbody>
              <tr>
                <td className="td-title">{t('profile.main.fio')}</td>
                <td>{userData?.lastname} {userData?.firstname} {userData?.fathername || ''}</td>
              </tr>
              <tr>
                <td className="td-title">{t('profile.main.phone')}</td>
                <td>{userData?.phone}</td>
              </tr>
              <tr>
                <td className="td-title">{t('profile.main.email')}</td>
                <td>{userData?.email}</td>
              </tr>
              <tr>
                <td className="td-title">{t('profile.main.login')}</td>
                <td>{userData?.login}</td>
              </tr>
              <tr>
                <td className="td-title">{t('profile.main.organization')}</td>
                <td>{userData?.organization}</td>
              </tr>
              <tr>
                <td className="td-title">{t('profile.main.position')}</td>
                <td>{getPositionName(userData?.position)}</td>
              </tr>
              <tr>
                <td className="td-title">{t('profile.main.rank')}</td>
                <td>{getRankName(userData?.rank)}</td>
              </tr>
              <tr>
                <td className="td-title">{t('profile.main.degree')}</td>
                <td>{getDegreeName(userData?.degree)}</td>
              </tr>
              <tr>
                <td className="td-title">{t('profile.main.role')}</td>
                <td>{getRoleName(userData?.role)}</td>
              </tr>
            </tbody> :
            <tbody>
              <tr>
                <td className="td-title">{t('profile.main.fio')}</td>
                <td>{userData?.lastname} {userData?.firstname} {userData?.fathername || ''}</td>
              </tr>
              <tr>
                <td className="td-title">{t('profile.main.login')}</td>
                <td>{userData?.login}</td>
              </tr>
              <tr>
                <td className="td-title">{t('profile.main.organization')}</td>
                <td>{userData?.organization}</td>
              </tr>
              <tr>
                <td className="td-title">{t('profile.main.position')}</td>
                <td>{getPositionName(userData?.position)}</td>
              </tr>
              <tr>
                <td className="td-title">{t('profile.main.rank')}</td>
                <td>{getRankName(userData?.rank)}</td>
              </tr>
              <tr>
                <td className="td-title">{t('profile.main.degree')}</td>
                <td>{getDegreeName(userData?.degree)}</td>
              </tr>
              <tr>
                <td className="td-title">{t('profile.main.role')}</td>
                <td>{getRoleName(userData?.role)}</td>
              </tr>
            </tbody>
        }
      </Table>
    </div>
  );
}



function MyArticle({ userData, role }) {
  const dispatch = useDispatch();
  const { problems, loading, error } = useSelector((state) => state.article);
  const article = userData.article;
  const [timeLeft, setTimeLeft] = useState("");
  const [isTimeLeft, setIsTimeLeft] = useState(false);
  const [showUploadComponent, setShowUploadComponent] = useState(false);
  const deadline = moment("2025-03-15T00:00:00");
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
      case 'section-7':

        return t('sections.socio');
    }
  }


  const getArticleStatus = (articleStatus) => {
    switch (articleStatus) {
      case "process":
        return t("article.status.process")
      case "approved":
        return t("article.status.approved")
      case "denied":
        return t("article.status.denied")
    }
  }


  useEffect(() => {
    dispatch(fetchProblems()); // Загружаем проблемы при монтировании
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const diff = moment.duration(deadline.diff(now));

      if (diff.asSeconds() <= 0) {
        setTimeLeft(t('profile.isdeadline'));
        setIsTimeLeft(true)
        clearInterval(interval);
      } else {
        setTimeLeft(`${diff.days()}${t('profile.time.d')} ${diff.hours()}${t('profile.time.h')} ${diff.minutes()}${t('profile.time.m')} ${diff.seconds()}${t('profile.time.s')}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  if (!article) {
    return (
      <div className="no-article-div">
        <br />
        <h3>{t('profile.article.title')}</h3>
        <br />
        <Alert variant="info" style={{ borderRadius: '0' }}>
          {t('profile.article.notfound')}
        </Alert>
        <div style={{ marginBottom: "1rem", fontSize: "1.5rem", fontWeight: "300", color: '#1168eb' }}>
          {timeLeft}
        </div>
        {userData?.participation_type === "solve" && (
          <>
            <Button className="button-add" variant="primary" disabled={isTimeLeft} onClick={() => setShowUploadComponent(!showUploadComponent)}>
              {showUploadComponent ? t('profile.article.hidearticleupload') : t('profile.article.articleupload')}
            </Button>
            {showUploadComponent && <UploadArticleForSolver userData={userData} problems={problems && problems} />}
          </>
        )}
        <hr />
        {/* {userData?.participation_type === "solve" && ( */}
        <div className="problem-db">
          <h4>{t('profile.article.baseproblems')}</h4>

          {loading ? (
            <Alert variant="info">{t('profile.article.problemsloading')}</Alert>
          ) : error ? (
            <Alert variant="danger">{t('profile.error')} {error}</Alert>
          ) : (
            <Table bordered striped hover>
              <thead>
                <tr>
                  <th>№</th>
                  <th>{t('profile.article.table.name')}</th>
                  <th style={{ width: '18rem' }}>{t('profile.article.table.section')}</th>
                  <th style={{ width: '14rem' }}>{t('profile.article.table.authors')}</th>
                  <th style={{ width: '3rem' }}>{t('profile.article.table.document')}</th>
                </tr>
              </thead>
              <tbody>
                {problems.length > 0 ? (
                  problems.map((problem, index) => {
                    // Формируем список авторов (Корреспондент + Соавторы)
                    const authorsList = [
                      `${problem.correspondent?.lastname} ${problem.correspondent?.firstname} ${problem.correspondent?.fathername}`
                    ];

                    if (problem.correspondent?.coauthors && problem.correspondent?.coauthors.length > 0) {
                      const coauthorsNames = problem.correspondent?.coauthors.map(coauthor =>
                        `${coauthor.lastname} ${coauthor.firstname} ${coauthor?.fathername}`
                      );
                      authorsList.push(...coauthorsNames);
                    }

                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{problem.title}</td>
                        <td>{sectionName(problem?.section)}</td>
                        <td>{authorsList.join(", ")}</td> {/* ✅ Выводим всех авторов через запятую */}
                        <td>
                          {problem.file_url ? (
                            <a href={`http://localhost:5000${problem.file_url}`} download>{t('profile.article.table.download')}</a>
                          ) : t('profile.article.table.filenotfound')}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5">{t('profile.article.problemnotfound')}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}

          {/* <Button variant="success" onClick={() => setShowUploadComponent(!showUploadComponent)}>
            {showUploadComponent ? "Скрыть загрузку статьи" : "Загрузить статью"}
          </Button>

          {showUploadComponent && <UploadArticleForSolver userData={userData} />} */}
        </div>
        {/* )} */}
      </div>
    );
  }

  return (
    <div>
      <br />
      <h3>{t('profile.article.title')}</h3>
      <br />
      <Table bordered striped hover>
        <tbody>
          <tr>
            <td className="td-title">{t('profile.article.table.name')}</td>
            <td>{article.title}</td>
          </tr>
          <tr>
            <td className="td-title">{t('profile.article.table.section')}</td>
            <td>{sectionName(article.section)}</td>
          </tr>
          <tr>
            <td className="td-title">{t('profile.article.table.status')}</td>
            <td  > <span style={article?.status == "approved" ? {
              backgroundColor: '#43A047', color: 'white', borderRadius: '12px', padding: '4px 16px'
            } : article?.status == "denied" ? {
              backgroundColor: '#E53935', color: 'white', borderRadius: '12px', padding: '4px 16px'
            } : {
              backgroundColor: '#098cf7', color: 'white', borderRadius: '12px', padding: '4px 16px'
            }}>{getArticleStatus(article.status)}</span></td>
          </tr>
          <tr>
            <td className="td-title">{t('profile.article.table.document')}</td>
            <td>
              {article.file_url ? (
                <a href={`http://localhost:5000${article.file_url}`} download>{t('profile.article.table.download')}</a>
              ) : t('profile.article.table.notdownloaded')}
            </td>
          </tr>
        </tbody>
      </Table>


    </div>
  );
}


function CoauthorsTab({ userData }) {

  const { t } = useTranslation()

  if (!userData.coauthors || userData.coauthors.length === 0) {
    return (<div>
      <br />
      <h3>{t('profile.coauthors.title')}</h3>
      <br />
      <Alert variant="info" style={{ borderRadius: '0' }}>{t('profile.coauthors.notfound')}</Alert>
    </div>);
  }

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
    <div>
      <br />
      <h3>{t('profile.coauthors.title')}</h3>
      <br />
      <Table striped bordered>
        <thead>
          <tr>
            <th>№</th>
            <th>{t('profile.coauthors.table.fio')}</th>
            <th>{t('profile.coauthors.table.location')}</th>
            <th>{t('profile.coauthors.table.position')}</th>
            <th>{t('profile.coauthors.table.rank')}</th>
            <th>{t('profile.coauthors.table.degree')}</th>
            <th>{t('profile.coauthors.table.partification_form')}</th>
            <th>{t('profile.coauthors.table.login')}</th>
            <th>{t('profile.coauthors.table.password')}</th>
          </tr>
        </thead>
        <tbody>
          {userData.coauthors.map((c, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{c.lastname} {c.firstname} {c.fathername || ''}</td>
              <td>{c.organization}</td>
              <td>{getPositionName(c.position)}</td>
              <td>{getRankName(c.rank)}</td>
              <td>{getDegreeName(c.degree)}</td>
              <td>{getparticipation_form(c.participation_form)}</td>
              <td>{c.login || 'N/A'}</td>
              <td>{c.password || '******'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

const TimelineTab = () => {


  const [nextDeadline, setNextDeadline] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  const { t, i18n } = useTranslation()

  const timelineStages = [
    { title: t('profile.timeline.timelinestages.1.title'), deadline: "2025-03-15", icon: <ScienceIcon />, description: t('profile.timeline.timelinestages.1.desc') },
    { title: t('profile.timeline.timelinestages.2.title'), deadline: "2025-06-01", icon: <PeopleIcon />, description: t('profile.timeline.timelinestages.2.desc') },
    { title: t('profile.timeline.timelinestages.3.title'), deadline: "2025-06-18", icon: <EventIcon />, description: t('profile.timeline.timelinestages.3.desc') },
    { title: t('profile.timeline.timelinestages.4.title'), deadline: "2025-06-20", icon: <CelebrationIcon />, description: t('profile.timeline.timelinestages.4.desc') },
  ];



  const [currentStage, setCurrentStage] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = moment();
      let stage = timelineStages.find(stage => now.isBefore(moment(stage.deadline, "YYYY-MM-DD")));

      if (!stage) {
        setCurrentStage(t('profile.timeline.final'));
        setTimeLeft("");
        return;
      }

      setCurrentStage(stage.title);
      setNextDeadline(moment(stage.deadline, "YYYY-MM-DD"));

      // Обновляем обратный отсчёт
      const diff = moment.duration(moment(stage.deadline, "YYYY-MM-DD").diff(now));
      setTimeLeft(`${diff.days()}${t('profile.timeline.time.d')} ${diff.hours()}${t('profile.timeline.time.h')} ${diff.minutes()}${t('profile.timeline.time.m')} ${diff.seconds()}${t('profile.timeline.time.s')}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [i18n.language]);

  return (
    <Container className="timeline-container" >
      <Card sx={{ p: 3, mb: 3 }} style={{
        padding: '12px'
      }}>
        <Typography variant="h6"><div><span style={{ marginBottom: "1rem", fontSize: "1.8rem", fontWeight: "300", color: '#1168eb' }}>
          {currentStage}</span><span style={{
            marginLeft: '8px', color: 'gray',
            fontSize: '14px'
          }}>({t('profile.timeline.currentstep')})</span></div></Typography>
        {nextDeadline && <Typography variant="body1"><span style={{
          fontSize: '1.4rem', fontWeight: '500'
        }}>{timeLeft}</span><span style={{ marginLeft: '8px', fontSize: '14px', color: 'gray' }}>({t('profile.timeline.fornextstep')})</span></Typography>}
      </Card>

      <Timeline position="alternate">
        {timelineStages.map((stage, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              {moment(stage.deadline, "YYYY-MM-DD").format("DD-MM-YYYY")}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color={index % 2 === 0 ? "primary" : "info"}>
                {stage.icon}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: "12px", px: 2 }}>
              <Typography variant="h6" component="span">
                {stage.title}
              </Typography>
              <Typography variant="body2">{stage.description}</Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Container>
  );
};


export default Profile;
