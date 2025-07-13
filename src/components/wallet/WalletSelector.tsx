import React, { useState } from 'react';
import { ChevronDown, Wallet, Check, Copy } from 'lucide-react';
import type { Wallet as WalletType } from '../../lib/types';
import { formatAddress } from '../../lib/utils';

interface WalletSelectorProps {
  wallets: WalletType[];
  selectedWallet: WalletType;
  onWalletChange: (wallet: WalletType) => void;
  dropdownClassName?: string;
  iconOnly?: boolean;
}

export const WalletSelector: React.FC<WalletSelectorProps> = ({
  wallets,
  selectedWallet,
  onWalletChange,
  dropdownClassName = '',
  iconOnly = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (address: string, walletId: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(walletId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="relative">
      {iconOnly ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full bg-slate-800/70 hover:bg-slate-700/80 border border-slate-700/60 shadow-lg transition-all duration-200 flex items-center justify-center"
          aria-label="Select wallet"
        >
          <Wallet className="h-6 w-6 text-blue-300" />
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-3 px-4 py-3 text-sm bg-gradient-to-r from-secondary/80 to-secondary/60 backdrop-blur-sm rounded-xl hover:from-secondary hover:to-secondary/80 transition-all duration-300 hover:scale-105 hover:shadow-lg group border border-border min-w-[200px]"
        >
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
            <Wallet className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
              {selectedWallet.name}
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              {formatAddress(selectedWallet.address)}
            </div>
          </div>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      )}

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          {/* Dropdown */}
          <div className={`absolute top-full right-0 mt-2 w-80 max-w-xs bg-slate-900/95 border border-slate-700/70 rounded-2xl shadow-2xl z-50 overflow-hidden ${dropdownClassName}`} style={{minWidth: '240px'}}>
            <div className="p-2">
              <div className="text-xs font-medium text-slate-400 px-3 py-2 border-b border-slate-700 mb-2">
                Select Wallet
              </div>
              {wallets.map((wallet, index) => (
                <div
                  key={wallet.id}
                  className={`relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                    wallet.id === selectedWallet.id ? 'bg-blue-900/30 border border-blue-500/30' : 'hover:bg-slate-800/60'
                  }`}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animation: 'slideInFromTop 0.3s ease-out forwards'
                  }}
                >
                  <button
                    onClick={() => {
                      onWalletChange(wallet);
                      setIsOpen(false);
                    }}
                    className="w-full text-left p-4 transition-all duration-300 group/item"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg transition-all duration-300 ${
                          wallet.id === selectedWallet.id 
                            ? 'bg-blue-500/20 text-blue-300' 
                            : 'bg-slate-800/50 text-slate-400 group-hover/item:bg-blue-900/20 group-hover/item:text-blue-300'
                        }`}>
                          <Wallet className="h-4 w-4" />
                        </div>
                        <div>
                          <div className={`font-medium transition-colors duration-300 ${
                            wallet.id === selectedWallet.id ? 'text-blue-300' : 'text-white'
                          }`}>
                            {wallet.name}
                          </div>
                          <div className="text-xs text-slate-400 font-mono mt-1">
                            {formatAddress(wallet.address)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(wallet.address, wallet.id);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.stopPropagation();
                              handleCopy(wallet.address, wallet.id);
                            }
                          }}
                          className="p-2 rounded-lg hover:bg-blue-900/30 transition-all duration-300 hover:scale-110 cursor-pointer"
                        >
                          {copiedId === wallet.id ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <Copy className="h-3 w-3 text-slate-400" />
                          )}
                        </span>
                        {wallet.id === selectedWallet.id && (
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                        )}
                      </div>
                    </div>
                  </button>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      
      <style>{`
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
