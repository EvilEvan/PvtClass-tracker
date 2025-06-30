import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Classroom {
  id: string;
  name: string;
  capacity: number;
  location: string;
  equipment: string[];
  status: 'available' | 'in-use' | 'maintenance';
  currentSession?: {
    sessionId: string;
    studentName: string;
    subject: string;
    startTime: string;
    endTime: string;
    reportedBy: string;
  };
}

interface ClassroomUsageReport {
  id: string;
  classroomId: string;
  classroomName: string;
  studentName: string;
  subject: string;
  startTime: string;
  endTime?: string;
  status: 'active' | 'completed' | 'cancelled';
  reportedBy: string;
  reportedAt: string;
  notes?: string;
}

export default function Classrooms() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [usageReports, setUsageReports] = useState<ClassroomUsageReport[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null);
  const [showReportForm, setShowReportForm] = useState(false);
  const [showReports, setShowReports] = useState(false);

  useEffect(() => {
    fetchClassrooms();
    fetchUsageReports();
    fetchStats();
  }, []);

  const fetchClassrooms = async () => {
    try {
      const response = await fetch('http://localhost:8000/classrooms');
      const data = await response.json();
      setClassrooms(data);
    } catch (error) {
      console.error('Error fetching classrooms:', error);
    }
  };

  const fetchUsageReports = async () => {
    try {
      const response = await fetch('http://localhost:8000/classrooms/usage-reports');
      const data = await response.json();
      setUsageReports(data);
    } catch (error) {
      console.error('Error fetching usage reports:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:8000/classrooms/stats/overview');
      const data = await response.json();
      setStats(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#00d4ff';
      case 'in-use': return '#ff9500';
      case 'maintenance': return '#ff4444';
      default: return '#888';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return '✅';
      case 'in-use': return '🔄';
      case 'maintenance': return '🔧';
      default: return '❓';
    }
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Classroom Management - Private Class Tracker</title>
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
            <p>Loading Classroom Management...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Classroom Management - Private Class Tracker</title>
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
                  ← Classroom Management
                </h1>
              </Link>
              <p style={{ 
                color: '#b0b7c3', 
                margin: '5px 0 0 0',
                fontSize: '0.9rem'
              }}>
                Command & Control Center
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowReportForm(true)}
                style={{
                  background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                📝 Report Usage
              </button>
              <button
                onClick={() => setShowReports(!showReports)}
                style={{
                  background: showReports ? 'rgba(0, 212, 255, 0.2)' : 'transparent',
                  color: '#00d4ff',
                  border: '1px solid #00d4ff',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                📊 View Reports
              </button>
            </div>
          </div>
        </header>

        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
          {/* Stats Dashboard */}
          {stats && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              marginBottom: '40px'
            }}>
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid #00d4ff',
                borderRadius: '12px',
                padding: '24px',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#00d4ff', fontSize: '2rem', margin: '0 0 8px 0' }}>{stats.totalClassrooms}</h3>
                <p style={{ color: '#b0b7c3', margin: 0 }}>Total Classrooms</p>
              </div>
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid #00d4ff',
                borderRadius: '12px',
                padding: '24px',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#00d4ff', fontSize: '2rem', margin: '0 0 8px 0' }}>{stats.availableClassrooms}</h3>
                <p style={{ color: '#b0b7c3', margin: 0 }}>Available</p>
              </div>
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid #00d4ff',
                borderRadius: '12px',
                padding: '24px',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#ff9500', fontSize: '2rem', margin: '0 0 8px 0' }}>{stats.inUseClassrooms}</h3>
                <p style={{ color: '#b0b7c3', margin: 0 }}>In Use</p>
              </div>
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid #00d4ff',
                borderRadius: '12px',
                padding: '24px',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#ff4444', fontSize: '2rem', margin: '0 0 8px 0' }}>{stats.maintenanceClassrooms}</h3>
                <p style={{ color: '#b0b7c3', margin: 0 }}>Maintenance</p>
              </div>
            </div>
          )}

          {/* Usage Reports Section */}
          {showReports && (
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid #00d4ff',
              borderRadius: '12px',
              padding: '30px',
              marginBottom: '40px'
            }}>
              <h2 style={{ color: '#00d4ff', marginBottom: '20px' }}>Recent Usage Reports</h2>
              <div style={{ display: 'grid', gap: '16px' }}>
                {usageReports.slice(0, 10).map(report => (
                  <div
                    key={report.id}
                    style={{
                      backgroundColor: 'rgba(0, 212, 255, 0.1)',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'grid',
                      gridTemplateColumns: '1fr auto',
                      alignItems: 'center',
                      gap: '16px'
                    }}
                  >
                    <div>
                      <h4 style={{ color: '#00d4ff', margin: '0 0 8px 0' }}>
                        {report.classroomName} - {report.studentName}
                      </h4>
                      <p style={{ color: '#e0e6ed', margin: '4px 0' }}>
                        Subject: {report.subject} | Reported by: {report.reportedBy}
                      </p>
                      <p style={{ color: '#b0b7c3', margin: '4px 0', fontSize: '0.9rem' }}>
                        {new Date(report.startTime).toLocaleString()} 
                        {report.endTime && ` - ${new Date(report.endTime).toLocaleString()}`}
                      </p>
                      {report.notes && (
                        <p style={{ color: '#888', margin: '8px 0 0 0', fontSize: '0.85rem', fontStyle: 'italic' }}>
                          {report.notes}
                        </p>
                      )}
                    </div>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      backgroundColor: report.status === 'active' ? 'rgba(255, 149, 0, 0.2)' : 'rgba(0, 212, 255, 0.2)',
                      color: report.status === 'active' ? '#ff9500' : '#00d4ff',
                      border: `1px solid ${report.status === 'active' ? '#ff9500' : '#00d4ff'}`
                    }}>
                      {report.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Classrooms Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '24px'
          }}>
            {classrooms.map(classroom => (
              <div
                key={classroom.id}
                onClick={() => setSelectedClassroom(classroom)}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  border: `1px solid ${getStatusColor(classroom.status)}`,
                  borderRadius: '12px',
                  padding: '24px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: `0 0 20px ${getStatusColor(classroom.status)}20`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <h3 style={{
                    color: '#00d4ff',
                    fontSize: '1.3rem',
                    margin: 0,
                    fontWeight: '500'
                  }}>
                    {classroom.name}
                  </h3>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    backgroundColor: `${getStatusColor(classroom.status)}20`,
                    color: getStatusColor(classroom.status),
                    border: `1px solid ${getStatusColor(classroom.status)}`
                  }}>
                    {getStatusIcon(classroom.status)} {classroom.status.toUpperCase()}
                  </span>
                </div>
                
                <div style={{ marginBottom: '12px' }}>
                  <p style={{ color: '#b0b7c3', margin: '4px 0', fontSize: '0.9rem' }}>
                    📍 {classroom.location}
                  </p>
                  <p style={{ color: '#b0b7c3', margin: '4px 0', fontSize: '0.9rem' }}>
                    👥 Capacity: {classroom.capacity} students
                  </p>
                </div>

                {classroom.currentSession && (
                  <div style={{
                    backgroundColor: 'rgba(255, 149, 0, 0.1)',
                    border: '1px solid rgba(255, 149, 0, 0.3)',
                    borderRadius: '8px',
                    padding: '12px',
                    marginBottom: '16px'
                  }}>
                    <h4 style={{ color: '#ff9500', margin: '0 0 8px 0', fontSize: '1rem' }}>Current Session</h4>
                    <p style={{ color: '#e0e6ed', margin: '4px 0', fontSize: '0.9rem' }}>
                      Student: {classroom.currentSession.studentName}
                    </p>
                    <p style={{ color: '#e0e6ed', margin: '4px 0', fontSize: '0.9rem' }}>
                      Subject: {classroom.currentSession.subject}
                    </p>
                    <p style={{ color: '#b0b7c3', margin: '4px 0', fontSize: '0.8rem' }}>
                      Started: {new Date(classroom.currentSession.startTime).toLocaleString()}
                    </p>
                  </div>
                )}

                <div style={{ marginBottom: '16px' }}>
                  <p style={{ color: '#e0e6ed', fontSize: '0.85rem', margin: '0 0 8px 0', fontWeight: '500' }}>Equipment:</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {classroom.equipment.slice(0, 3).map(item => (
                      <span
                        key={item}
                        style={{
                          padding: '2px 8px',
                          backgroundColor: 'rgba(0, 212, 255, 0.2)',
                          color: '#00d4ff',
                          borderRadius: '12px',
                          fontSize: '0.75rem'
                        }}
                      >
                        {item}
                      </span>
                    ))}
                    {classroom.equipment.length > 3 && (
                      <span style={{ color: '#888', fontSize: '0.75rem' }}>
                        +{classroom.equipment.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Classroom Detail Modal */}
        {selectedClassroom && (
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
              backgroundColor: '#1a2332',
              border: '1px solid #00d4ff',
              borderRadius: '12px',
              padding: '30px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ color: '#00d4ff', margin: 0 }}>
                  {selectedClassroom.name}
                </h2>
                <button
                  onClick={() => setSelectedClassroom(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#00d4ff',
                    fontSize: '24px',
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
              </div>

              <div style={{ display: 'grid', gap: '20px' }}>
                <div>
                  <h4 style={{ color: '#00d4ff', marginBottom: '8px' }}>Location & Capacity</h4>
                  <p style={{ color: '#e0e6ed', margin: '4px 0' }}>Location: {selectedClassroom.location}</p>
                  <p style={{ color: '#e0e6ed', margin: '4px 0' }}>Capacity: {selectedClassroom.capacity} students</p>
                  <p style={{ color: '#e0e6ed', margin: '4px 0' }}>
                    Status: <span style={{ color: getStatusColor(selectedClassroom.status) }}>
                      {selectedClassroom.status.toUpperCase()}
                    </span>
                  </p>
                </div>

                <div>
                  <h4 style={{ color: '#00d4ff', marginBottom: '8px' }}>Equipment</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {selectedClassroom.equipment.map(item => (
                      <span
                        key={item}
                        style={{
                          padding: '4px 12px',
                          backgroundColor: 'rgba(0, 212, 255, 0.2)',
                          color: '#00d4ff',
                          borderRadius: '16px',
                          fontSize: '0.9rem'
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedClassroom.currentSession && (
                  <div>
                    <h4 style={{ color: '#ff9500', marginBottom: '8px' }}>Current Session</h4>
                    <p style={{ color: '#e0e6ed', margin: '4px 0' }}>Student: {selectedClassroom.currentSession.studentName}</p>
                    <p style={{ color: '#e0e6ed', margin: '4px 0' }}>Subject: {selectedClassroom.currentSession.subject}</p>
                    <p style={{ color: '#e0e6ed', margin: '4px 0' }}>Reported by: {selectedClassroom.currentSession.reportedBy}</p>
                    <p style={{ color: '#b0b7c3', margin: '4px 0' }}>
                      Started: {new Date(selectedClassroom.currentSession.startTime).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              <div style={{ marginTop: '30px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setSelectedClassroom(null)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: 'transparent',
                    color: '#b0b7c3',
                    border: '1px solid #666',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
                {selectedClassroom.status === 'available' && (
                  <button
                    onClick={() => {
                      setShowReportForm(true);
                      setSelectedClassroom(null);
                    }}
                    style={{
                      padding: '10px 20px',
                      background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Report Usage
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Report Usage Form Modal */}
        {showReportForm && (
          <ReportUsageForm 
            classrooms={classrooms}
            onClose={() => setShowReportForm(false)}
            onSubmit={() => {
              setShowReportForm(false);
              fetchClassrooms();
              fetchUsageReports();
              fetchStats();
            }}
          />
        )}
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

// Report Usage Form Component
function ReportUsageForm({ classrooms, onClose, onSubmit }: {
  classrooms: Classroom[];
  onClose: () => void;
  onSubmit: () => void;
}) {
  const [formData, setFormData] = useState({
    classroomId: '',
    studentName: '',
    subject: '',
    startTime: '',
    reportedBy: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8000/classrooms/report-usage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        onSubmit();
      } else {
        console.error('Failed to report usage');
      }
    } catch (error) {
      console.error('Error reporting usage:', error);
    }
  };

  return (
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
        backgroundColor: '#1a2332',
        border: '1px solid #00d4ff',
        borderRadius: '12px',
        padding: '30px',
        maxWidth: '500px',
        width: '100%'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ color: '#00d4ff', margin: 0 }}>Report Classroom Usage</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#00d4ff',
              fontSize: '24px',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
          <div>
            <label style={{ color: '#e0e6ed', display: 'block', marginBottom: '8px' }}>Classroom</label>
            <select
              value={formData.classroomId}
              onChange={(e) => setFormData({ ...formData, classroomId: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid #00d4ff',
                borderRadius: '8px',
                color: '#e0e6ed',
                fontSize: '1rem'
              }}
            >
              <option value="">Select a classroom</option>
              {classrooms.filter(c => c.status === 'available').map(classroom => (
                <option key={classroom.id} value={classroom.id}>
                  {classroom.name} - {classroom.location}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ color: '#e0e6ed', display: 'block', marginBottom: '8px' }}>Student Name</label>
            <input
              type="text"
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid #00d4ff',
                borderRadius: '8px',
                color: '#e0e6ed',
                fontSize: '1rem'
              }}
            />
          </div>

          <div>
            <label style={{ color: '#e0e6ed', display: 'block', marginBottom: '8px' }}>Subject</label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid #00d4ff',
                borderRadius: '8px',
                color: '#e0e6ed',
                fontSize: '1rem'
              }}
            />
          </div>

          <div>
            <label style={{ color: '#e0e6ed', display: 'block', marginBottom: '8px' }}>Start Time</label>
            <input
              type="datetime-local"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid #00d4ff',
                borderRadius: '8px',
                color: '#e0e6ed',
                fontSize: '1rem'
              }}
            />
          </div>

          <div>
            <label style={{ color: '#e0e6ed', display: 'block', marginBottom: '8px' }}>Reported By</label>
            <input
              type="text"
              value={formData.reportedBy}
              onChange={(e) => setFormData({ ...formData, reportedBy: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid #00d4ff',
                borderRadius: '8px',
                color: '#e0e6ed',
                fontSize: '1rem'
              }}
            />
          </div>

          <div>
            <label style={{ color: '#e0e6ed', display: 'block', marginBottom: '8px' }}>Notes (Optional)</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid #00d4ff',
                borderRadius: '8px',
                color: '#e0e6ed',
                fontSize: '1rem',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '12px 24px',
                backgroundColor: 'transparent',
                color: '#b0b7c3',
                border: '1px solid #666',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Report Usage
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 