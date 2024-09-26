import React, { useState } from 'react';
import './LoginSignup.css';

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setMessage(`Successfully signed up! Welcome, ${data.name}.`);
      setName('');
      setEmail('');
      setPassword('');
    } else {
      const errorData = await response.json();
      setMessage(`Error: ${errorData.detail}`);
    }
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <form className="inputs" onSubmit={handleSubmit}>
        <div className="input">
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="input">
          <input type="email" placeholder="Email Id" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="input">
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="submit-container">
          <button type="submit" className="submit">{action}</button>
        </div>
      </form>
      {message && <div className="message">{message}</div>}
      <div className="forgot-password">Lost Password? <span>Click Here!</span></div>
    </div>
  );
};

export default LoginSignup;