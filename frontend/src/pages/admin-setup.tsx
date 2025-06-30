import Head from 'next/head';
import { useState } from 'react';

export default function AdminSetup() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:8000/auth/setup-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.error) {
        setMessage(`Error: ${result.error}`);
      } else {
        setMessage(`Success! ${result.message}`);
        setFormData({ email: '', name: '', password: '' });
      }
    } catch (error) {
      setMessage('Error: Could not connect to server. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Head>
        <title>Admin Setup - Private Class Tracker</title>
        <meta name="description" content="Set up your administrator account" />
      </Head>
      <main style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh', 
        padding: '20px',
        background: 'linear-gradient(135deg, #0a0e1a 0%, #1a2332 50%, #2a3441 100%)',
        color: '#e0e6ed'
      }}>
        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '40px',
          borderRadius: '12px',
          border: '1px solid #00d4ff',
          boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)',
          width: '100%',
          maxWidth: '450px'
        }}>
          <h1 style={{ 
            textAlign: 'center', 
            marginBottom: '30px', 
            color: '#00d4ff',
            fontWeight: '300',
            fontSize: '2rem',
            textShadow: '0 0 10px rgba(0, 212, 255, 0.5)'
          }}>
            System Administrator Initialization
          </h1>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500',
                color: '#b0b7c3',
                fontSize: '0.95rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Email Address:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #00d4ff',
                  borderRadius: '6px',
                  fontSize: '16px',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: '#e0e6ed',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500',
                color: '#b0b7c3',
                fontSize: '0.95rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Full Name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #00d4ff',
                  borderRadius: '6px',
                  fontSize: '16px',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: '#e0e6ed',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
              />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500',
                color: '#b0b7c3',
                fontSize: '0.95rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Password:
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #00d4ff',
                  borderRadius: '6px',
                  fontSize: '16px',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: '#e0e6ed',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '15px',
                background: loading ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(45deg, #00d4ff, #0099cc)',
                color: loading ? '#666' : 'white',
                border: loading ? '1px solid #333' : 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s ease'
              }}
            >
              {loading ? 'Initializing System...' : 'Initialize Administrator'}
            </button>
          </form>

          {message && (
            <div style={{
              marginTop: '20px',
              padding: '15px',
              borderRadius: '8px',
              backgroundColor: message.includes('Error') ? 'rgba(220, 53, 69, 0.2)' : 'rgba(40, 167, 69, 0.2)',
              color: message.includes('Error') ? '#ff6b7a' : '#00d4ff',
              border: `1px solid ${message.includes('Error') ? '#dc3545' : '#00d4ff'}`,
              fontSize: '0.95rem'
            }}>
              {message}
            </div>
          )}

          <div style={{ marginTop: '25px', textAlign: 'center' }}>
            <a href="/" style={{ 
              color: '#00d4ff', 
              textDecoration: 'none',
              fontSize: '0.95rem',
              transition: 'color 0.3s ease'
            }}>
              ← Return to Command Center
            </a>
          </div>
        </div>
      </main>
    </>
  );
} 