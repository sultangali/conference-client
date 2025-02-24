import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createSolveArticle } from "../redux/store.js";

const SubmitSolveArticle = ({ formData }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    if (!formData.articleTitle || !formData.section || !formData.problem || !formData.file) {
      setStatus("❌ Заполните все поля!");
      return;
    }

    setStatus("🔄 Загрузка...");

    const articleData = {
      articleTitle: formData.articleTitle,
      section: formData.section,
      correspondentId: formData.correspondentId, 
      problem: formData.problem,
      fileUrl: formData.file,
      coauthors: formData.coauthors,
    };

    try {
      const result = await dispatch(createSolveArticle(articleData)).unwrap();
      setStatus(`${result.message}`);
      window.location.reload()
    } catch (error) {
      setStatus(`${error.message}`);
    }
  };

  return (
    <div>
      <Button onClick={handleSubmit} style={{
        borderColor: '#1168eb',
        backgroundColor: '#1168eb',
        padding: '10px 26px',
        color: 'white'
      }}>Создать статью</Button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default SubmitSolveArticle;
