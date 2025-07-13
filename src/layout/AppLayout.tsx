import React from 'react';
import { Outlet } from 'react-router-dom';
import { WalletSelector } from '../components/wallet/WalletSelector';
import { MainNav } from './MainNav';
import type { Wallet as WalletType } from '../lib/types';

interface AppLayoutProps {
  wallets: WalletType[];
  selectedWallet: WalletType;
  onWalletChange: (wallet: WalletType) => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  wallets,
  selectedWallet,
  onWalletChange,
}) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-40 backdrop-blur-xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/80 rounded-b-3xl shadow-2xl px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-tight drop-shadow">LazorKit</span>
          <WalletSelector
            wallets={wallets}
            selectedWallet={selectedWallet}
            onWalletChange={onWalletChange}
            dropdownClassName="right-0 left-auto mt-2 w-80 max-w-xs bg-slate-900/95 border border-slate-700/70 rounded-2xl shadow-2xl z-50 overflow-hidden"
            iconOnly
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20 pt-24 px-4 py-6">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <MainNav />
    </div>
  );
}; 