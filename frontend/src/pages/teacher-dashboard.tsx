import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Session {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  status: string;
  teacherConfirmed: boolean;
  teacherNotes?: string;
  student: {
    id: string;
    name: string;
    email: string;
  };
  teacher: {
    id: string;
    name: string;
    email: string;
  };
}

export default function TeacherDashboard() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [pendingSessions, setPendingSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTeacherId] = useState('teacher-1'); // This would come from auth context
  const [confirmingSession, setConfirmingSession] = useState<string | null>(null);
  const [sessionNotes, setSessionNotes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      // Fetch all sessions for this teacher
      const response = await fetch(`http://localhost:8000/sessions/teacher/${currentTeacherId}`);
      const allSessions = await response.json();
      setSessions(Array.isArray(allSessions) ? allSessions : []);

      // Fetch pending confirmations
      const pendingResponse = await fetch(`http://localhost:8000/sessions/pending-confirmation?teacherId=${currentTeacherId}`);
      const pending = await pendingResponse.json();
      setPendingSessions(Array.isArray(pending) ? pending : []);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      setSessions([]);
      setPendingSessions([]);
      setLoading(false);
    }
  };

  const handleConfirmSession = async (sessionId: string) => {
    setConfirmingSession(sessionId);
    
    try {
      const response = await fetch(`http://localhost:8000/sessions/${sessionId}/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teacherId: currentTeacherId,
          notes: sessionNotes[sessionId] || undefined,
        }),
      });

      if (response.ok) {
        // Refresh sessions
        await fetchSessions();
        // Clear notes for this session
        setSessionNotes(prev => ({ ...prev, [sessionId]: '' }));
      } else {
        console.error('Failed to confirm session');
      }
    } catch (error) {
      console.error('Error confirming session:', error);
    } finally {
      setConfirmingSession(null);
    }
  };

  const handleNotesChange = (sessionId: string, notes: string) => {
    setSessionNotes(prev => ({ ...prev, [sessionId]: notes }));
  };

  const getStatusColor = (status: string, confirmed: boolean) => {
    if (confirmed) return '#00ff88';
    switch (status) {
      case 'SCHEDULED': return '#00d4ff';
      case 'COMPLETED': return '#00ff88';
      case 'CANCELLED': return '#ff4444';
      default: return '#888';
    }
  };

  const getStatusIcon = (status: string, confirmed: boolean) => {
    if (confirmed) return '✅';
    switch (status) {
      case 'SCHEDULED': return '📅';
      case 'COMPLETED': return '✅';
      case 'CANCELLED': return '❌';
      default: return '❓';
    }
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Teacher Dashboard - Private Class Tracker</title>
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
            <p>Loading Teacher Dashboard...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Teacher Dashboard - Private Class Tracker</title>
      </Head>
      <main style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0e1a 0%, #1a2332 50%, #2a3441 100%)',
        color: '#e0e6ed',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <header style={{
          borderBottom: '1px solid #00d4ff',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          padding: '20px 0'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <Link href="/" style={{ color: '#00d4ff', textDecoration: 'none' }}>
                <h1 style={{
                  fontSize: '2rem',
                  color: '#00d4ff',
                  fontWeight: '300',
                  margin: 0,
                  textShadow: '0 0 10px rgba(0, 212, 255, 0.5)'
                }}>
                  🎓 Teacher Dashboard
                </h1>
              </Link>
              <p style={{ 
                color: '#b0b7c3', 
                margin: '5px 0 0 0',
                fontSize: '0.9rem'
              }}>
                Class Confirmation Center
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{
                padding: '8px 16px',
                backgroundColor: 'rgba(255, 149, 0, 0.2)',
                border: '1px solid #ff9500',
                borderRadius: '20px',
                fontSize: '0.9rem',
                color: '#ff9500'
              }}>
                {pendingSessions.length} Pending Confirmations
              </div>
            </div>
          </div>
        </header>

        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
          {/* Pending Confirmations Section */}
          {pendingSessions.length > 0 && (
            <div style={{
              backgroundColor: 'rgba(255, 149, 0, 0.1)',
              border: '1px solid #ff9500',
              borderRadius: '12px',
              padding: '30px',
              marginBottom: '40px'
            }}>
              <h2 style={{ color: '#ff9500', marginBottom: '20px', fontSize: '1.5rem' }}>
                ⏰ Classes Awaiting Confirmation
              </h2>
              <p style={{ color: '#b0b7c3', marginBottom: '24px', fontSize: '0.95rem' }}>
                Please confirm that you gave these classes by checking the box. Add optional notes if needed.
              </p>
              
              <div style={{ display: 'grid', gap: '20px' }}>
                {pendingSessions.map(session => (
                  <div
                    key={session.id}
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(255, 149, 0, 0.5)',
                      borderRadius: '12px',
                      padding: '24px'
                    }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '20px', alignItems: 'flex-start' }}>
                      {/* Confirmation Checkbox */}
                      <div style={{ paddingTop: '4px' }}>
                        <button
                          onClick={() => handleConfirmSession(session.id)}
                          disabled={confirmingSession === session.id}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            border: '2px solid #00d4ff',
                            backgroundColor: 'transparent',
                            color: '#00d4ff',
                            fontSize: '18px',
                            cursor: confirmingSession === session.id ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: confirmingSession === session.id ? 0.5 : 1
                          }}
                        >
                          {confirmingSession === session.id ? '⏳' : '✓'}
                        </button>
                      </div>

                      {/* Session Details */}
                      <div>
                        <h3 style={{
                          color: '#00d4ff',
                          fontSize: '1.2rem',
                          margin: '0 0 12px 0',
                          fontWeight: '500'
                        }}>
                          {session.title}
                        </h3>
                        
                        <div style={{ display: 'grid', gap: '8px', marginBottom: '16px' }}>
                          <p style={{ color: '#e0e6ed', margin: 0, fontSize: '0.95rem' }}>
                            👤 Student: {session.student.name}
                          </p>
                          <p style={{ color: '#b0b7c3', margin: 0, fontSize: '0.9rem' }}>
                            📅 {new Date(session.startTime).toLocaleString()} - {new Date(session.endTime).toLocaleTimeString()}
                          </p>
                          {session.description && (
                            <p style={{ color: '#b0b7c3', margin: 0, fontSize: '0.85rem', fontStyle: 'italic' }}>
                              {session.description}
                            </p>
                          )}
                        </div>

                        {/* Optional Notes */}
                        <div>
                          <label style={{
                            color: '#b0b7c3',
                            fontSize: '0.9rem',
                            display: 'block',
                            marginBottom: '8px'
                          }}>
                            Optional Notes (will notify moderators):
                          </label>
                          <textarea
                            value={sessionNotes[session.id] || ''}
                            onChange={(e) => handleNotesChange(session.id, e.target.value)}
                            placeholder="Add any notes about this class session..."
                            rows={3}
                            style={{
                              width: '100%',
                              padding: '12px',
                              backgroundColor: 'rgba(0, 0, 0, 0.5)',
                              border: '1px solid #666',
                              borderRadius: '8px',
                              color: '#e0e6ed',
                              fontSize: '0.9rem',
                              resize: 'vertical',
                              outline: 'none'
                            }}
                          />
                        </div>
                      </div>

                      {/* Action Button */}
                      <div>
                        <button
                          onClick={() => handleConfirmSession(session.id)}
                          disabled={confirmingSession === session.id}
                          style={{
                            padding: '12px 20px',
                            background: confirmingSession === session.id 
                              ? 'rgba(0, 212, 255, 0.3)' 
                              : 'linear-gradient(45deg, #00d4ff, #0099cc)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            cursor: confirmingSession === session.id ? 'not-allowed' : 'pointer',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            minWidth: '120px'
                          }}
                        >
                          {confirmingSession === session.id ? 'Confirming...' : 'Confirm Class'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Sessions */}
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid #00d4ff',
            borderRadius: '12px',
            padding: '30px'
          }}>
            <h2 style={{ color: '#00d4ff', marginBottom: '20px', fontSize: '1.5rem' }}>
              📚 Recent Sessions
            </h2>
            
            <div style={{ display: 'grid', gap: '16px' }}>
              {(sessions || []).slice(0, 10).map(session => (
                <div
                  key={session.id}
                  style={{
                    backgroundColor: 'rgba(0, 212, 255, 0.05)',
                    border: `1px solid ${getStatusColor(session.status, session.teacherConfirmed)}`,
                    borderRadius: '8px',
                    padding: '20px',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr auto',
                    alignItems: 'center',
                    gap: '16px'
                  }}
                >
                  <div style={{ fontSize: '1.5rem' }}>
                    {getStatusIcon(session.status, session.teacherConfirmed)}
                  </div>
                  
                  <div>
                    <h4 style={{ color: '#00d4ff', margin: '0 0 8px 0', fontSize: '1.1rem' }}>
                      {session.title}
                    </h4>
                    <p style={{ color: '#e0e6ed', margin: '4px 0', fontSize: '0.9rem' }}>
                      Student: {session.student.name}
                    </p>
                    <p style={{ color: '#b0b7c3', margin: '4px 0', fontSize: '0.85rem' }}>
                      {new Date(session.startTime).toLocaleString()}
                    </p>
                    {session.teacherNotes && (
                      <p style={{ color: '#888', margin: '8px 0 0 0', fontSize: '0.8rem', fontStyle: 'italic' }}>
                        Notes: {session.teacherNotes}
                      </p>
                    )}
                  </div>
                  
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    backgroundColor: `${getStatusColor(session.status, session.teacherConfirmed)}20`,
                    color: getStatusColor(session.status, session.teacherConfirmed),
                    border: `1px solid ${getStatusColor(session.status, session.teacherConfirmed)}`
                  }}>
                    {session.teacherConfirmed ? 'CONFIRMED' : session.status}
                  </span>
                </div>
              ))}
            </div>

            {(sessions || []).length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#b0b7c3' }}>
                <p>No sessions found. Check back later for scheduled classes.</p>
              </div>
            )}
          </div>
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