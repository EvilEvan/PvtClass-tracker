import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [adminExists, setAdminExists] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin exists
    fetch('http://localhost:8000/auth/check-admin')
      .then(res => res.json())
      .then(data => {
        setAdminExists(data.adminExists);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <Head>
          <title>Private Class Tracker</title>
          <meta name="description" content="Loading..." />
        </Head>
        <main style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh',
          background: 'linear-gradient(135deg, #0a0e1a 0%, #1a2332 50%, #2a3441 100%)',
          color: '#e0e6ed'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              border: '3px solid #00d4ff',
              borderTop: '3px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px'
            }}></div>
            <p style={{ fontSize: '1.2rem' }}>Connecting to the network...</p>
          </div>
        </main>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </>
    );
  }

  if (!adminExists) {
    return (
      <>
        <Head>
          <title>Private Class Tracker - Setup Required</title>
          <meta name="description" content="Administrator setup required" />
        </Head>
        <main style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh',
          background: 'linear-gradient(135deg, #0a0e1a 0%, #1a2332 50%, #2a3441 100%)',
          color: '#e0e6ed'
        }}>
          <div style={{
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '60px 40px',
            borderRadius: '12px',
            border: '1px solid #00d4ff',
            boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)',
            maxWidth: '600px'
          }}>
            <h1 style={{ 
              fontSize: '3rem', 
              marginBottom: '20px', 
              color: '#00d4ff',
              fontWeight: '300',
              textShadow: '0 0 10px rgba(0, 212, 255, 0.5)'
            }}>
              System Initialization Required
            </h1>
            <p style={{ 
              fontSize: '1.2rem', 
              marginBottom: '40px', 
              color: '#b0b7c3',
              lineHeight: '1.6'
            }}>
              The system requires an administrator account to be configured before proceeding.
            </p>
            
            <Link href="/admin-setup" style={{
              display: 'inline-block',
              padding: '15px 30px',
              backgroundColor: 'transparent',
              color: '#00d4ff',
              textDecoration: 'none',
              border: '2px solid #00d4ff',
              borderRadius: '8px',
              fontWeight: '500',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Initialize Administrator
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Private Class Tracker - Command Center</title>
        <meta name="description" content="Private Class Management System" />
      </Head>
      <main style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0e1a 0%, #1a2332 50%, #2a3441 100%)',
        color: '#e0e6ed',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        {/* Header */}
        <header style={{
          borderBottom: '1px solid #00d4ff',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          padding: '20px 0'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <h1 style={{
              fontSize: '2rem',
              color: '#00d4ff',
              fontWeight: '300',
              margin: 0,
              textShadow: '0 0 10px rgba(0, 212, 255, 0.5)'
            }}>
              Private Class Tracker
            </h1>
            <p style={{ 
              color: '#b0b7c3', 
              margin: '5px 0 0 0',
              fontSize: '0.9rem'
            }}>
              Command & Control Center
            </p>
          </div>
        </header>

        {/* Main Dashboard */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginBottom: '40px'
          }}>
            
            {/* Student Management */}
            <Link href="/students" style={{ textDecoration: 'none' }}>
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid #00d4ff',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 0 20px rgba(0, 212, 255, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: 'rgba(0, 212, 255, 0.2)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <span style={{ fontSize: '24px', color: '#00d4ff' }}>👥</span>
                </div>
                <h3 style={{
                  color: '#00d4ff',
                  fontSize: '1.4rem',
                  marginBottom: '10px',
                  fontWeight: '500'
                }}>
                  Student Registry
                </h3>
                <p style={{
                  color: '#b0b7c3',
                  fontSize: '0.95rem',
                  lineHeight: '1.5',
                  marginBottom: '20px'
                }}>
                  Manage student profiles, enrollment status, and academic records.
                </p>
                <button style={{
                  background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Access Registry
                </button>
              </div>
            </Link>

            {/* Session Management */}
            <Link href="/sessions" style={{ textDecoration: 'none' }}>
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid #00d4ff',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 0 20px rgba(0, 212, 255, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: 'rgba(0, 212, 255, 0.2)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <span style={{ fontSize: '24px', color: '#00d4ff' }}>📅</span>
                </div>
                <h3 style={{
                  color: '#00d4ff',
                  fontSize: '1.4rem',
                  marginBottom: '10px',
                  fontWeight: '500'
                }}>
                  Session Control
                </h3>
                <p style={{
                  color: '#b0b7c3',
                  fontSize: '0.95rem',
                  lineHeight: '1.5',
                  marginBottom: '20px'
                }}>
                  Schedule classes, track attendance, and manage session data.
                </p>
                <button style={{
                  background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Manage Sessions
                </button>
              </div>
            </Link>

            {/* Financial Management */}
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid #00d4ff',
              borderRadius: '12px',
              padding: '30px',
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'rgba(0, 212, 255, 0.2)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <span style={{ fontSize: '24px', color: '#00d4ff' }}>💰</span>
              </div>
              <h3 style={{
                color: '#00d4ff',
                fontSize: '1.4rem',
                marginBottom: '10px',
                fontWeight: '500'
              }}>
                Financial Operations
              </h3>
              <p style={{
                color: '#b0b7c3',
                fontSize: '0.95rem',
                lineHeight: '1.5',
                marginBottom: '20px'
              }}>
                Process payments, generate invoices, and track financial metrics.
              </p>
              <button style={{
                background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Access Finance
              </button>
            </div>

            {/* Analytics */}
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid #00d4ff',
              borderRadius: '12px',
              padding: '30px',
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'rgba(0, 212, 255, 0.2)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <span style={{ fontSize: '24px', color: '#00d4ff' }}>📊</span>
              </div>
              <h3 style={{
                color: '#00d4ff',
                fontSize: '1.4rem',
                marginBottom: '10px',
                fontWeight: '500'
              }}>
                Analytics Hub
              </h3>
              <p style={{
                color: '#b0b7c3',
                fontSize: '0.95rem',
                lineHeight: '1.5',
                marginBottom: '20px'
              }}>
                Monitor performance metrics and generate comprehensive reports.
              </p>
              <button style={{
                background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                View Analytics
              </button>
            </div>

            {/* User Management - ADMIN ONLY */}
            <Link href="/user-management" style={{ textDecoration: 'none' }}>
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid #ff4444',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 0 20px rgba(255, 68, 68, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: 'rgba(255, 68, 68, 0.2)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <span style={{ fontSize: '24px', color: '#ff4444' }}>👑</span>
                </div>
                <h3 style={{
                  color: '#ff4444',
                  fontSize: '1.4rem',
                  marginBottom: '10px',
                  fontWeight: '500'
                }}>
                  User Management
                </h3>
                <p style={{
                  color: '#b0b7c3',
                  fontSize: '0.95rem',
                  lineHeight: '1.5',
                  marginBottom: '20px'
                }}>
                  Create admins, teachers, and moderators. Master password access.
                </p>
                <button style={{
                  background: 'linear-gradient(45deg, #ff4444, #cc3333)',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Admin Panel
                </button>
              </div>
            </Link>

            {/* Teacher Dashboard */}
            <Link href="/teacher-dashboard" style={{ textDecoration: 'none' }}>
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid #ff9500',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 0 20px rgba(255, 149, 0, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: 'rgba(255, 149, 0, 0.2)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <span style={{ fontSize: '24px', color: '#ff9500' }}>🎓</span>
                </div>
                <h3 style={{
                  color: '#ff9500',
                  fontSize: '1.4rem',
                  marginBottom: '10px',
                  fontWeight: '500'
                }}>
                  Teacher Dashboard
                </h3>
                <p style={{
                  color: '#b0b7c3',
                  fontSize: '0.95rem',
                  lineHeight: '1.5',
                  marginBottom: '20px'
                }}>
                  Simple class confirmation with checkbox and optional notes.
                </p>
                <button style={{
                  background: 'linear-gradient(45deg, #ff9500, #cc7700)',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Teacher Panel
                </button>
              </div>
            </Link>

            {/* Moderator Dashboard */}
            <Link href="/moderator-dashboard" style={{ textDecoration: 'none' }}>
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid #9d4edd',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 0 20px rgba(157, 78, 221, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: 'rgba(157, 78, 221, 0.2)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <span style={{ fontSize: '24px', color: '#9d4edd' }}>🛡️</span>
                </div>
                <h3 style={{
                  color: '#9d4edd',
                  fontSize: '1.4rem',
                  marginBottom: '10px',
                  fontWeight: '500'
                }}>
                  Moderator Dashboard
                </h3>
                <p style={{
                  color: '#b0b7c3',
                  fontSize: '0.95rem',
                  lineHeight: '1.5',
                  marginBottom: '20px'
                }}>
                  Create student profiles and assign them to teachers.
                </p>
                <button style={{
                  background: 'linear-gradient(45deg, #9d4edd, #7b2cbf)',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Moderator Panel
                </button>
              </div>
            </Link>

          </div>

          {/* Quick Actions */}
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid #00d4ff',
            borderRadius: '12px',
            padding: '30px',
            marginTop: '30px'
          }}>
            <h2 style={{
              color: '#00d4ff',
              fontSize: '1.6rem',
              marginBottom: '20px',
              fontWeight: '300'
            }}>
              Quick Actions
            </h2>
            <div style={{
              display: 'flex',
              gap: '15px',
              flexWrap: 'wrap'
            }}>
              <button style={{
                backgroundColor: 'transparent',
                color: '#00d4ff',
                border: '1px solid #00d4ff',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                Add New Student
              </button>
              <Link href="/sessions" style={{ textDecoration: 'none' }}>
                <button style={{
                  backgroundColor: 'transparent',
                  color: '#00d4ff',
                  border: '1px solid #00d4ff',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}>
                  Schedule Session
                </button>
              </Link>
              <button style={{
                backgroundColor: 'transparent',
                color: '#00d4ff',
                border: '1px solid #00d4ff',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                Generate Report
              </button>
            </div>
          </div>
        </div>

        {/* Creator Credit - Top Right */}
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          border: '1px solid #00d4ff',
          borderRadius: '8px',
          padding: '12px 16px',
          fontSize: '0.75rem',
          color: '#b0b7c3',
          textAlign: 'center',
          boxShadow: '0 0 15px rgba(0, 212, 255, 0.2)',
          fontFamily: 'monospace',
          letterSpacing: '0.5px'
        }}>
          <div style={{
            color: '#00d4ff',
            fontWeight: '500',
            marginBottom: '3px',
            textShadow: '0 0 5px rgba(0, 212, 255, 0.5)'
          }}>
            ⭐ CREATED BY ⭐
          </div>
          <div style={{
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: '0.8rem',
            marginBottom: '2px'
          }}>
            TEACHER EVAN
          </div>
          <div style={{
            color: '#888',
            fontSize: '0.65rem',
            fontStyle: 'italic'
          }}>
            (and his wife helped a little...)
          </div>
        </div>
      </main>
    </>
  );
} 