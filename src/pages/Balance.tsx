import { useState, useEffect } from 'react';
import { Copy, Eye, EyeOff, ArrowDownLeft, ArrowUpRight, Plus, Repeat, Check, Wallet as WalletIcon, TrendingUp, DollarSign, Coins, ExternalLink, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import type { Wallet, Token } from '../lib/types';

// Mock recent transactions with more realistic data
const mockTxs = [
  { 
    id: '1', 
    type: 'send', 
    token: 'SOL', 
    amount: -0.5, 
    to: '9xabc1234567890abcdef1234567890abcdef12', 
    date: '2025-07-12', 
    time: '14:23:45',
    status: 'success', 
    usdValue: -50.20,
    txHash: 'abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567',
    fee: 0.000005
  },
  { 
    id: '2', 
    type: 'receive', 
    token: 'USDC', 
    amount: 100, 
    from: '5xdef5678901234567890abcdef1234567890ab', 
    date: '2025-07-11', 
    time: '09:15:22',
    status: 'success', 
    usdValue: 100.00,
    txHash: 'def456ghi789jkl012mno345pqr678stu901vwx234yz567abc123',
    fee: 0.000001
  },
  { 
    id: '3', 
    type: 'swap', 
    token: 'BONK', 
    amount: 50000, 
    swapFrom: 'SOL',
    swapFromAmount: 0.0125,
    date: '2025-07-10', 
    time: '16:45:12',
    status: 'pending', 
    usdValue: 1.25,
    txHash: 'ghi789jkl012mno345pqr678stu901vwx234yz567abc123def456',
    fee: 0.000003
  },
  { 
    id: '4', 
    type: 'buy', 
    token: 'BTC', 
    amount: 0.001, 
    date: '2025-07-09', 
    time: '11:30:08',
    status: 'success', 
    usdValue: 66.85,
    txHash: 'jkl012mno345pqr678stu901vwx234yz567abc123def456ghi789',
    fee: 0.50
  },
  { 
    id: '5', 
    type: 'send', 
    token: 'ETH', 
    amount: -0.05, 
    to: '0x123456789abcdef0123456789abcdef012345678', 
    date: '2025-07-08', 
    time: '20:12:33',
    status: 'failed', 
    usdValue: -175.00,
    txHash: 'mno345pqr678stu901vwx234yz567abc123def456ghi789jkl012',
    fee: 0.002
  },
  { 
    id: '6', 
    type: 'receive', 
    token: 'DOGE', 
    amount: 1000, 
    from: '6xpqr9012345678901234567890abcdef123456', 
    date: '2025-07-07', 
    time: '13:45:17',
    status: 'success', 
    usdValue: 80.00,
    txHash: 'pqr678stu901vwx234yz567abc123def456ghi789jkl012mno345',
    fee: 0.01
  },
];

const formatBalance = (amount: number, decimals = 9) => {
  if (amount >= 1000000) {
    return (amount / 1000000).toFixed(2) + 'M';
  } else if (amount >= 1000) {
    return (amount / 1000).toFixed(2) + 'K';
  } else if (amount < 0.01) {
    return amount.toFixed(8);
  } else {
    return amount.toFixed(decimals > 4 ? 4 : decimals);
  }
};

const formatUSD = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

interface BalanceProps {
  wallet: Wallet;
}

const Balance = ({ wallet }: BalanceProps) => {
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('tokens');
  const [selectedTx, setSelectedTx] = useState<string | null>(null);

  // Copy address to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(wallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  // Simulate loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [wallet.id]);

  const totalUSD = wallet.tokens.reduce((sum: number, token: Token) => sum + token.usdValue, 0);

  // Helper function to get token icon
  const getTokenIcon = (symbol: string) => {
    const icons: { [key: string]: string } = {
      'SOL': 'S',
      'USDC': 'U',
      'BONK': 'B',
      'BTC': '₿',
      'ETH': 'Ξ',
      'DOGE': 'D',
      'ADA': 'A',
      'MATIC': 'M',
      'LINK': 'L',
      'AVAX': 'AV',
      'DOT': 'P',
      'SHIB': 'S'
    };
    return icons[symbol] || symbol.charAt(0);
  };

  // Get status icon and color
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'success':
        return { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/20' };
      case 'pending':
        return { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
      case 'failed':
        return { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/20' };
      default:
        return { icon: AlertCircle, color: 'text-gray-400', bg: 'bg-gray-500/20' };
    }
  };

  // Get transaction type config
  const getTransactionTypeConfig = (type: string) => {
    switch (type) {
      case 'send':
        return { icon: ArrowUpRight, color: 'text-red-400', bg: 'bg-red-500/20', label: 'Sent' };
      case 'receive':
        return { icon: ArrowDownLeft, color: 'text-green-400', bg: 'bg-green-500/20', label: 'Received' };
      case 'swap':
        return { icon: Repeat, color: 'text-purple-400', bg: 'bg-purple-500/20', label: 'Swapped' };
      case 'buy':
        return { icon: Plus, color: 'text-blue-400', bg: 'bg-blue-500/20', label: 'Purchased' };
      default:
        return { icon: AlertCircle, color: 'text-gray-400', bg: 'bg-gray-500/20', label: 'Unknown' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-4 pb-28 space-y-6">
        {/* Wallet Address */}
        <div className="backdrop-blur-xl bg-slate-800/30 border border-slate-700/50 rounded-2xl p-4 hover:bg-slate-800/40 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-800/50 flex items-center justify-center">
                <WalletIcon className="w-5 h-5 text-blue-300" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Wallet Address</p>
                <span className="font-mono text-sm text-slate-200 select-all">
                  {wallet.address.slice(0, 10)}...{wallet.address.slice(-8)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleCopy}
                className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors duration-200"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-400" />
                )}
              </button>
              <button 
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors duration-200"
              >
                {showBalance ? <Eye className="w-4 h-4 text-slate-400" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
              </button>
            </div>
          </div>
        </div>

        {/* Total Balance Card */}
        <div className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20 border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-white/10 rounded-full">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Total Balance</h2>
                  <p className="text-slate-300 text-sm">Portfolio value</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                <TrendingUp className="w-4 h-4" />
                <span>+5.2%</span>
              </div>
            </div>
            
            <div className="space-y-2">
              {loading ? (
                <div className="space-y-2">
                  <div className="h-12 w-48 bg-white/20 rounded-lg animate-pulse" />
                  <div className="h-6 w-32 bg-white/20 rounded-lg animate-pulse" />
                </div>
              ) : showBalance ? (
                <div>
                  <div className="text-5xl font-bold text-white tracking-tight">
                    {formatUSD(totalUSD)}
                  </div>
                  <div className="text-xl text-slate-300 mt-2">
                    {formatBalance(wallet.balance)} SOL
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="h-12 w-48 bg-white/20 rounded-lg" />
                  <div className="h-6 w-32 bg-white/20 rounded-lg" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: ArrowUpRight, label: 'Send', gradient: 'from-red-500/20 to-red-600/20', hover: 'hover:from-red-500/30 hover:to-red-600/30' },
            { icon: ArrowDownLeft, label: 'Receive', gradient: 'from-green-500/20 to-green-600/20', hover: 'hover:from-green-500/30 hover:to-green-600/30' },
            { icon: Plus, label: 'Buy', gradient: 'from-blue-500/20 to-blue-600/20', hover: 'hover:from-blue-500/30 hover:to-blue-600/30' },
            { icon: Repeat, label: 'Swap', gradient: 'from-purple-500/20 to-purple-600/20', hover: 'hover:from-purple-500/30 hover:to-purple-600/30' },
          ].map(({ icon: Icon, label, gradient, hover }) => (
            <button
              key={label}
              className={`backdrop-blur-xl bg-gradient-to-br ${gradient} ${hover} border border-slate-700/50 rounded-2xl p-6 flex flex-col items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-slate-600/50`}
            >
              <div className="p-3 bg-white/10 rounded-full">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-white">{label}</span>
            </button>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 backdrop-blur-xl bg-slate-800/30 border border-slate-700/50 rounded-2xl p-1">
          {[
            { id: 'tokens', label: 'Tokens', icon: Coins },
            { id: 'activity', label: 'Activity', icon: Repeat },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === id 
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-slate-600/50' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'tokens' && (
          <div className="space-y-4">
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-20 bg-slate-800/30 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid gap-3">
                {wallet.tokens.map((token) => (
                  <div 
                    key={token.id} 
                    className="backdrop-blur-xl bg-slate-800/30 border border-slate-700/50 rounded-2xl p-4 hover:bg-slate-800/40 transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center font-bold text-white text-lg border-2 border-slate-600/50 group-hover:border-slate-500/70 transition-colors">
                            {getTokenIcon(token.symbol)}
                          </div>
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-white text-lg">{token.name}</div>
                          <div className="text-sm text-slate-400 uppercase tracking-wider font-medium">
                            {token.symbol}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-white text-lg">
                          {formatBalance(token.amount, token.decimals)}
                        </div>
                        <div className="text-sm text-slate-400">
                          {formatUSD(token.usdValue)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
              <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                View All
              </button>
            </div>
            
            {mockTxs.map((tx) => {
              const typeConfig = getTransactionTypeConfig(tx.type);
              const statusConfig = getStatusConfig(tx.status);
              
              return (
                <div 
                  key={tx.id}
                  className="backdrop-blur-xl bg-slate-800/30 border border-slate-700/50 rounded-2xl p-5 hover:bg-slate-800/40 transition-all duration-300 hover:border-slate-600/50 cursor-pointer group"
                  onClick={() => setSelectedTx(selectedTx === tx.id ? null : tx.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className={`p-3 rounded-full ${typeConfig.bg} group-hover:scale-110 transition-transform`}>
                          <typeConfig.icon className={`w-5 h-5 ${typeConfig.color}`} />
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${statusConfig.bg} flex items-center justify-center`}>
                          <statusConfig.icon className={`w-3 h-3 ${statusConfig.color}`} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-white text-lg">{typeConfig.label}</span>
                          <span className="text-sm text-slate-400">{tx.token}</span>
                        </div>
                        <div className="text-sm text-slate-400">
                          {tx.type === 'send' && tx.to && `To ${tx.to.slice(0, 8)}...${tx.to.slice(-6)}`}
                          {tx.type === 'receive' && tx.from && `From ${tx.from.slice(0, 8)}...${tx.from.slice(-6)}`}
                          {tx.type === 'swap' && `${tx.swapFrom} → ${tx.token}`}
                          {tx.type === 'buy' && `Market purchase`}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                          <span>{tx.date}</span>
                          <span>•</span>
                          <span>{tx.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold text-lg ${
                        tx.amount > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {tx.amount > 0 ? '+' : ''}{formatBalance(Math.abs(tx.amount))} {tx.token}
                      </div>
                      <div className="text-sm text-slate-400">
                        {formatUSD(Math.abs(tx.usdValue))}
                      </div>
                      <div className={`inline-block text-[10px] font-medium mt-1 px-1.5 py-0.5 rounded-full ${statusConfig.bg} ${statusConfig.color} capitalize`}>
                        {tx.status}
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded Details */}
                  {selectedTx === tx.id && (
                    <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-3 animate-in slide-in-from-top-5 duration-300">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-1">Transaction Hash</div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm text-slate-200">
                              {tx.txHash.slice(0, 12)}...{tx.txHash.slice(-8)}
                            </span>
                            <button className="p-1 hover:bg-slate-700/50 rounded transition-colors">
                              <ExternalLink className="w-3 h-3 text-slate-400" />
                            </button>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-1">Network Fee</div>
                          <div className="text-sm text-slate-200">
                            {tx.type === 'buy' ? formatUSD(tx.fee) : `${tx.fee} SOL`}
                          </div>
                        </div>
                      </div>
                      
                      {tx.type === 'swap' && (
                        <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-600/30">
                          <div className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-2">Swap Details</div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-red-400">-{tx.swapFromAmount} {tx.swapFrom}</span>
                            </div>
                            <Repeat className="w-4 h-4 text-slate-400" />
                            <div className="flex items-center gap-2">
                              <span className="text-green-400">+{formatBalance(tx.amount)} {tx.token}</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between pt-2">
                        <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                          View on Explorer
                        </button>
                        <button className="text-sm text-slate-400 hover:text-slate-300 transition-colors">
                          Copy Details
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Balance;
