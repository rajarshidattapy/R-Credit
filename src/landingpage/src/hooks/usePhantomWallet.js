import { useState, useEffect } from 'react';

export const usePhantomWallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  // Check if Phantom wallet is installed
  const isPhantomInstalled = () => {
    if (typeof window !== 'undefined') {
      return window.phantom?.solana || window.solana?.isPhantom;
    }
    return false;
  };

  // Get Phantom provider
  const getProvider = () => {
    if (typeof window !== 'undefined') {
      return window.phantom?.solana || window.solana;
    }
    return null;
  };

  // Connect to Phantom wallet
  const connect = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      if (!isPhantomInstalled()) {
        throw new Error('Phantom wallet is not installed. Please install it from https://phantom.app/');
      }

      const provider = getProvider();
      if (!provider) {
        throw new Error('Phantom wallet provider not found');
      }

      // Request connection
      const response = await provider.connect();
      
      if (response.publicKey) {
        const address = response.publicKey.toString();
        setWalletAddress(address);
        setIsConnected(true);
        setIsConnecting(false);
        
        // Fetch balance
        await fetchBalance(response.publicKey);
        return response;
      }
    } catch (err) {
      setError(err.message);
      setIsConnecting(false);
      throw err;
    }
  };

  // Fetch wallet balance
  const fetchBalance = async (publicKey) => {
    try {
      if (!publicKey) return;
      
      // Convert PublicKey to string if it's an object
      const address = typeof publicKey === 'string' ? publicKey : publicKey.toString();
      
      // Fetch balance from Solana RPC
      const response = await fetch('https://api.testnet.solana.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getBalance',
          params: [address],
        }),
      });
      
      const data = await response.json();
      if (data.result && data.result.value !== undefined) {
        // Convert lamports to SOL (1 SOL = 1,000,000,000 lamports)
        const solBalance = data.result.value / 1000000000;
        setBalance(solBalance.toFixed(4));
      }
    } catch (err) {
      console.error('Error fetching balance:', err);
      setBalance(null);
    }
  };

  // Disconnect from Phantom wallet
  const disconnect = async () => {
    try {
      const provider = getProvider();
      if (provider && provider.disconnect) {
        await provider.disconnect();
      }
      setWalletAddress(null);
      setIsConnected(false);
      setBalance(null);
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Check if already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (isPhantomInstalled()) {
        const provider = getProvider();
        try {
          // Check if already connected
          if (provider.isConnected && provider.publicKey) {
            const address = provider.publicKey.toString();
            setWalletAddress(address);
            setIsConnected(true);
            await fetchBalance(provider.publicKey);
          }
        } catch (err) {
          // Not connected, ignore
        }
      }
    };

    checkConnection();

    // Listen for account changes
    const provider = getProvider();
    if (provider) {
      provider.on('accountChanged', async (publicKey) => {
        if (publicKey) {
          const address = publicKey.toString();
          setWalletAddress(address);
          setIsConnected(true);
          await fetchBalance(publicKey);
        } else {
          setWalletAddress(null);
          setIsConnected(false);
          setBalance(null);
        }
      });

      provider.on('disconnect', () => {
        setWalletAddress(null);
        setIsConnected(false);
        setBalance(null);
      });
    }

    return () => {
      if (provider) {
        provider.removeAllListeners?.();
      }
    };
  }, []);

  return {
    walletAddress,
    isConnected,
    isConnecting,
    balance,
    error,
    connect,
    disconnect,
    isPhantomInstalled: isPhantomInstalled()
  };
};
