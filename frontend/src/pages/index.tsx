import { useState, useEffect } from 'react';
import { Layout } from '../components/UI/Layout';
import { DashboardCard } from '../components/Dashboard/DashboardCard';

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
      <Layout title="Private Class Tracker" description="Loading..." showHeader={false}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '50vh'
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
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </Layout>
    );
  }

  if (!adminExists) {
    return (
      <Layout title="Private Class Tracker - Setup Required" description="Administrator setup required" showHeader={false}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '50vh'
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
            
            <a href="/admin-setup" style={{
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
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Private Class Tracker - Command Center">
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        marginBottom: '40px'
      }}>
        
        <DashboardCard
          title="Student Registry"
          description="Manage student profiles, enrollment status, and academic records."
          icon="👥"
          buttonText="Access Registry"
          href="/students"
        />

        <DashboardCard
          title="Session Control"
          description="Schedule classes, track attendance, and manage session data."
          icon="📅"
          buttonText="Manage Sessions"
          href="/sessions"
        />

        <DashboardCard
          title="Classroom Management"
          description="Manage classroom usage, capacity, and equipment tracking."
          icon="🏛️"
          buttonText="Manage Classrooms"
          href="/classrooms"
        />

        <DashboardCard
          title="Financial Operations"
          description="Process payments, generate invoices, and track financial metrics."
          icon="💰"
          buttonText="Access Finance"
          variant="warning"
          onClick={() => alert('Coming soon')}
        />

        <DashboardCard
          title="Analytics Hub"
          description="Monitor performance metrics and generate comprehensive reports."
          icon="📊"
          buttonText="View Analytics"
          variant="warning"
          onClick={() => alert('Coming soon')}
        />

        <DashboardCard
          title="User Management"
          description="Create admins, teachers, and moderators. Master password access."
          icon="👑"
          buttonText="Admin Panel"
          href="/user-management"
          variant="admin"
        />

        <DashboardCard
          title="Teacher Dashboard"
          description="Simple class confirmation with checkbox and optional notes."
          icon="🎓"
          buttonText="Teacher Panel"
          href="/teacher-dashboard"
          variant="teacher"
        />

      </div>
    </Layout>
  );
} 