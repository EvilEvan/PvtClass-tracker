import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Calendar from '../components/Calendar';

interface Session {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  studentName?: string;
}

export default function Sessions() {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [showSessionDetails, setShowSessionDetails] = useState(false);

  const handleSessionClick = (session: Session) => {
    setSelectedSession(session);
    setShowSessionDetails(true);
  };

  const handleDateClick = (date: Date) => {
    console.log('Date clicked:', date);
    // Here you could open a "new session" modal for this date
  };

  const closeSessionDetails = () => {
    setShowSessionDetails(false);
    setSelectedSession(null);
  };

  return (
    <>
      <Head>
        <title>Session Control - Private Class Tracker</title>
        <meta name="description" content="Manage class sessions and schedules" />
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <Link href="/" style={{
                color: '#00d4ff',
                textDecoration: 'none',
                fontSize: '1.1rem',
                opacity: 0.8
              }}>
                ← Command Center
              </Link>
              <div>
                <h1 style={{
                  fontSize: '2rem',
                  color: '#00d4ff',
                  fontWeight: '300',
                  margin: 0,
                  textShadow: '0 0 10px rgba(0, 212, 255, 0.5)'
                }}>
                  Session Control System
                </h1>
                <p style={{ 
                  color: '#b0b7c3', 
                  margin: '5px 0 0 0',
                  fontSize: '0.9rem'
                }}>
                  Schedule and manage private tutoring sessions
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
          {/* Action Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            <div>
              <h2 style={{
                color: '#e0e6ed',
                fontSize: '1.3rem',
                margin: 0,
                fontWeight: '400'
              }}>
                Session Calendar
              </h2>
              <p style={{
                color: '#b0b7c3',
                margin: '5px 0 0 0',
                fontSize: '0.9rem'
              }}>
                Click on dates to schedule new sessions, or click on existing sessions to view details
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button style={{
                backgroundColor: 'transparent',
                color: '#00d4ff',
                border: '1px solid #00d4ff',
                padding: '10px 20px',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Import Schedule
              </button>
              <button style={{
                background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
                color: 'black',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Quick Schedule
              </button>
            </div>
          </div>

          {/* Calendar Component */}
          <Calendar 
            onSessionClick={handleSessionClick}
            onDateClick={handleDateClick}
          />

          {/* Quick Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginTop: '40px'
          }}>
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid #00d4ff',
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#00d4ff',
                marginBottom: '5px'
              }}>
                12
              </div>
              <div style={{ color: '#b0b7c3', fontSize: '0.9rem' }}>
                This Month
              </div>
            </div>

            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid #00ff88',
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#00ff88',
                marginBottom: '5px'
              }}>
                8
              </div>
              <div style={{ color: '#b0b7c3', fontSize: '0.9rem' }}>
                Completed
              </div>
            </div>

            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid #ffa500',
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#ffa500',
                marginBottom: '5px'
              }}>
                3
              </div>
              <div style={{ color: '#b0b7c3', fontSize: '0.9rem' }}>
                Upcoming
              </div>
            </div>

            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid #ff4444',
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#ff4444',
                marginBottom: '5px'
              }}>
                1
              </div>
              <div style={{ color: '#b0b7c3', fontSize: '0.9rem' }}>
                Cancelled
              </div>
            </div>
          </div>
        </div>

        {/* Session Details Modal */}
        {showSessionDetails && selectedSession && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div style={{
              backgroundColor: 'rgba(10, 14, 26, 0.95)',
              border: '1px solid #00d4ff',
              borderRadius: '12px',
              boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)',
              width: '100%',
              maxWidth: '500px',
              padding: '30px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{
                  color: '#00d4ff',
                  fontSize: '1.5rem',
                  margin: 0,
                  fontWeight: '400'
                }}>
                  Session Details
                </h3>
                <button
                  onClick={closeSessionDetails}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#00d4ff',
                    fontSize: '1.5rem',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <strong style={{ color: '#b0b7c3' }}>Title:</strong>
                <div style={{ color: '#e0e6ed', marginTop: '5px' }}>{selectedSession.title}</div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <strong style={{ color: '#b0b7c3' }}>Student:</strong>
                <div style={{ color: '#e0e6ed', marginTop: '5px' }}>{selectedSession.studentName}</div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <strong style={{ color: '#b0b7c3' }}>Time:</strong>
                <div style={{ color: '#e0e6ed', marginTop: '5px' }}>
                  {selectedSession.startTime.toLocaleString()} - {selectedSession.endTime.toLocaleTimeString()}
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <strong style={{ color: '#b0b7c3' }}>Status:</strong>
                <div style={{ 
                  color: selectedSession.status === 'SCHEDULED' ? '#00d4ff' : 
                        selectedSession.status === 'COMPLETED' ? '#00ff88' : '#ff4444',
                  marginTop: '5px',
                  fontWeight: '500'
                }}>
                  {selectedSession.status}
                </div>
              </div>

              {selectedSession.description && (
                <div style={{ marginBottom: '20px' }}>
                  <strong style={{ color: '#b0b7c3' }}>Description:</strong>
                  <div style={{ color: '#e0e6ed', marginTop: '5px' }}>{selectedSession.description}</div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  onClick={closeSessionDetails}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#b0b7c3',
                    border: '1px solid #666',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
                <button
                  style={{
                    background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
                    color: 'black',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Edit Session
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
} 