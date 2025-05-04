import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from '../utils/axios.js';

const ReceiptUpload = ({ article }) => {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError(t('receipt.noFileSelected'));
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('/api/articles/upload-receipt', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(t('receipt.uploadSuccess'));
      // Можно добавить обновление данных профиля
      window.location.reload();
    } catch (err) {
      setError(t('receipt.uploadError'));
      console.error('Error uploading receipt:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <br />
      <h3>{t('receipt.title')}</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {article?.receipt_url && (
        <div style={{marginBottom: '1rem'}}>
          <a href={`https://conference.buketov.edu.kz${article.receipt_url}`} download>
            {t('receipt.download')}
          </a>
        </div>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>{t('receipt.upload')}</Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileChange}
            accept="image/*,.pdf"
            style={{borderRadius: '1px'}}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading} style={{borderRadius: '1px', backgroundColor: '#007bff', color: 'white', border: 'none'}}>
          {loading ? t('receipt.uploading') : t('receipt.submit')}
        </Button>
      </Form>
    </Container>
  );
};

export default ReceiptUpload; 