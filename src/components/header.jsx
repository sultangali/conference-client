import React, {useState, useEffect} from "react";
import { Container, Navbar, Nav, NavDropdown, Button, Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectIsAuth, logout, fetchAuthMe } from "../redux/slices/user.js"
import logo from '../assets/1.png'
import '../styles/header.css'

export const Header = () => {

  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [dispatch])

  const userData = useSelector((state) => state.user.data);

  const onClickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    window.location.assign('/')
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" sticky="top" bg="light" className={`navbarr navbar shadow ${scrolled ? 'scrolled' : ''}`} >
        <Container >
          <Link to={"/"} style={{ textDecoration: 'none' }}>
            <Navbar.Brand style={{ fontWeight: '900', fontSize: 'larger', color: '#364C88' }}>
              <img width={'64'} height={'64'} src={logo} alt="" />
              &nbsp;&nbsp;KBU
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {userData?.isAdmin === true && <Nav.Link href="/admin">Админ панелі</Nav.Link>}
            </Nav>
            <Nav>
              <Nav.Link href="#arrows" ><Button  className="cnf-nav-link">Цель</Button></Nav.Link>
              <Nav.Link href="#format" ><Button  className="cnf-nav-link">Формат конференции</Button></Nav.Link>
              <Nav.Link href="#sections" ><Button  className="cnf-nav-link">Основные направления</Button></Nav.Link>
              <Nav.Link href="#orgcommittee" ><Button  className="cnf-nav-link">Программный комитет</Button></Nav.Link>
              <Nav.Link>
              <Dropdown>
                <Dropdown.Toggle variant="primary" className="cnf-nav-link" id="dropdown-basic">
                  Сменить язык
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Қазақша</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Русский</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">English</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </Nav.Link>
              
              {isAuth ? (
                <>
                  {userData && userData.status ?
                    (<Nav.Link href="/profile" className="d-flex col align-items-center">
                      <Button className="btn btn-light">Профиль</Button>
                      {/* {userData && `${userData?.firstname?.substring(0, 1)}.${userData?.fathername?.substring(0, 1)}.${userData?.lastname}`}
                      &nbsp;<img src={`http://localhost:5000${userData?.avatar}`} style={{ borderRadius: '50%', width: '3rem' }} alt="" /> */}
                    </Nav.Link>) : ''}
                  &nbsp;
                  <Nav.Link
                    eventKey={2}

                    onClick={() => onClickLogout()} className="d-flex row align-items-center">
                       <Button className="cnf-auth-btn">Выйти</Button>
                  </Nav.Link>
                </>
              ) : (
                <><Nav.Link href="/login"><Button className="cnf-auth-btn">Авторизация</Button></Nav.Link></>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
