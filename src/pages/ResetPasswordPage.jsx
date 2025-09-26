import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styling_global.css';
import './ContactPage.css';
import BackButton from '../components/BackButton';
import SideImages from '../components/SideImages';
import leftImg from '../assets/images/1.png';
import rightImg from '../assets/images/1.png';

const BASE_URL = 'https://novi-backend-api-wgsgz.ondigitalocean.app';

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(
        `${BASE_URL}/api/password-reset`,
        {
          email,
          timestamp: new Date().toISOString()
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'novi-education-project-id': '433f34a6-eb0c-4814-8ed7-d3532507579b'
          }
        }
      );
      setSubmitted(true);
    } catch (error) {
      alert('There was a problem sending your request.');
    }
  }

  return (
    <div className="contact-page-wrapper">
      <SideImages leftSrc={leftImg} rightSrc={rightImg} />
      <BackButton onClick={() => navigate('/login')} />
      <div className="common-container">
        <h2>Reset Password</h2>
        {submitted ? (
          <p>Thank you! Someone will be in touch shortly.</p>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button type="submit" className="app-btn">Send</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPasswordPage;