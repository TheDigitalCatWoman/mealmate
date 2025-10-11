import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import SideImages from '../components/SideImages';
import leftImg from '../assets/images/1.png';
import rightImg from '../assets/images/1.png';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="contact-page-wrapper">
      <SideImages leftSrc={leftImg} rightSrc={rightImg} />
      <div className="common-container">
        <BackButton onClick={() => navigate(-1)} />
        <h2>404 - Pagina niet gevonden</h2>
        <p>De pagina die je zoekt bestaat niet. Controleer het adres of ga terug.</p>
      </div>
    </div>
  );
}

export default NotFoundPage;