import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import largeTriangles2 from '../assets/subtle-prism3.svg';
import { useTranslation } from "react-i18next";

export const Certificates = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sections = [
    {
      id: 1,
      title:`${t('main.view4.card.2')}, ${t('main.view4.card.1')}`,
      secretary: "Жантасова Ботагоз Бекетовна",
      phone: "+7 702 245 90 99"
    },
    {
      id: 2,
      title:`${t('main.view4.card.3')}, ${t('main.view4.card.4')}`,
      secretary: "Копбалина Салтанат Сериковна",
      phone: "+7 702 479 41 81"
    },
    {
      id: 3,
      title: `${t('main.view4.card.5')}, ${t('main.view4.card.6')}`,
      secretary: "Яруллина Алина Рашидовна",
      phone: "+7 775 782 52 19"
    }
  ];

  const handleSectionClick = (sectionId) => {
    navigate(`/section/${sectionId}`);
  };

  return (
    <Container
      fluid
      style={{
        paddingTop: '0px',
        paddingBottom: '8rem',
        backgroundRepeat: 'repeat',
        backgroundSize: 'cover',
        background: `url(${largeTriangles2})`
      }}
    >
      <Container className="participants">
        <Row>
          <Col className="participants-list" md={12}>
            <h3 className="mb-4 text-center" style={{ color: '#2196F3', fontWeight: 'bold' }}>
              {t('certificates.sections')}
            </h3>
            
            <Row className="g-4">
              {sections.map((section) => (
                <Col md={12} lg={4} key={section.id}>
                  <Card 
                    className="h-100 shadow-sm"
                    style={{ 
                      cursor: 'pointer',
                      border: '2px solid #e3f2fd',
                      borderRadius: '1px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(33, 150, 243, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '';
                    }}
                    onClick={() => handleSectionClick(section.id)}
                  >
                    <Card.Header 
                      style={{ 
                        backgroundColor: '#2196F3', 
                        color: 'white',
                        textAlign: 'center',
                        borderRadius: '1px',
                      }}
                    >
                      <h5 className="mb-0">Секция {section.id}</h5>
                    </Card.Header>
                    <Card.Body className="d-flex flex-column">
                      <Card.Title 
                        style={{ 
                          color: '#1976d2',
                          fontSize: '1.1rem',
                          lineHeight: '1.4'
                        }}
                      >
                        {section.title}
                      </Card.Title>
                      <div className="mt-auto">
                        <hr />
                        <div style={{ color: '#666' }}>
                          <strong>{t('certificates.secretary')}</strong><br />
                          {section.secretary}<br />
                          {/* <small style={{ color: '#2196F3' }}>{section.phone}</small> */}
                        </div>
                      </div>
                    </Card.Body>
                    <Card.Footer 
                      className="text-center"
                      style={{ backgroundColor: '#f8f9fa' }}
                    >
                      <Button 
                        variant="outline-primary" 
                        className="cnf-btn"
                        size="sm"
                       
                      >
                        {t('certificates.more')}
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
