import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showMasterUnlock, setShowMasterUnlock] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    role: 'TEACHER' as 'TEACHER' | 'MODERATOR' | 'ADMIN'
  });
  const [masterPassword, setMasterPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/auth/users');
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:8000/auth/create-user', {
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
        setMessage(`Success! ${result.role} user created: ${result.email}`);
        setFormData({ email: '', name: '', password: '', role: 'TEACHER' });
        setShowCreateForm(false);
        fetchUsers();
      }
    } catch (error) {
      setMessage('Error: Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  const handleMasterUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/auth/master-unlock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: masterPassword }),
      });

      const result = await response.json();
      
      if (result.error) {
        setMessage(`Master unlock failed: ${result.error}`);
      } else {
        setMessage(`✅ ${result.message}`);
        setShowMasterUnlock(false);
        setMasterPassword('');
      }
    } catch (error) {
      setMessage('Error: Could not validate master password.');
    }
  };

  const handleDeleteUser = async (userId: string, userEmail: string) => {
    if (confirm(`Are you sure you want to delete user: ${userEmail}?`)) {
      try {
        const response = await fetch(`http://localhost:8000/auth/users/${userId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setMessage(`User ${userEmail} deleted successfully.`);
          fetchUsers();
        } else {
          setMessage('Error deleting user.');
        }
      } catch (error) {
        setMessage('Error: Could not delete user.');
      }
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return '#ff4444';
      case 'MODERATOR': return '#ff9500';
      case 'TEACHER': return '#00d4ff';
      default: return '#888';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'ADMIN': return '👑';
      case 'MODERATOR': return '🛡️';
      case 'TEACHER': return '🎓';
      default: return '👤';
    }
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>User Management - Private Class Tracker</title>
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
            <p>Loading User Management...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>User Management - Private Class Tracker</title>
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
                  ← User Management
                </h1>
              </Link>
              <p style={{ 
                color: '#b0b7c3', 
                margin: '5px 0 0 0',
                fontSize: '0.9rem'
              }}>
                Administrative Control Panel
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowCreateForm(true)}
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
                👤 Create User
              </button>
              <button
                onClick={() => setShowMasterUnlock(true)}
                style={{
                  background: 'linear-gradient(45deg, #ff4444, #cc3333)',
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
                🔓 Master Unlock
              </button>
            </div>
          </div>
        </header>

        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
          {/* Stats Dashboard */}
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
              <h3 style={{ color: '#00d4ff', fontSize: '2rem', margin: '0 0 8px 0' }}>{users.length}</h3>
              <p style={{ color: '#b0b7c3', margin: 0 }}>Total Users</p>
            </div>
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid #ff4444',
              borderRadius: '12px',
              padding: '24px',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#ff4444', fontSize: '2rem', margin: '0 0 8px 0' }}>
                {users.filter(u => u.role === 'ADMIN').length}
              </h3>
              <p style={{ color: '#b0b7c3', margin: 0 }}>Administrators</p>
            </div>
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid #ff9500',
              borderRadius: '12px',
              padding: '24px',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#ff9500', fontSize: '2rem', margin: '0 0 8px 0' }}>
                {users.filter(u => u.role === 'MODERATOR').length}
              </h3>
              <p style={{ color: '#b0b7c3', margin: 0 }}>Moderators</p>
            </div>
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid #00d4ff',
              borderRadius: '12px',
              padding: '24px',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#00d4ff', fontSize: '2rem', margin: '0 0 8px 0' }}>
                {users.filter(u => u.role === 'TEACHER').length}
              </h3>
              <p style={{ color: '#b0b7c3', margin: 0 }}>Teachers</p>
            </div>
          </div>

          {/* Users List */}
          <div style={{
            display: 'grid',
            gap: '16px'
          }}>
            {users.map(user => (
              <div
                key={user.id}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  border: `1px solid ${getRoleColor(user.role)}`,
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  alignItems: 'center',
                  gap: '20px'
                }}
              >
                <div style={{ fontSize: '2rem' }}>
                  {getRoleIcon(user.role)}
                </div>
                
                <div>
                  <h3 style={{
                    color: '#00d4ff',
                    fontSize: '1.2rem',
                    margin: '0 0 8px 0',
                    fontWeight: '500'
                  }}>
                    {user.name || 'Unnamed User'}
                  </h3>
                  <p style={{ color: '#e0e6ed', margin: '4px 0', fontSize: '0.95rem' }}>
                    📧 {user.email}
                  </p>
                  <p style={{ color: '#b0b7c3', margin: '4px 0', fontSize: '0.85rem' }}>
                    Created: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    backgroundColor: `${getRoleColor(user.role)}20`,
                    color: getRoleColor(user.role),
                    border: `1px solid ${getRoleColor(user.role)}`
                  }}>
                    {user.role}
                  </span>
                  
                  <button
                    onClick={() => handleDeleteUser(user.id, user.email)}
                    style={{
                      background: 'transparent',
                      border: '1px solid #ff4444',
                      color: '#ff4444',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      textTransform: 'uppercase'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create User Modal */}
        {showCreateForm && (
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
                <h2 style={{ color: '#00d4ff', margin: 0 }}>Create New User</h2>
                <button
                  onClick={() => setShowCreateForm(false)}
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

              <form onSubmit={handleCreateUser} style={{ display: 'grid', gap: '20px' }}>
                <div>
                  <label style={{ color: '#e0e6ed', display: 'block', marginBottom: '8px' }}>Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
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
                    <option value="TEACHER">👨‍🏫 Teacher</option>
                    <option value="MODERATOR">🛡️ Moderator</option>
                    <option value="ADMIN">👑 Administrator</option>
                  </select>
                </div>

                <div>
                  <label style={{ color: '#e0e6ed', display: 'block', marginBottom: '8px' }}>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  <label style={{ color: '#e0e6ed', display: 'block', marginBottom: '8px' }}>Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  <label style={{ color: '#e0e6ed', display: 'block', marginBottom: '8px' }}>Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
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
                    disabled={loading}
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
                    {loading ? 'Creating...' : 'Create User'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Master Unlock Modal */}
        {showMasterUnlock && (
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
              border: '1px solid #ff4444',
              borderRadius: '12px',
              padding: '30px',
              maxWidth: '400px',
              width: '100%'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ color: '#ff4444', margin: 0 }}>🔓 Master Override</h2>
                <button
                  onClick={() => setShowMasterUnlock(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ff4444',
                    fontSize: '24px',
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
              </div>

              <p style={{ color: '#b0b7c3', marginBottom: '20px', fontSize: '0.9rem' }}>
                Enter EVAN's master password to unlock any profile in the system.
              </p>

              <form onSubmit={handleMasterUnlock} style={{ display: 'grid', gap: '20px' }}>
                <div>
                  <label style={{ color: '#e0e6ed', display: 'block', marginBottom: '8px' }}>Master Password</label>
                  <input
                    type="password"
                    value={masterPassword}
                    onChange={(e) => setMasterPassword(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid #ff4444',
                      borderRadius: '8px',
                      color: '#e0e6ed',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setShowMasterUnlock(false)}
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
                      background: 'linear-gradient(45deg, #ff4444, #cc3333)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    🔓 Unlock
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Message Display */}
        {message && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 24px',
            borderRadius: '8px',
            backgroundColor: message.includes('Error') ? 'rgba(220, 53, 69, 0.9)' : 'rgba(40, 167, 69, 0.9)',
            color: 'white',
            fontSize: '0.9rem',
            zIndex: 1001,
            maxWidth: '400px'
          }}>
            {message}
            <button
              onClick={() => setMessage('')}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '16px',
                cursor: 'pointer',
                marginLeft: '12px'
              }}
            >
              ×
            </button>
          </div>
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