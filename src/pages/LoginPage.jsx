import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styling_global.css';
import './LoginPage.css';
import mealmateLogo from "../assets/images/mealmate-logo.png";

const BASE_URL = 'https://novi-backend-api-wgsgz.ondigitalocean.app';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function login(e) {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(
        `${BASE_URL}/api/login`,
        {
          email: `${email}`,
          password
        },
        {
          headers: {
            'novi-education-project-id': '433f34a6-eb0c-4814-8ed7-d3532507579b'
          }
        }
      );
      localStorage.setItem('token', response.data.token);
      if (response.data.token) {
        window.location.href = '/search'; // Route to search page
      }
    } catch (e) {
      setError('Login failed. Please check your credentials.');
    }
  }

  async function register() {
    setError('');
    try {
      // Fetch all users first
      const usersResponse = await axios.get(
        `${BASE_URL}/api/users`,
        {
          headers: {
            'novi-education-project-id': '433f34a6-eb0c-4814-8ed7-d3532507579b'
          }
        }
      );
      const users = usersResponse.data;
      // Check if email already exists (trim spaces for comparison)
      const emailTrimmed = email.trim();
      const exists = users.some(user => user.email.trim() === emailTrimmed);
      if (exists) {
        setError('This email is already registered.');
        return;
      }
      // Proceed with registration
      await axios.post(
        `${BASE_URL}/api/users`,
        {
          email: ` ${email} `,
          password,
          roles: ['member']
        },
        {
          headers: {
            'novi-education-project-id': '433f34a6-eb0c-4814-8ed7-d3532507579b'
          }
        }
      );
      setError('Registration successful! You can now log in.');
    } catch (e) {
      setError('Registration failed. Please try again.');
    }
  }

  return (
    <div className="login-container">
      <h2>Welcome to MealMate!</h2>
      <img src={mealmateLogo} alt="MealMate logo" />

      <form className="login-form" onSubmit={login}>
        <input
          type="email"
          id="email"
          placeholder="Email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <button type="button" onClick={register}>Register</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p className="register-hint">
        <Link to="/contact">Forgot password?</Link>  |  <Link to="/contact">Contact</Link>
      </p>
    </div>
  );
}

export default LoginPage;

