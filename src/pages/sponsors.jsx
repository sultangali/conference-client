import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import largeTriangles2 from '../assets/subtle-prism3.svg';
import { useTranslation } from "react-i18next";

export const Sponsors = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const iframeStyles = {
    width: '100%',
    height: isMobile ? '80vh' : '1500px',
    border: '1px solid #2196F3',
    boxShadow: '1px 1px 8px rgba(43, 158, 252, 0.58)',
    marginTop: isMobile ? '1rem' : '2rem',
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
            <h3 className="mb-4">{t('sponsors.title')}</h3>

            {/* 🔽 Кнопка скачивания */}
            <div className="mb-3">
              <a
                href="/program.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary program-download-btn" style={{
                    borderRadius: '1px',

                }}>{t('sponsors.download')}</Button>
              </a>
            </div>

            {/* 📄 iframe для PDF */}
            <iframe
              src="/program.pdf"
              style={iframeStyles}
              title="PDF Viewer"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
