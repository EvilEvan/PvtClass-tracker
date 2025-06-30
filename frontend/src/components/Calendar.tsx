import { useState, useEffect } from 'react';

interface Session {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  studentName?: string;
}

interface CalendarProps {
  onSessionClick?: (session: Session) => void;
  onDateClick?: (date: Date) => void;
}

export default function Calendar({ onSessionClick, onDateClick }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [sessions, setSessions] = useState<Session[]>([]);

  // Sample data - in real app this would come from API
  useEffect(() => {
    const sampleSessions: Session[] = [
      {
        id: '1',
        title: 'Mathematics Tutorial',
        description: 'Algebra and Geometry review',
        startTime: new Date(2025, 0, 15, 10, 0),
        endTime: new Date(2025, 0, 15, 11, 0),
        status: 'SCHEDULED',
        studentName: 'Luke Skywalker'
      },
      {
        id: '2',
        title: 'Physics Session',
        description: 'Force and Motion',
        startTime: new Date(2025, 0, 16, 14, 0),
        endTime: new Date(2025, 0, 16, 15, 30),
        status: 'COMPLETED',
        studentName: 'Leia Organa'
      }
    ];
    setSessions(sampleSessions);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SCHEDULED': return '#00d4ff';
      case 'COMPLETED': return '#00ff88';
      case 'CANCELLED': return '#ff4444';
      default: return '#666';
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const getSessionsForDate = (date: Date) => {
    return sessions.filter(session => {
      const sessionDate = new Date(session.startTime);
      return sessionDate.toDateString() === date.toDateString();
    });
  };

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getViewTitle = () => {
    return currentDate.toLocaleDateString('en', { month: 'long', year: 'numeric' });
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div>
        {/* Calendar Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '1px',
          marginBottom: '1px',
          backgroundColor: '#00d4ff'
        }}>
          {dayNames.map(day => (
            <div key={day} style={{
              padding: '12px 8px',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: '#00d4ff',
              textAlign: 'center',
              fontWeight: '600',
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '1px',
          backgroundColor: '#00d4ff'
        }}>
          {days.map((day, index) => {
            const isCurrentMonth = day.getMonth() === currentDate.getMonth();
            const isToday = day.toDateString() === new Date().toDateString();
            const daysSessions = getSessionsForDate(day);

            return (
              <div
                key={index}
                onClick={() => onDateClick?.(day)}
                style={{
                  minHeight: '100px',
                  backgroundColor: isCurrentMonth ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.3)',
                  padding: '8px',
                  cursor: 'pointer',
                  border: isToday ? '2px solid #00d4ff' : 'none',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
              >
                <div style={{
                  fontSize: '0.9rem',
                  fontWeight: isToday ? '700' : '500',
                  color: isCurrentMonth ? (isToday ? '#00d4ff' : '#e0e6ed') : '#666',
                  marginBottom: '4px'
                }}>
                  {day.getDate()}
                </div>
                
                {/* Sessions for this day */}
                {daysSessions.slice(0, 3).map((session, idx) => (
                  <div
                    key={session.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSessionClick?.(session);
                    }}
                    style={{
                      fontSize: '0.7rem',
                      padding: '2px 4px',
                      marginBottom: '2px',
                      backgroundColor: getStatusColor(session.status),
                      color: 'black',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {session.title}
                  </div>
                ))}
                
                {daysSessions.length > 3 && (
                  <div style={{
                    fontSize: '0.6rem',
                    color: '#00d4ff',
                    textAlign: 'center',
                    marginTop: '2px'
                  }}>
                    +{daysSessions.length - 3} more
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div style={{
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      border: '1px solid #00d4ff',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 0 20px rgba(0, 212, 255, 0.1)'
    }}>
      {/* Calendar Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button
            onClick={() => navigateMonth(-1)}
            style={{
              background: 'transparent',
              border: '1px solid #00d4ff',
              color: '#00d4ff',
              padding: '8px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1.2rem'
            }}
          >
            ‹
          </button>
          
          <h2 style={{
            color: '#00d4ff',
            fontSize: '1.5rem',
            margin: 0,
            fontWeight: '400'
          }}>
            {getViewTitle()}
          </h2>
          
          <button
            onClick={() => navigateMonth(1)}
            style={{
              background: 'transparent',
              border: '1px solid #00d4ff',
              color: '#00d4ff',
              padding: '8px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1.2rem'
            }}
          >
            ›
          </button>
        </div>

        <button
          style={{
            background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
            border: 'none',
            color: 'black',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
        >
          New Session
        </button>
      </div>

      {/* Calendar Content */}
      <div>
        {renderMonthView()}
      </div>

      {/* Legend */}
      <div style={{
        marginTop: '20px',
        padding: '12px',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '6px',
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        fontSize: '0.85rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            backgroundColor: '#00d4ff',
            borderRadius: '3px'
          }}></div>
          <span style={{ color: '#b0b7c3' }}>Scheduled</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            backgroundColor: '#00ff88',
            borderRadius: '3px'
          }}></div>
          <span style={{ color: '#b0b7c3' }}>Completed</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            backgroundColor: '#ff4444',
            borderRadius: '3px'
          }}></div>
          <span style={{ color: '#b0b7c3' }}>Cancelled</span>
        </div>
      </div>
    </div>
  );
} 