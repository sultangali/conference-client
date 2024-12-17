import React from "react";
import { Tab, Container, Row, Col, Button, Card, ButtonGroup, Nav, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "react-phone-number-input/style.css";
import { fetchAuthMe, selectIsAuth } from "../redux/slices/user.js";

import * as tools from "../utils/index.js";
import * as components from '../components/index.js'
import alt from '../assets/alt.png'

const Profile = () => {

  const [activeTab, setActiveTab] = React.useState("personal")

  const inputFileRef = React.useRef(null);

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.data);

  const isAuth = useSelector(selectIsAuth)

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await tools.axios.post("/api/upload/avatar", formData);
      alert(JSON.stringify(data))
    } catch (error) {
      console.warn(error);
      alert("Бейнені көшіру кезінде қате шықты");
    }
    dispatch(fetchAuthMe());
  };

  console.log(isAuth)

  console.log('userData', userData)

  return (!userData ?

    <components.ContentSpinner />
    :
    <Container>
      <br />
      <Container>
        <h4 style={{ marginTop: "12rem" }}>Личный профиль</h4>
        <Tab.Container>
          <Row>
            <Col lg={12} className="w-100 code-generation-btn">
            <br />
              <ButtonGroup className="d-flex justify-content-between button-group">
                <Button
                  variant="outline-primary"
                  style={{
                    borderRadius: '1px'
                  }}
                  onClick={() => setActiveTab('personal')}
                  className={`profile-nav-link ${activeTab === 'personal' ? 'active' : ''}`}>
                  Основная информация
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={() => setActiveTab('timeline')}
                  className={`profile-nav-link ${activeTab === 'timeline' ? 'active' : ''}`}>
                  Таймлайн
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={() => setActiveTab('article')}
                  className={`profile-nav-link ${activeTab === 'article' ? 'active' : ''}`}>
                  Подробности о статьи
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={() => setActiveTab('settings')}
                  style={{
                    borderRadius: '1px'
                  }}
                  className={`profile-nav-link ${activeTab === 'settings' ? 'active' : ''}`}>
                  Настройки профиля
                </Button>
              </ButtonGroup>
              <br />
            </Col>

            <Tab.Content>
              <Tab.Pane eventKey="personal" active={activeTab === 'personal'}>
                <Row>
                  <Col lg={3} xs={12}>
                    <Card style={{ borderRadius: '1px', margin: '20px auto' }}>
                      <Card.Body>
                        <Row>
                          <img
                            onClick={() => inputFileRef.current.click()}
                            src={userData && userData.avatar ? `http://localhost:5000${userData && userData.avatar}` : alt}
                            alt="Мына жерде сурет туру керек" />
                          <input
                            type="file"
                            onChange={handleChangeFile}
                            hidden
                            ref={inputFileRef}
                          />
                          <h5 className="text-center">{userData && userData.fullname}</h5>
                          <Button variant="link" href="/edit-profile">
                            Изменить профиль
                          </Button>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={9} style={{ margin: '20px auto' }}>
                  <h3>Добро пожаловать, {userData?.firstname}</h3>
                  <hr />
                  <Table bordered striped> 
                  <tbody>
                    <tr>
                      <td>ФИО</td>
                      <td>{userData?.lastname} {userData?.firstname} {userData?.patronymic}</td>
                    </tr>
                    <tr>
                      <td>Почта</td>
                      <td>{userData?.email}</td>
                    </tr>
                    <tr>
                      <td>Телефон</td>
                      <td>{userData?.phone}</td>
                    </tr>
                    <tr>
                      <td>Место работы</td>
                      <td>{userData?.organization}</td>
                    </tr>
                    <tr>
                      <td>Должность</td>
                      <td>{userData?.position}</td>
                    </tr>
                    <tr>
                      <td>Звание</td>
                      <td>{userData?.rank}</td>
                    </tr>
                    <tr>
                      <td>Степень</td>
                      <td>{userData?.degree}</td>
                    </tr>
                    <tr>
                      <td>Время регистрации</td>
                      <td>{userData?.createdAt.substring(0, 19).replace('T', " ")}</td>
                    </tr>
                  </tbody>
                  </Table>
                  </Col>
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="timeline" active={activeTab === 'timeline'}>
                <br />
                <h3>Таймлайн содержимое</h3>
                <br />
                <img className="cover img-fluid w-100" src="https://shots.codepen.io/username/pen/zyWyGo-800.jpg?version=1546716497" alt="" />
              </Tab.Pane>
              <Tab.Pane eventKey="article" active={activeTab === 'article'}>
                <br />
                <h3>Подробности о статьи</h3>
                <hr />
                <Table striped bordered>
                  <tbody>
                    <tr>
                      <td>Секция</td>
                      <td>{userData?.section}</td>
                    </tr>
                    <tr>
                      <td>Название статьи</td>
                      <td>{userData?.article}</td>
                    </tr>
                    <tr>
                      <td>Вид авторства</td>
                      <td> {userData?.authors.length > 0 ? <><h6>Соавторство</h6></> : <></>}</td>
                    </tr>
                    {userData?.authors?.map((author, index) => (<><tr><td>Автор {index + 1}</td><td>{author?.lastname} {author?.firstname} {author?.patronymic}</td></tr></> ))}
                   <tr>
                    <td>Вид участия</td>
                    <td>{userData?.participation_type}</td>
                   </tr>
                   <tr>
                    <td>Доступ</td>
                    <td> {userData?.status == "denied" ? "Запрещен": "Есть"}</td>
                   </tr>
                  </tbody>
                </Table>
              </Tab.Pane>
              <Tab.Pane eventKey="settings" active={activeTab === 'settings'}>
                <h4>Настройки профиля содержимое</h4>
              </Tab.Pane>
            </Tab.Content>
          </Row>
        </Tab.Container>

      </Container>
    </Container>
  );
};

export default Profile;
