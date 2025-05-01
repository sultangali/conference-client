import React, { useEffect } from "react"
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap"
import { Link, Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import "react-phone-number-input/style.css"

import { loginUser, selectIsAuth } from "../redux/store.js"
import * as components from '../components/index.js'

import logo from '../assets/logo-opacity.png'
import { useTranslation } from "react-i18next"

const Login = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);

  const [errorMessage, setErrorMessage] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      login: "",
      password: ""
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
   
      const data = await dispatch(
        loginUser({
          login: values.login,
          password: values.password,
        })
      );

      setErrorMessage(data.payload.message);

      if ("token" in data.payload) {
        window.localStorage.setItem("token", data.payload.token);
      }
  };


  console.log(isAuth)

  if (isAuth) {
    return <Navigate to="/profile" />;
  }

  return (
    <div style={{
      backgroundImage: `url(${logo})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={6} md={8} sm={12}>
            <div className="sign-card d-flex align-items-center justify-content-center" >
              <div className="w-100">
                <h4 className="text-center">{t('login.title')}</h4>
                {errorMessage && (
                  <Alert
                    variant={errorMessage ? "danger" : "primary"}
                    style={errorMessage ? { borderColor: "red", borderRadius: '0' } : { borderRadius: "0" }} >
                    <div className="text-center" style={{ margin: "-12px" }}>
                      {errorMessage && <span>{errorMessage}</span>}
                    </div>
                  </Alert>
                )}
                <Row>
                <Form onSubmit={handleSubmit(onSubmit)}  method="post">
                  
                    <Col lg={12}>
                      <components.FormInput
                        errors={errors && errors.login}
                        content={'Почта или телефон'}
                        placeholder={t('login.username.placeholder')}
                        attributes={{ ...register("login", { required: t('login.username.error.1') }) }}
                        type={'text'}
                      />
                    </Col>
                    <Col lg={12}>
                      <components.FormInput
                        errors={errors && errors.password}
                        content={'Пароль'}
                        placeholder={t('login.password.placeholder')}
                        attributes={{ ...register("password", {
                          required: t('login.password.error.1'),
                          minLength: {
                            value: 6,
                            message: t('login.password.error.2'),
                          },
                          maxLength: {
                            value: 32,
                            message: t('login.password.error.2'),
                          },
                        }) }}
                        type={'password'}
                      />
                    </Col>
                    <Row>
                    <Col xs={12} lg={6} className="d-flex col align-items-center">
                        {t('login.isfirst.p')}&nbsp;<Link to={'/registration'}>{ t('login.isfirst.link')}</Link>
                    </Col>

                    <Col xs={12} lg={6} className="  d-flex justify-content-between align-items-center">
                      <Button
                        className="w-100"
                        disabled={!isValid}
                        style={ !isValid ? {
                            backgroundColor: '#2196F3',
                            color: "white"
                        }: { 
                            backgroundColor: '#2196F3',
                            color: "white"
                         }}
                        variant="primary"
                        type="submit"
                      >
                        {t('login.button')} &nbsp; &nbsp;
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                          <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                        </svg>
                      </Button>
                      
                    </Col>

                    </Row>
                    
                  
                </Form>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    
    
  );
};

export default Login;
