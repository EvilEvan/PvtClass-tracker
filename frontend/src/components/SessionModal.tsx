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

interface SessionModalProps {
  session: Session | null;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (session: Session) => void;
  onDelete?: (sessionId: string) => void;
  isNewSession?: boolean;
}

export default function SessionModal({ 
  session, 
  isOpen, 
  onClose, 
  onSave, 
  onDelete,
  isNewSession = false 
}: SessionModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    status: 'SCHEDULED' as 'SCHEDULED' | 'COMPLETED' | 'CANCELLED',
    studentName: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      setFormData({
        title: session.title,
        description: session.description || '',
        startTime: session.startTime.toISOString().slice(0, 16),
        endTime: session.endTime.toISOString().slice(0, 16),
        status: session.status,
        studentName: session.studentName || ''
      });
    } else if (isNewSession) {
      // Reset form for new session
      const now = new Date();
      const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
      
      setFormData({
        title: '',
        description: '',
        startTime: now.toISOString().slice(0, 16),
        endTime: oneHourLater.toISOString().slice(0, 16),
        status: 'SCHEDULED',
        studentName: ''
      });
    }
  }, [session, isNewSession]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const sessionData: Session = {
        id: session?.id || `temp-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        startTime: new Date(formData.startTime),
        endTime: new Date(formData.endTime),
        status: formData.status,
        studentName: formData.studentName
      };

      if (onSave) {
        await onSave(sessionData);
      }
      
      onClose();
    } catch (error) {
      console.error('Failed to save session:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (session && onDelete) {
      if (confirm('Are you sure you want to delete this session?')) {
        setLoading(true);
        try {
          await onDelete(session.id);
          onClose();
        } catch (error) {
          console.error('Failed to delete session:', error);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  if (!isOpen) return null;

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
        backgroundColor: 'rgba(10, 14, 26, 0.95)',
        border: '1px solid #00d4ff',
        borderRadius: '12px',
        boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)',
        width: '100%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 30px',
          borderBottom: '1px solid #00d4ff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{
            color: '#00d4ff',
            fontSize: '1.5rem',
            margin: 0,
            fontWeight: '400',
            textShadow: '0 0 10px rgba(0, 212, 255, 0.5)'
          }}>
            {isNewSession ? 'New Session' : 'Session Details'}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#00d4ff',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '5px'
            }}
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '30px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#b0b7c3',
              fontSize: '0.9rem',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Session Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #00d4ff',
                borderRadius: '6px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#e0e6ed',
                fontSize: '1rem',
                outline: 'none'
              }}
              placeholder="Enter session title..."
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#b0b7c3',
              fontSize: '0.9rem',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Student Name
            </label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #00d4ff',
                borderRadius: '6px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#e0e6ed',
                fontSize: '1rem',
                outline: 'none'
              }}
              placeholder="Enter student name..."
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#b0b7c3',
                fontSize: '0.9rem',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Start Time
              </label>
              <input
                type="datetime-local"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #00d4ff',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: '#e0e6ed',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#b0b7c3',
                fontSize: '0.9rem',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                End Time
              </label>
              <input
                type="datetime-local"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #00d4ff',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: '#e0e6ed',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#b0b7c3',
              fontSize: '0.9rem',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #00d4ff',
                borderRadius: '6px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#e0e6ed',
                fontSize: '1rem',
                outline: 'none'
              }}
            >
              <option value="SCHEDULED">Scheduled</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#b0b7c3',
              fontSize: '0.9rem',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #00d4ff',
                borderRadius: '6px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#e0e6ed',
                fontSize: '1rem',
                outline: 'none',
                resize: 'vertical'
              }}
              placeholder="Optional session description..."
            />
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'flex-end',
            flexWrap: 'wrap'
          }}>
            {session && !isNewSession && onDelete && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                style={{
                  padding: '12px 24px',
                  border: '1px solid #ff4444',
                  borderRadius: '6px',
                  backgroundColor: 'transparent',
                  color: '#ff4444',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  opacity: loading ? 0.6 : 1
                }}
              >
                Delete
              </button>
            )}
            
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              style={{
                padding: '12px 24px',
                border: '1px solid #666',
                borderRadius: '6px',
                backgroundColor: 'transparent',
                color: '#b0b7c3',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                opacity: loading ? 0.6 : 1
              }}
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '12px 24px',
                border: '1px solid #00d4ff',
                borderRadius: '6px',
                background: loading ? 'rgba(0, 212, 255, 0.3)' : 'linear-gradient(45deg, #00d4ff, #0099cc)',
                color: 'black',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              {loading ? 'Saving...' : (isNewSession ? 'Create Session' : 'Save Changes')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 