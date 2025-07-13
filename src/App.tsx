import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import { AppLayout } from './layout/AppLayout';
import Balance from './pages/Balance';
import Devices from './pages/Devices';
import { Transfer } from './pages/Transfer';
import Settings from './pages/Settings';
import type { Wallet } from './lib/types';

// Mock data
const mockWallets: Wallet[] = [
  {
    id: '1',
    address: '0x1234567890abcdef1234567890abcdef12345678',
    name: 'Main Wallet',
    balance: 1.25,
    tokens: [
      {
        id: 'sol',
        name: 'Solana',
        symbol: 'SOL',
        amount: 1.25,
        usdValue: 125.50,
        decimals: 9,
      },
      {
        id: 'usdc',
        name: 'USD Coin',
        symbol: 'USDC',
        amount: 500.00,
        usdValue: 500.00,
        decimals: 6,
      },
      {
        id: 'bonk',
        name: 'Bonk',
        symbol: 'BONK',
        amount: 1000000,
        usdValue: 25.00,
        decimals: 5,
      },
      {
        id: 'btc',
        name: 'Bitcoin',
        symbol: 'BTC',
        amount: 0.00234567,
        usdValue: 156.78,
        decimals: 8,
      },
      {
        id: 'eth',
        name: 'Ethereum',
        symbol: 'ETH',
        amount: 0.12345678,
        usdValue: 432.10,
        decimals: 18,
      },
      {
        id: 'doge',
        name: 'Dogecoin',
        symbol: 'DOGE',
        amount: 1234.56789,
        usdValue: 98.76,
        decimals: 8,
      },
      {
        id: 'ada',
        name: 'Cardano',
        symbol: 'ADA',
        amount: 456.789012,
        usdValue: 182.71,
        decimals: 6,
      },
      {
        id: 'matic',
        name: 'Polygon',
        symbol: 'MATIC',
        amount: 234.567890,
        usdValue: 164.20,
        decimals: 18,
      },
      {
        id: 'link',
        name: 'Chainlink',
        symbol: 'LINK',
        amount: 12.345678,
        usdValue: 197.53,
        decimals: 18,
      },
      {
        id: 'avax',
        name: 'Avalanche',
        symbol: 'AVAX',
        amount: 5.678901,
        usdValue: 170.37,
        decimals: 9,
      },
      {
        id: 'dot',
        name: 'Polkadot',
        symbol: 'DOT',
        amount: 34.567890,
        usdValue: 241.75,
        decimals: 10,
      },
      {
        id: 'shib',
        name: 'Shiba Inu',
        symbol: 'SHIB',
        amount: 12345678.90,
        usdValue: 123.45,
        decimals: 18,
      }
    ],
  },
  {
    id: '2',
    address: '0xabcdef1234567890abcdef1234567890abcdef12',
    name: 'Trading Wallet',
    balance: 0.5,
    tokens: [
      {
        id: 'sol',
        name: 'Solana',
        symbol: 'SOL',
        amount: 0.5,
        usdValue: 50.20,
        decimals: 9,
      },
      {
        id: 'btc',
        name: 'Bitcoin',
        symbol: 'BTC',
        amount: 0.00123456,
        usdValue: 82.50,
        decimals: 8,
      },
      {
        id: 'eth',
        name: 'Ethereum',
        symbol: 'ETH',
        amount: 0.05,
        usdValue: 175.00,
        decimals: 18,
      },
      {
        id: 'usdc',
        name: 'USD Coin',
        symbol: 'USDC',
        amount: 250.00,
        usdValue: 250.00,
        decimals: 6,
      },
      {
        id: 'bonk',
        name: 'Bonk',
        symbol: 'BONK',
        amount: 500000,
        usdValue: 12.50,
        decimals: 5,
      },
      {
        id: 'doge',
        name: 'Dogecoin',
        symbol: 'DOGE',
        amount: 500.00,
        usdValue: 40.00,
        decimals: 8,
      },
      {
        id: 'ada',
        name: 'Cardano',
        symbol: 'ADA',
        amount: 200.00,
        usdValue: 80.00,
        decimals: 6,
      },
      {
        id: 'matic',
        name: 'Polygon',
        symbol: 'MATIC',
        amount: 100.00,
        usdValue: 70.00,
        decimals: 18,
      },
      {
        id: 'link',
        name: 'Chainlink',
        symbol: 'LINK',
        amount: 5.00,
        usdValue: 80.00,
        decimals: 18,
      },
      {
        id: 'avax',
        name: 'Avalanche',
        symbol: 'AVAX',
        amount: 2.50,
        usdValue: 75.00,
        decimals: 9,
      },
      {
        id: 'dot',
        name: 'Polkadot',
        symbol: 'DOT',
        amount: 15.00,
        usdValue: 105.00,
        decimals: 10,
      },
      {
        id: 'shib',
        name: 'Shiba Inu',
        symbol: 'SHIB',
        amount: 5000000,
        usdValue: 50.00,
        decimals: 18,
      }
    ],
  },
  {
    id: '3',
    address: '0x9876543210fedcba9876543210fedcba98765432',
    name: 'Savings Wallet',
    balance: 2.75,
    tokens: [
      {
        id: 'sol',
        name: 'Solana',
        symbol: 'SOL',
        amount: 2.75,
        usdValue: 276.10,
        decimals: 9,
      },
      {
        id: 'usdc',
        name: 'USD Coin',
        symbol: 'USDC',
        amount: 1000.00,
        usdValue: 1000.00,
        decimals: 6,
      },
      {
        id: 'btc',
        name: 'Bitcoin',
        symbol: 'BTC',
        amount: 0.005,
        usdValue: 334.25,
        decimals: 8,
      },
      {
        id: 'eth',
        name: 'Ethereum',
        symbol: 'ETH',
        amount: 0.25,
        usdValue: 875.00,
        decimals: 18,
      },
      {
        id: 'doge',
        name: 'Dogecoin',
        symbol: 'DOGE',
        amount: 2000.00,
        usdValue: 160.00,
        decimals: 8,
      },
      {
        id: 'ada',
        name: 'Cardano',
        symbol: 'ADA',
        amount: 800.00,
        usdValue: 320.00,
        decimals: 6,
      },
      {
        id: 'matic',
        name: 'Polygon',
        symbol: 'MATIC',
        amount: 400.00,
        usdValue: 280.00,
        decimals: 18,
      },
      {
        id: 'link',
        name: 'Chainlink',
        symbol: 'LINK',
        amount: 20.00,
        usdValue: 320.00,
        decimals: 18,
      },
      {
        id: 'avax',
        name: 'Avalanche',
        symbol: 'AVAX',
        amount: 10.00,
        usdValue: 300.00,
        decimals: 9,
      },
      {
        id: 'dot',
        name: 'Polkadot',
        symbol: 'DOT',
        amount: 50.00,
        usdValue: 350.00,
        decimals: 10,
      },
      {
        id: 'bonk',
        name: 'Bonk',
        symbol: 'BONK',
        amount: 2000000,
        usdValue: 50.00,
        decimals: 5,
      },
      {
        id: 'shib',
        name: 'Shiba Inu',
        symbol: 'SHIB',
        amount: 20000000,
        usdValue: 200.00,
        decimals: 18,
      }
    ],
  },
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode] = useState(true); // keep for dark mode effect
  const [selectedWallet, setSelectedWallet] = useState(mockWallets[0]);
  const [wallets, setWallets] = useState(mockWallets);

  // Apply dark mode class to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleWalletChange = (wallet: Wallet) => {
    setSelectedWallet(wallet);
  };

  const handleUpdateWalletName = (name: string) => {
    setWallets(prev => prev.map(wallet => 
      wallet.id === selectedWallet.id 
        ? { ...wallet, name }
        : wallet
    ));
    setSelectedWallet(prev => ({ ...prev, name }));
  };

  const handleTransfer = (data: { recipientAddress: string; tokenId: string; amount: number }) => {
    // Mock transfer - in real app, this would call the SDK
    console.log('Transfer:', data);
    // Đã xoá alert ở đây để không hiện alert mặc định nữa
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout
              wallets={wallets}
              selectedWallet={selectedWallet}
              onWalletChange={handleWalletChange}
            />
          }
        >
          <Route index element={<Navigate to="/balance" replace />} />
          <Route
            path="/balance"
            element={<Balance wallet={selectedWallet} />}
          />
          <Route
            path="/devices"
            element={
              <Devices />
            }
          />
          <Route
            path="/transfer"
            element={
              <Transfer
                wallet={selectedWallet}
                onTransfer={handleTransfer}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <Settings
                walletName={selectedWallet.name}
                onUpdateWalletName={handleUpdateWalletName}
                onLogout={handleLogout}
              />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
