import React, { useState } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { mockData } from '../data/mock';

export const WaitlistSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Mock submission
    setTimeout(() => {
      mockData.addToWaitlist(email);
      setStatus('success');
      setEmail('');
      
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <section style={{
      padding: '160px 7.6923%',
      background: 'var(--bg-primary)',
      position: 'relative'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <h2 className="display-large" style={{ marginBottom: '24px' }}>
          Get Early Access
        </h2>
        <p className="body-large" style={{ color: 'var(--text-secondary)', marginBottom: '60px', maxWidth: '700px', margin: '0 auto 60px' }}>
          Join the waitlist for priority access to tokenized SGBs. Limited spots available for early adopters.
        </p>

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          gap: '16px',
          maxWidth: '600px',
          margin: '0 auto',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: '1', minWidth: '280px', position: 'relative' }}>
            <Mail size={20} style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{
                width: '100%',
                height: '56px',
                padding: '0 20px 0 52px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '0px',
                color: 'var(--text-primary)',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--brand-primary)';
                e.target.style.background = 'rgba(212, 175, 55, 0.05)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border-subtle)';
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            />
          </div>
          <button 
            type="submit" 
            className="btn-primary"
            disabled={status === 'loading'}
            style={{ gap: '8px', minWidth: '180px' }}
          >
            {status === 'loading' ? 'Joining...' : status === 'success' ? 'Joined!' : 'Join Waitlist'}
            <ArrowRight size={20} />
          </button>
        </form>

        {status === 'success' && (
          <div style={{
            marginTop: '24px',
            padding: '16px',
            background: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid var(--brand-primary)',
            color: 'var(--brand-primary)',
            fontSize: '16px'
          }}>
            Successfully joined! Check your email for confirmation.
          </div>
        )}

        <div style={{
          marginTop: '60px',
          padding: '40px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '40px' }}>
            <div>
              <div className="heading-1" style={{ color: 'var(--brand-primary)' }}>{mockData.getWaitlistCount()}</div>
              <div className="body-muted">On Waitlist</div>
            </div>
            <div>
              <div className="heading-1" style={{ color: 'var(--brand-primary)' }}>500</div>
              <div className="body-muted">Spots Left</div>
            </div>
            <div>
              <div className="heading-1" style={{ color: 'var(--brand-primary)' }}>Q2 2025</div>
              <div className="body-muted">Launch Target</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};