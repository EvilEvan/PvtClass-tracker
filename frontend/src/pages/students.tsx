import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/students')
      .then(res => res.json())
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #0a0e1a 0%, #1a2332 50%, #2a3441 100%)',
        color: '#e0e6ed'
      }}>
        <div>Loading...</div>
      </main>
    );
  }

  return (
    <main style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e1a 0%, #1a2332 50%, #2a3441 100%)',
      color: '#e0e6ed',
      padding: '20px'
    }}>
      <Link href="/" style={{ color: '#00d4ff', textDecoration: 'none' }}>
        <h1 style={{ color: '#00d4ff', marginBottom: '30px' }}> Student Registry</h1>
      </Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {students.map(student => (
          <div key={student.id} style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid #00d4ff',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <h3 style={{ color: '#00d4ff', margin: '0 0 10px 0' }}>
              {student.firstName} {student.lastName}
            </h3>
            <p style={{ color: '#b0b7c3', margin: '5px 0' }}> {student.email}</p>
            <p style={{ color: '#b0b7c3', margin: '5px 0' }}> {student.phone}</p>
            <div style={{ marginTop: '10px' }}>
              {student.subjects.map(subject => (
                <span key={subject} style={{
                  display: 'inline-block',
                  margin: '2px',
                  padding: '2px 8px',
                  backgroundColor: 'rgba(0, 212, 255, 0.2)',
                  color: '#00d4ff',
                  borderRadius: '12px',
                  fontSize: '0.8rem'
                }}>
                  {subject}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
