import React, { useState } from 'react';
import { Send, ArrowRight, Wallet, CheckCircle, AlertCircle, Copy, Shield, ChevronDown, X, Scan } from 'lucide-react';

interface Token {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  usdValue: number;
}

interface WalletType {
  address: string;
  tokens: Token[];
}

interface TransferProps {
  wallet: WalletType;
  onTransfer: (data: { recipientAddress: string; tokenId: string; amount: number }) => void;
}

// Simple Dialog Component
interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: 'success' | 'error' | null;
}
const SimpleDialog: React.FC<SimpleDialogProps> = ({ open, onClose, title, message, type }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-slate-800 border border-slate-600 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>
        <p className="text-slate-300 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export const Transfer: React.FC<TransferProps> = ({ wallet, onTransfer }) => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [selectedTokenId, setSelectedTokenId] = useState(wallet.tokens[0]?.id || '');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showTokenDropdown, setShowTokenDropdown] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogStatus, setDialogStatus] = useState<'success' | 'error' | null>(null);
  const [dialogMessage, setDialogMessage] = useState('');

  const selectedToken = wallet.tokens.find(token => token.id === selectedTokenId);

  const handleTransfer = () => {
    if (!recipientAddress.trim() || !selectedTokenId || !amount) return;
    setIsLoading(true);
    setTimeout(() => {
      try {
        onTransfer({
          recipientAddress: recipientAddress.trim(),
          tokenId: selectedTokenId,
          amount: parseFloat(amount),
        });
        setDialogStatus('success');
        setDialogMessage('Transfer completed successfully!');
      } catch {
        setDialogStatus('error');
        setDialogMessage('Transfer failed. Please try again.');
      }
      setDialogOpen(true);
      setRecipientAddress('');
      setAmount('');
      setIsLoading(false);
      setShowPreview(false);
    }, 1800);
  };

  const handlePreview = () => {
    if (isValid && !hasInsufficientBalance) {
      setShowPreview(true);
    }
  };

  const isValid = recipientAddress.trim() && selectedTokenId && amount && parseFloat(amount) > 0;
  const hasInsufficientBalance = selectedToken && parseFloat(amount) > selectedToken.amount;

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const setPercentage = (percentage: number) => {
    if (selectedToken) {
      const newAmount = (selectedToken.amount * percentage / 100).toFixed(6);
      setAmount(newAmount);
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Dialog for transfer result */}
      <SimpleDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={dialogStatus === 'success' ? 'Transfer Successful' : 'Transfer Failed'}
        message={dialogMessage}
        type={dialogStatus}
      />

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/3 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-green-500/3 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20">
            <Send className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
              Send Tokens
            </h1>
            <p className="text-slate-400 text-sm">Transfer tokens securely to any wallet</p>
          </div>
        </div>

        {/* Main Transfer Card */}
        <div className="backdrop-blur-xl bg-slate-800/30 border border-slate-700/50 rounded-3xl p-6 space-y-6 hover:bg-slate-800/40 transition-all duration-300">
          {/* Recipient Address */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-300">Recipient Address</label>
            <div className="relative">
              <input
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="Enter wallet address (0x...)"
                className="w-full h-14 px-4 pr-24 bg-slate-900/60 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigator.clipboard.readText().then(setRecipientAddress)}
                  className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                  title="Paste"
                >
                  <Copy className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  type="button"
                  className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                  title="Scan QR"
                >
                  <Scan className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
            {recipientAddress && (
              <div className="flex items-center gap-2 text-sm text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span>Valid address format</span>
              </div>
            )}
          </div>

          {/* Token Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-300">Select Token</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowTokenDropdown(!showTokenDropdown)}
                className="w-full h-14 px-4 bg-slate-900/60 border border-slate-700/50 rounded-xl text-white focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 flex items-center justify-between"
              >
                {selectedToken ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full flex items-center justify-center font-bold text-blue-300">
                      {selectedToken.symbol.charAt(0)}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">{selectedToken.name}</div>
                      <div className="text-sm text-slate-400">Balance: {selectedToken.amount.toFixed(4)} {selectedToken.symbol}</div>
                    </div>
                  </div>
                ) : (
                  <span className="text-slate-400">Select a token</span>
                )}
                <ChevronDown className="w-5 h-5 text-slate-400" />
              </button>

              {showTokenDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 border border-slate-700/50 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto">
                  {wallet.tokens.map((token) => (
                    <button
                      key={token.id}
                      type="button"
                      onClick={() => {
                        setSelectedTokenId(token.id);
                        setShowTokenDropdown(false);
                      }}
                      className="w-full p-4 hover:bg-slate-800/50 transition-colors flex items-center gap-3 border-b border-slate-700/30 last:border-b-0"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full flex items-center justify-center font-bold text-blue-300">
                        {token.symbol.charAt(0)}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-white">{token.name}</div>
                        <div className="text-sm text-slate-400">{token.symbol}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-white">{token.amount.toFixed(4)}</div>
                        <div className="text-sm text-slate-400">${token.usdValue.toFixed(2)}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Amount Input - Fixed spacing */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-300">Amount</label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full h-14 px-4 pr-32 bg-slate-900/60 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-right text-lg"
                step="0.000001"
                min="0"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-3">
                <span className="text-sm text-slate-400 font-medium min-w-[50px] text-left">
                  {selectedToken?.symbol || 'TOKEN'}
                </span>
                <button
                  type="button"
                  onClick={() => selectedToken && setAmount(selectedToken.amount.toString())}
                  className="px-3 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors font-medium"
                >
                  MAX
                </button>
              </div>
            </div>

            {/* Amount Info */}
            {selectedToken && (
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Available:</span>
                  <span className="text-white font-medium">{selectedToken.amount.toFixed(4)} {selectedToken.symbol}</span>
                </div>
                {amount && (
                  <div className="text-slate-400">
                    ≈ ${(parseFloat(amount) * (selectedToken.usdValue / selectedToken.amount)).toFixed(2)}
                  </div>
                )}
              </div>
            )}

            {hasInsufficientBalance && (
              <div className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle className="w-4 h-4" />
                <span>Insufficient balance</span>
              </div>
            )}
          </div>

          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-4 gap-3">
            {[25, 50, 75, 100].map((percentage) => (
              <button
                key={percentage}
                type="button"
                onClick={() => setPercentage(percentage)}
                className="h-10 bg-slate-700/50 hover:bg-slate-700/70 border border-slate-600/50 rounded-lg transition-all duration-300 hover:scale-105 text-sm font-medium text-slate-300"
              >
                {percentage}%
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handlePreview}
              disabled={!isValid || hasInsufficientBalance}
              className="flex-1 h-14 bg-slate-700/50 hover:bg-slate-700/70 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-600/50 rounded-2xl transition-all duration-300 hover:scale-105 text-slate-300 font-semibold flex items-center justify-center px-3 shadow-md whitespace-nowrap"
            >
              Preview Transfer
            </button>
            <button
              type="button"
              onClick={handleTransfer}
              disabled={!isValid || hasInsufficientBalance || isLoading}
              className="flex-1 h-14 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl transition-all duration-300 hover:scale-105 text-white font-semibold flex items-center justify-center px-3 shadow-md whitespace-nowrap"
            >
              {isLoading ? (
                <span>Processing...</span>
              ) : (
                <span>Send Now</span>
              )}
            </button>
          </div>
        </div>

        {/* Transfer Preview */}
        {showPreview && isValid && selectedToken && (
          <div className="backdrop-blur-xl bg-slate-800/30 border border-slate-700/50 rounded-3xl p-6 space-y-4 hover:bg-slate-800/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-full">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Transfer Preview</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-slate-700/50 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-4">
              {/* From Section */}
              <div className="flex items-center justify-between p-4 bg-slate-900/60 rounded-xl border border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-full">
                    <Wallet className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">From</div>
                    <div className="font-mono text-white">{formatAddress(wallet.address)}</div>
                  </div>
                </div>
                <div className="text-sm text-slate-400">Your Wallet</div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center">
                <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full">
                  <ArrowRight className="w-6 h-6 text-blue-400" />
                </div>
              </div>

              {/* To Section */}
              <div className="flex items-center justify-between p-4 bg-slate-900/60 rounded-xl border border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-full">
                    <Send className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">To</div>
                    <div className="font-mono text-white">{formatAddress(recipientAddress)}</div>
                  </div>
                </div>
                <div className="text-sm text-slate-400">Recipient</div>
              </div>

              {/* Transfer Details */}
              <div className="space-y-3 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Token</span>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full flex items-center justify-center font-bold text-xs text-blue-300">
                      {selectedToken.symbol.charAt(0)}
                    </div>
                    <span className="text-white font-medium">{selectedToken.name}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Amount</span>
                  <span className="text-white font-bold text-lg">{amount} {selectedToken.symbol}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">USD Value</span>
                  <span className="text-green-400 font-medium">
                    ${(parseFloat(amount) * (selectedToken.usdValue / selectedToken.amount)).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Network Fee</span>
                  <span className="text-white font-medium">~$0.01</span>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="flex items-center gap-3 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
              <Shield className="w-5 h-5 text-green-400 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium text-green-400">Transaction Ready</div>
                <div className="text-xs text-slate-400">Review details carefully before confirming</div>
              </div>
            </div>

            {/* Final Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="flex-1 h-14 bg-slate-700/50 hover:bg-slate-700/70 border border-slate-600/50 rounded-2xl transition-all duration-300 hover:scale-105 text-slate-300 font-semibold flex items-center justify-center px-3 shadow-md whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleTransfer}
                disabled={isLoading}
                className="flex-1 h-14 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl transition-all duration-300 hover:scale-105 text-white font-semibold flex items-center justify-center px-3 shadow-md whitespace-nowrap"
              >
                {isLoading ? (
                  <span>Sending...</span>
                ) : (
                  <span>Confirm Transfer</span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Test component with mock data
export default function TransferPageWrapper() {
  const mockWallet = {
    address: '0x1234567890abcdef1234567890abcdef12345678',
    tokens: [
      { id: '1', name: 'Ethereum', symbol: 'ETH', amount: 10, usdValue: 30000 },
      { id: '2', name: 'Tether', symbol: 'USDT', amount: 1000, usdValue: 1000 },
      { id: '3', name: 'Binance Coin', symbol: 'BNB', amount: 25, usdValue: 15000 },
      { id: '4', name: 'Cardano', symbol: 'ADA', amount: 500, usdValue: 200 },
    ],
  };
  const handleTransfer = () => {};
  return <Transfer wallet={mockWallet} onTransfer={handleTransfer} />;
}
