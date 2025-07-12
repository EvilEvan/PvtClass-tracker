import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '../components/UI/Layout';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('authToken');
    if (!token) {
      // Redirect to login selection page
      router.push('/login-select');
    } else {
      // User is authenticated, redirect to dashboard
      router.push('/dashboard');
    }
  }, [router]);

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
          <p style={{ fontSize: '1.2rem' }}>Redirecting...</p>
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