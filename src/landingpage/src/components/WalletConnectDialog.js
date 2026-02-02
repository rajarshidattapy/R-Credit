import React from 'react';
import { usePhantomWallet } from '../hooks/usePhantomWallet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Wallet } from 'lucide-react';

export const WalletConnectDialog = ({ open, onOpenChange }) => {
  const { connect, disconnect, isConnected, isConnecting, error, isPhantomInstalled, walletAddress } = usePhantomWallet();

  const handleConnect = async () => {
    try {
      await connect();
      onOpenChange(false);
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      onOpenChange(false);
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
        color: 'var(--text-primary)'
      }}>
        <DialogHeader>
          <DialogTitle style={{ color: 'var(--text-primary)' }}>Connect Wallet</DialogTitle>
          <DialogDescription style={{ color: 'var(--text-secondary)' }}>
            Connect your wallet to get started
          </DialogDescription>
        </DialogHeader>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
          {isConnected ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                padding: '16px',
                background: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid var(--brand-primary)',
                borderRadius: '8px'
              }}>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  Connected
                </div>
                <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--brand-primary)' }}>
                  {formatAddress(walletAddress)}
                </div>
              </div>
              <button
                onClick={handleDisconnect}
                className="btn-secondary"
                style={{ width: '100%' }}
              >
                Disconnect
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {!isPhantomInstalled ? (
                <div style={{
                  padding: '24px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <Wallet size={48} style={{ margin: '0 auto 16px', color: 'var(--text-muted)' }} />
                  <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-primary)' }}>
                    Phantom Wallet Not Found
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                    Please install Phantom wallet to continue
                  </div>
                  <a
                    href="https://phantom.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ display: 'inline-block', textDecoration: 'none' }}
                  >
                    Install Phantom
                  </a>
                </div>
              ) : (
                <button
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="btn-primary"
                  style={{ width: '100%', gap: '12px' }}
                >
                  <Wallet size={20} />
                  {isConnecting ? 'Connecting...' : 'Connect Phantom Wallet'}
                </button>
              )}
              
              {error && (
                <div style={{
                  padding: '12px',
                  background: 'rgba(255, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 0, 0, 0.3)',
                  borderRadius: '8px',
                  color: '#ff6b6b',
                  fontSize: '14px'
                }}>
                  {error}
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
