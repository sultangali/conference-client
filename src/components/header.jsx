import React, {useState, useEffect} from "react";
import { Container, Navbar, Nav, NavDropdown, Button, Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectIsAuth, logout, fetchAuthMe } from "../redux/store.js"
import logo from '../assets/1.png'
import '../styles/header.css'
import { setLanguage } from "../redux/store.js";
import { useTranslation } from "react-i18next";


export const Header = () => {
  const { i18n, t } = useTranslation();
  const isAuth = useSelector(selectIsAuth);

  console.log('isAuth', isAuth)

  const dispatch = useDispatch();
  

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  
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

  const userData = useSelector((state) => state.user.data);

  const onClickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    window.location.assign('/')
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" sticky="top" bg="light" className={`navbarr navbar shadow ${scrolled ? 'scrolled' : ''}`} >
        <Container>
          <Link to={"/"} style={{ textDecoration: 'none' }}>
            <Navbar.Brand style={{ fontWeight: '900', fontSize: 'larger', color: '#364C88' }}>
              <img width={'64'} height={'64'} src={logo} alt="" />
              &nbsp;&nbsp;KBU
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {userData?.role === "moderator" && <Nav.Link href="/moderator"><span className="moderator">M</span></Nav.Link>}
            </Nav>
            <Nav >
              <Nav.Link href="/#arrows" ><Button  className="cnf-nav-link">{t('header.arrow')}</Button></Nav.Link>
              <Nav.Link href="/criterion" ><Button  className="cnf-nav-link">{t('header.criterion')}</Button></Nav.Link>
              {/* <Nav.Link href="/#format" ><Button  className="cnf-nav-link">{t('header.format')}</Button></Nav.Link> */}
              <Nav.Link href="/#sections" ><Button  className="cnf-nav-link">{t('header.napravlenia')}</Button></Nav.Link>
              <Nav.Link href="/participants" ><Button  className="cnf-nav-link">{t('header.participate')}</Button></Nav.Link>
              <Nav.Link href="/#orgcommittee" ><Button  className="cnf-nav-link">{t('header.commited')}</Button></Nav.Link>
              <Nav.Link href="/details" ><Button  className="cnf-nav-link">{t('header.details')}</Button></Nav.Link>
              <Nav.Link href="/sponsors" ><Button  className="cnf-nav-link">{t('header.sponsors')}</Button></Nav.Link>
              <Nav.Link>
              <Dropdown >
                <Dropdown.Toggle variant="primary" className="cnf-nav-link" id="dropdown-basic">
                  {t('header.language')}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => changeLanguage("kz")}>Қазақша</Dropdown.Item>
                  <Dropdown.Item onClick={() => changeLanguage("ru")}>Русский</Dropdown.Item>
                  <Dropdown.Item onClick={() => changeLanguage("en")}>English</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </Nav.Link>
              
              {isAuth ? (
                <>
                  <Nav.Link href="/profile" className="d-flex col align-items-center">
                      <Button className="btn btn-light go-to-profile-btn" >{t('header.profile')}</Button>
                      {/* {userData && `${userData?.firstname?.substring(0, 1)}.${userData?.fathername?.substring(0, 1)}.${userData?.lastname}`}
                      &nbsp;<img src={`https://conference.buketov.edu.kz${userData?.avatar}`} style={{ borderRadius: '50%', width: '3rem' }} alt="" /> */}
                    </Nav.Link>
                  &nbsp;
                  <Nav.Link
                    eventKey={2}

                    onClick={() => onClickLogout()} className="d-flex row align-items-center">
                       <Button className="cnf-auth-btn">{t('header.logout')}</Button>
                  </Nav.Link>
                </>
              ) : (
                <><Nav.Link href="/login"><Button className="cnf-auth-btn">{t('header.authorization')}</Button></Nav.Link></>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
