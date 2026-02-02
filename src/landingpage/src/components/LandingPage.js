import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, X, Wallet, ChevronDown, ArrowRight, Play, Shield, Lock, Coins,
  Eye, EyeOff, FileCheck, UserCheck, Check, Cpu, Building2, Zap,
  Github, Twitter, FileText, Mail
} from 'lucide-react';
import { usePhantomWallet } from '../hooks/usePhantomWallet';
import { mockData } from '../data/mock';

// Header Component
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);
  const walletDropdownRef = useRef(null);
  const { isConnected, walletAddress, balance, connect, disconnect, isConnecting, isPhantomInstalled } = usePhantomWallet();

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const handleWalletClick = async () => {
    if (isConnected) {
      setIsWalletDropdownOpen(!isWalletDropdownOpen);
    } else {
      if (!isPhantomInstalled) {
        window.open('https://phantom.app/', '_blank');
        return;
      }
      try {
        await connect();
      } catch (err) {
        console.error('Connection error:', err);
      }
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      setIsWalletDropdownOpen(false);
    } catch (err) {
      console.error('Disconnect error:', err);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (walletDropdownRef.current && !walletDropdownRef.current.contains(event.target)) {
        setIsWalletDropdownOpen(false);
      }
    };

    if (isWalletDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isWalletDropdownOpen]);

  return (
    <header className="fixed top-0 w-full z-50" style={{
      background: 'var(--bg-primary)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '16px 7.6923%',
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img 
          src="/logo.png" 
          alt="GoldDigger Logo" 
          style={{
            width: '40px',
            height: '40px',
            objectFit: 'contain'
          }}
        />
        <span style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-primary)' }}>GoldDigger</span>
      </div>

      {/* Desktop Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="hidden md:flex">
        <a href="#how-it-works" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '18px', transition: 'color 0.3s ease' }}
           onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
           onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
          How It Works
        </a>
        <a href="#privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '18px', transition: 'color 0.3s ease' }}
           onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
           onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
          Privacy
        </a>
        <a href="#technology" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '18px', transition: 'color 0.3s ease' }}
           onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
           onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
          Technology
        </a>
        <div style={{ position: 'relative' }} ref={walletDropdownRef}>
          <button 
            className="btn-primary" 
            onClick={handleWalletClick}
            disabled={isConnecting}
            style={{ gap: '8px', display: 'flex', alignItems: 'center', position: 'relative' }}
          >
            <Wallet size={20} />
            {isConnecting ? 'Connecting...' : isConnected ? (
              <>
                <span>{formatAddress(walletAddress)}</span>
                {balance !== null && (
                  <span style={{ fontSize: '14px', opacity: 0.9 }}>{balance} SOL</span>
                )}
                <ChevronDown size={16} />
              </>
            ) : 'Connect Wallet'}
          </button>
          
          {isConnected && isWalletDropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '8px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '16px',
              minWidth: '200px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              zIndex: 1000
            }}>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Wallet Address
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-primary)', wordBreak: 'break-all' }}>
                  {walletAddress}
                </div>
              </div>
              {balance !== null && (
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Balance
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--brand-primary)' }}>
                    {balance} SOL
                  </div>
                </div>
              )}
              <button
                onClick={handleDisconnect}
                className="btn-secondary"
                style={{ width: '100%', marginTop: '8px' }}
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '80px',
          left: 0,
          right: 0,
          background: 'var(--bg-primary)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '20px 7.6923%',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <a href="#how-it-works" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '18px' }}>How It Works</a>
          <a href="#privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '18px' }}>Privacy</a>
          <a href="#technology" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '18px' }}>Technology</a>
          <button 
            className="btn-primary" 
            style={{ width: '100%', gap: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={handleWalletClick}
            disabled={isConnecting}
          >
            <Wallet size={20} />
            {isConnecting ? 'Connecting...' : isConnected ? (
              <>
                <span>{formatAddress(walletAddress)}</span>
                {balance !== null && <span style={{ fontSize: '14px' }}>{balance} SOL</span>}
              </>
            ) : 'Connect Wallet'}
          </button>
        </div>
      )}
    </header>
  );
};

// HeroSection Component
const HeroSection = () => {
  return (
    <section style={{
      minHeight: '100vh',
      paddingTop: '80px',
      display: 'flex',
      alignItems: 'center',
      background: 'var(--bg-primary)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '0 7.6923%',
        gap: '60px',
        flexWrap: 'wrap'
      }}>
        {/* Left Content */}
        <div style={{ flex: '1', minWidth: '400px', maxWidth: '600px' }}>
          <div style={{
            display: 'inline-block',
            padding: '8px 16px',
            background: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid var(--brand-primary)',
            marginBottom: '24px',
            fontSize: '14px',
            color: 'var(--brand-primary)',
            fontWeight: '500'
          }}>
            STARKNET • ZERO-KNOWLEDGE • REGULATED
          </div>

          <h1 className="display-huge" style={{ marginBottom: '24px' }}>
            Private, Compliant Gold Exposure — On-Chain.
          </h1>

          <p className="body-large" style={{ marginBottom: '40px', color: 'var(--text-secondary)' }}>
            Tokenized Indian Sovereign Gold Bonds with zero-knowledge privacy and institutional-grade compliance. Built on Starknet.
          </p>

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <button className="btn-primary" style={{ gap: '8px' }}>
              Enter App
              <Play size={20} fill="currentColor" />
            </button>
            <button className="btn-secondary" style={{ gap: '8px' }}>
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Trust Indicators */}
          <div style={{
            marginTop: '60px',
            display: 'flex',
            gap: '40px',
            flexWrap: 'wrap'
          }}>
            <div>
              <div className="heading-1" style={{ color: 'var(--brand-primary)' }}>₹2.4Cr+</div>
              <div className="body-muted">Total Value Locked</div>
            </div>
            <div>
              <div className="heading-1" style={{ color: 'var(--brand-primary)' }}>100%</div>
              <div className="body-muted">Regulatory Compliant</div>
            </div>
            <div>
              <div className="heading-1" style={{ color: 'var(--brand-primary)' }}>ZK-Proof</div>
              <div className="body-muted">Privacy First</div>
            </div>
          </div>
        </div>

        {/* Right Video */}
        <div style={{ 
          flex: '1', 
          minWidth: '400px',
          height: '700px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '12px'
            }}
          >
            <source src="/video1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

// HowItWorks Component
const HowItWorks = () => {
  const steps = [
    {
      icon: Shield,
      title: 'Regulated Custody',
      description: 'Indian Sovereign Gold Bonds held in regulated custody by licensed entities. Full compliance with RBI guidelines and KYC/AML standards.'
    },
    {
      icon: Lock,
      title: 'ZK Proofs Generated',
      description: 'Zero-knowledge proofs verify ownership and compliance without revealing sensitive data. Privacy-preserving validation on every transaction.'
    },
    {
      icon: Coins,
      title: 'Starknet Contracts',
      description: 'Tokens deployed on Starknet enable instant settlement, fractional ownership, and DeFi composability while maintaining full privacy.'
    }
  ];

  return (
    <section id="how-it-works" style={{
      padding: '160px 7.6923%',
      background: 'var(--bg-primary)',
      position: 'relative'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
          <h2 className="display-large" style={{ marginBottom: '24px' }}>
            How It Works
          </h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
            Three-layer architecture combining regulatory compliance, cryptographic privacy, and blockchain settlement.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '40px'
        }}>
          {steps.map((step, index) => (
            <div key={index} className="glass-card" style={{
              padding: '40px',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-20px',
                left: '40px',
                width: '60px',
                height: '60px',
                background: 'var(--brand-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000',
                fontSize: '24px',
                fontWeight: '700'
              }}>
                {index + 1}
              </div>

              <div style={{ marginBottom: '20px', marginTop: '20px' }}>
                <step.icon size={40} color="var(--brand-primary)" strokeWidth={1.5} />
              </div>

              <h3 className="heading-2" style={{ marginBottom: '16px' }}>
                {step.title}
              </h3>
              <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Connection Lines */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '60px',
          alignItems: 'center'
        }}>
          <div style={{
            height: '2px',
            width: '100px',
            background: 'linear-gradient(90deg, transparent, var(--brand-primary), transparent)'
          }}></div>
          <div className="body-muted" style={{ fontSize: '14px' }}>SEAMLESS INTEGRATION</div>
          <div style={{
            height: '2px',
            width: '100px',
            background: 'linear-gradient(90deg, transparent, var(--brand-primary), transparent)'
          }}></div>
        </div>
      </div>
    </section>
  );
};

// PrivacySection Component
const PrivacySection = () => {
  const features = [
    {
      icon: EyeOff,
      title: 'Hidden Balances',
      description: 'Your holdings remain private. Only you see your complete portfolio.'
    },
    {
      icon: FileCheck,
      title: 'ZK-Verified Compliance',
      description: 'Prove regulatory compliance without revealing transaction details.'
    },
    {
      icon: UserCheck,
      title: 'Selective Disclosure',
      description: 'Share specific proofs with auditors while keeping other data private.'
    },
    {
      icon: Eye,
      title: 'Transparent Reserves',
      description: 'Public proof-of-reserves without compromising individual privacy.'
    }
  ];

  return (
    <section id="privacy" style={{
      padding: '160px 7.6923%',
      background: 'var(--bg-secondary)',
      position: 'relative'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
          <div style={{
            display: 'inline-block',
            padding: '8px 16px',
            background: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid var(--brand-primary)',
            marginBottom: '24px',
            fontSize: '14px',
            color: 'var(--brand-primary)',
            fontWeight: '500'
          }}>
            ZERO-KNOWLEDGE ARCHITECTURE
          </div>
          <h2 className="display-large" style={{ marginBottom: '24px' }}>
            Privacy Without Blind Trust
          </h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
            Advanced cryptography ensures your financial privacy while maintaining full regulatory compliance. The best of both worlds.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px'
        }}>
          {features.map((feature, index) => (
            <div key={index} style={{
              padding: '40px',
              background: 'rgba(212, 175, 55, 0.03)',
              border: '1px solid var(--border-subtle)',
              transition: 'all 0.4s ease-in-out',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(212, 175, 55, 0.08)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(212, 175, 55, 0.03)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'rgba(212, 175, 55, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px'
              }}>
                <feature.icon size={28} color="var(--brand-primary)" strokeWidth={1.5} />
              </div>
              <h3 className="heading-2" style={{ marginBottom: '12px' }}>
                {feature.title}
              </h3>
              <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ComparisonSection Component
const ComparisonSection = () => {
  const comparisons = [
    {
      category: 'Physical Gold',
      storage: 'Bank Locker Required',
      liquidity: 'Illiquid',
      ownership: 'Full bars only',
      returns: 'Market Price',
      compliance: 'Manual Documentation',
      privacy: 'Public Purchase Records'
    },
    {
      category: 'Sovereign Gold Bonds',
      storage: 'Demat Account',
      liquidity: 'Lock-in Period',
      ownership: 'Minimum 1 gram',
      returns: '2.5% Interest + Market',
      compliance: 'Government Backed',
      privacy: 'Centralized Records'
    },
    {
      category: 'Tokenized SGBs',
      storage: 'Self-Custody Wallet',
      liquidity: 'Instant 24/7',
      ownership: 'Fractional (0.001g)',
      returns: '2.5% Interest + Market',
      compliance: 'ZK-Verified',
      privacy: 'Private by Default',
      highlight: true
    }
  ];

  return (
    <section style={{
      padding: '160px 7.6923%',
      background: 'var(--bg-primary)',
      position: 'relative'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
          <h2 className="display-large" style={{ marginBottom: '24px' }}>
            Sovereign-Backed, Not Speculative
          </h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
            Compare the benefits of tokenized Sovereign Gold Bonds against traditional gold investment options.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px',
          marginBottom: '60px'
        }}>
          {comparisons.map((item, index) => (
            <div key={index} className={item.highlight ? 'glass-card' : ''} style={{
              padding: '40px',
              background: item.highlight ? 'rgba(212, 175, 55, 0.05)' : 'rgba(255, 255, 255, 0.03)',
              border: item.highlight ? '2px solid var(--brand-primary)' : '1px solid var(--border-subtle)',
              position: 'relative'
            }}>
              {item.highlight && (
                <div style={{
                  position: 'absolute',
                  top: '-15px',
                  right: '20px',
                  background: 'var(--brand-primary)',
                  color: '#000',
                  padding: '6px 16px',
                  fontSize: '12px',
                  fontWeight: '600',
                  letterSpacing: '0.5px'
                }}>
                  RECOMMENDED
                </div>
              )}

              <h3 className="heading-1" style={{ 
                marginBottom: '32px',
                color: item.highlight ? 'var(--brand-primary)' : 'var(--text-primary)'
              }}>
                {item.category}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <div className="body-muted" style={{ marginBottom: '8px', fontSize: '14px' }}>Storage</div>
                  <div className="body-medium">{item.storage}</div>
                </div>
                <div>
                  <div className="body-muted" style={{ marginBottom: '8px', fontSize: '14px' }}>Liquidity</div>
                  <div className="body-medium">{item.liquidity}</div>
                </div>
                <div>
                  <div className="body-muted" style={{ marginBottom: '8px', fontSize: '14px' }}>Ownership</div>
                  <div className="body-medium">{item.ownership}</div>
                </div>
                <div>
                  <div className="body-muted" style={{ marginBottom: '8px', fontSize: '14px' }}>Returns</div>
                  <div className="body-medium">{item.returns}</div>
                </div>
                <div>
                  <div className="body-muted" style={{ marginBottom: '8px', fontSize: '14px' }}>Compliance</div>
                  <div className="body-medium">{item.compliance}</div>
                </div>
                <div>
                  <div className="body-muted" style={{ marginBottom: '8px', fontSize: '14px' }}>Privacy</div>
                  <div className="body-medium">{item.privacy}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// TechnologySection Component
const TechnologySection = () => {
  const technologies = [
    {
      icon: Cpu,
      name: 'Starknet',
      description: 'Layer-2 scaling with native ZK-STARK proofs for maximum efficiency and privacy.'
    },
    {
      icon: Zap,
      name: 'Cairo',
      description: 'Provable computation language enabling verifiable smart contracts and zero-knowledge circuits.'
    },
    {
      icon: Shield,
      name: 'Zero-Knowledge',
      description: 'Cryptographic proofs that validate compliance without revealing sensitive transaction data.'
    },
    {
      icon: Building2,
      name: 'Regulated Custody',
      description: 'Licensed custodians holding physical SGBs with regular audits and insurance coverage.'
    }
  ];

  return (
    <section id="technology" style={{
      padding: '160px 7.6923%',
      background: 'var(--bg-secondary)',
      position: 'relative'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
          <div style={{
            display: 'inline-block',
            padding: '8px 16px',
            background: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid var(--brand-primary)',
            marginBottom: '24px',
            fontSize: '14px',
            color: 'var(--brand-primary)',
            fontWeight: '500'
          }}>
            ENTERPRISE INFRASTRUCTURE
          </div>
          <h2 className="display-large" style={{ marginBottom: '24px' }}>
            Built for Institutions
          </h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
            Production-grade technology stack combining cutting-edge cryptography with regulatory compliance.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '40px',
          marginBottom: '80px'
        }}>
          {technologies.map((tech, index) => (
            <div key={index} className="glass-card" style={{
              padding: '40px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'rgba(212, 175, 55, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                border: '1px solid var(--brand-primary)'
              }}>
                <tech.icon size={36} color="var(--brand-primary)" strokeWidth={1.5} />
              </div>
              <h3 className="heading-2" style={{ marginBottom: '12px' }}>
                {tech.name}
              </h3>
              <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                {tech.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div style={{
          padding: '60px',
          background: 'rgba(212, 175, 55, 0.03)',
          border: '1px solid var(--border-subtle)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          textAlign: 'center'
        }}>
          <div>
            <div className="display-medium" style={{ color: 'var(--brand-primary)', marginBottom: '8px' }}>99.9%</div>
            <div className="body-muted">Uptime SLA</div>
          </div>
          <div>
            <div className="display-medium" style={{ color: 'var(--brand-primary)', marginBottom: '8px' }}>&lt;2s</div>
            <div className="body-muted">Settlement Time</div>
          </div>
          <div>
            <div className="display-medium" style={{ color: 'var(--brand-primary)', marginBottom: '8px' }}>$5M+</div>
            <div className="body-muted">Insurance Coverage</div>
          </div>
          <div>
            <div className="display-medium" style={{ color: 'var(--brand-primary)', marginBottom: '8px' }}>24/7</div>
            <div className="body-muted">Monitoring</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// WaitlistSection Component
const WaitlistSection = () => {
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

// Footer Component
const Footer = () => {
  return (
    <footer style={{
      padding: '80px 7.6923% 40px',
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-subtle)'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Top Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '60px',
          marginBottom: '60px'
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img 
                src="/logo.png" 
                alt="GoldDigger Logo" 
                style={{
                  width: '40px',
                  height: '40px',
                  objectFit: 'contain'
                }}
              />
              <span style={{ fontSize: '20px', fontWeight: '600' }}>GoldDigger</span>
            </div>
            <p className="body-medium" style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Tokenized Indian Sovereign Gold Bonds on Starknet with zero-knowledge privacy.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#" style={{ color: 'var(--text-muted)', transition: 'color 0.3s ease' }}
                 onMouseEnter={(e) => e.target.style.color = 'var(--brand-primary)'}
                 onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                <Twitter size={24} />
              </a>
              <a href="#" style={{ color: 'var(--text-muted)', transition: 'color 0.3s ease' }}
                 onMouseEnter={(e) => e.target.style.color = 'var(--brand-primary)'}
                 onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                <Github size={24} />
              </a>
              <a href="#" style={{ color: 'var(--text-muted)', transition: 'color 0.3s ease' }}
                 onMouseEnter={(e) => e.target.style.color = 'var(--brand-primary)'}
                 onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                <FileText size={24} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="heading-2" style={{ marginBottom: '20px' }}>Product</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="#how-it-works" className="body-medium" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s ease' }}
                 onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                 onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                How It Works
              </a>
              <a href="#privacy" className="body-medium" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s ease' }}
                 onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                 onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                Privacy Features
              </a>
              <a href="#technology" className="body-medium" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s ease' }}
                 onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                 onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                Technology
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="heading-2" style={{ marginBottom: '20px' }}>Resources</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="#" className="body-medium" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s ease' }}
                 onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                 onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                Documentation
              </a>
              <a href="#" className="body-medium" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s ease' }}
                 onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                 onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                Whitepaper
              </a>
              <a href="#" className="body-medium" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s ease' }}
                 onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                 onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                Security Audit
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="heading-2" style={{ marginBottom: '20px' }}>Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="#" className="body-medium" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s ease' }}
                 onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                 onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                Privacy Policy
              </a>
              <a href="#" className="body-medium" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s ease' }}
                 onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                 onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                Terms of Service
              </a>
              <a href="#" className="body-medium" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s ease' }}
                 onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                 onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                Compliance
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{
          padding: '32px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '40px'
        }}>
          <p className="body-medium" style={{ color: 'var(--text-muted)', textAlign: 'center' }}>
            <strong style={{ color: 'var(--brand-primary)' }}>Disclaimer:</strong> This is a prototype developed for research and hackathon purposes as part of the Bitcoin & Privacy Hackathon on Starknet. Not financial advice. Tokenized securities are subject to regulatory compliance in your jurisdiction.
          </p>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '32px',
          borderTop: '1px solid var(--border-subtle)',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <p className="body-medium" style={{ color: 'var(--text-muted)' }}>
            © 2025 GoldDigger. Built on Starknet.
          </p>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <span className="body-medium" style={{ color: 'var(--text-muted)' }}>Powered by:</span>
            <span style={{ color: 'var(--brand-primary)', fontWeight: '600' }}>Starknet</span>
            <span style={{ color: 'var(--brand-primary)', fontWeight: '600' }}>Cairo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main LandingPage Component
export const LandingPage = () => {
  return (
    <div className="dark-container">
      <Header />
      <HeroSection />
      <HowItWorks />
      <PrivacySection />
      <ComparisonSection />
      <TechnologySection />
      <WaitlistSection />
      <Footer />
    </div>
  );
};
