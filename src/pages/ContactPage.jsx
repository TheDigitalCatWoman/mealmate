import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styling_global.css';
import './ContactPage.css';
import imgSide from '../assets/images/1.png';
import BackButton from '../components/BackButton';

const BASE_URL = 'https://novi-backend-api-wgsgz.ondigitalocean.app'; // Replace with your actual base URL

function ContactPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(
        `${BASE_URL}/api/contact-form`,
        {
          name,
          email,
          message,
        },
        {
          headers: {
            'novi-education-project-id': '433f34a6-eb0c-4814-8ed7-d3532507579b'
          }
        }
      );
      setSubmitted(true);
    } catch (error) {
      alert('There was a problem sending your message.');
    }
  }

  return (
    <div className="contact-page-wrapper">
      <img src={imgSide} alt="Decorative left" className="side-img left-img" />
      <img src={imgSide} alt="Decorative right" className="side-img right-img" />
      {/* Floating back button */}
      <div className="back-button-floating-wrapper">
        <BackButton onClick={() => navigate(-1)} />
      </div>
      <div className="contact-container">
        <h2>Contact form</h2>
        {submitted ? (
          <p>Thank you for your message!</p>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              placeholder="Name"
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <textarea
              id="message"
              placeholder="Message"
              required
              rows={10}
              style={{ resize: 'vertical' }}
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ContactPage;
