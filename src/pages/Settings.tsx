import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Shield, Edit3, Check, X, Bell, Lock, Smartphone, Info, ChevronRight, Trash2, AlertTriangle } from 'lucide-react';

interface SettingsProps {
  walletName: string;
  onUpdateWalletName: (name: string) => void;
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({
  walletName,
  onUpdateWalletName,
  onLogout,
}) => {
  const navigate = useNavigate();
  const [isEditingName, setIsEditingName] = useState(false);
  const [newWalletName, setNewWalletName] = useState(walletName);

  const handleSaveName = () => {
    if (newWalletName.trim()) {
      onUpdateWalletName(newWalletName.trim());
      setIsEditingName(false);
    }
  };

  const handleCancel = () => {
    setNewWalletName(walletName);
    setIsEditingName(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-4 space-y-6">
          {/* Header */}
        <div className="backdrop-blur-xl bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/40 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center border-2 border-slate-800">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Settings</h1>
                <p className="text-slate-400 text-sm mt-1 block">
                  Manage wallet<br />preferences & security
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm bg-green-500/20 text-green-400 px-3 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-medium">Secure</span>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-slate-800/30 via-slate-800/20 to-slate-800/30 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/40 transition-all duration-300 group">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center justify-center p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl">
              <User className="w-7 h-7 text-white" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold leading-tight">Profile Settings</h2>
              <p className="text-slate-400 text-sm leading-snug">Customize your wallet identity</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Wallet Name</label>
              {isEditingName ? (
                <div className="flex gap-3 w-full items-center">
                  <input
                    value={newWalletName}
                    onChange={(e) => setNewWalletName(e.target.value)}
                    className="flex-1 h-12 px-4 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 min-w-0"
                    placeholder="Enter wallet name"
                  />
                  <button
                    onClick={handleSaveName}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-500 hover:bg-green-600 transition-all duration-200 hover:scale-105 text-white text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400/50"
                    title="Save"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-700 hover:bg-slate-600 transition-all duration-200 hover:scale-105 text-white text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400/50"
                    title="Cancel"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-4 bg-slate-900/30 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-200 group/name">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center font-bold text-xl text-white">
                      {walletName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="font-semibold text-lg">{walletName}</span>
                      <p className="text-slate-400 text-sm">Main wallet</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="opacity-80 hover:opacity-100 transition-opacity duration-200 p-2 hover:bg-slate-700/50 rounded-lg"
                  >
                    <Edit3 className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-slate-800/30 via-slate-800/20 to-slate-800/30 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/40 transition-all duration-300 group">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Security & Privacy</h2>
              <p className="text-slate-400 text-sm">Protect your wallet and funds</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Passkey */}
            <div className="flex items-center gap-4 p-4 bg-slate-900/30 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-200">
              <div className="relative p-3 bg-green-500/20 rounded-xl flex items-center justify-center w-12 h-12">
                <Lock className="w-5 h-5 text-green-400" />
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                  <Check className="w-3 h-3 text-white" />
                </span>
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-semibold text-base text-white">Passkey Authentication</span>
                <span className="flex items-center gap-2 text-slate-400 text-sm mt-0.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                  Biometric security enabled
                </span>
              </div>
            </div>

            {/* Device Management */}
            <div
              className="flex items-center gap-4 p-4 bg-slate-900/30 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-200 cursor-pointer"
              onClick={() => navigate('/devices')}
            >
              <div className="p-3 bg-blue-500/20 rounded-xl flex items-center justify-center w-12 h-12">
                <Smartphone className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-semibold text-base text-white">Device Management</span>
                <span className="text-slate-400 text-sm mt-0.5">Manage connected devices</span>
              </div>
            </div>

            {/* Notifications */}
            <div className="flex items-center gap-4 p-4 bg-slate-900/30 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-200 group/notif">
              <div className="p-3 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Bell className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex flex-col w-full min-w-0">
                <span className="font-semibold text-base text-white">Notifications</span>
                <span className="text-slate-400 text-sm break-words">Transaction alerts & security updates</span>
              </div>
            </div>

            {/* About */}
            <div className="flex items-center gap-4 p-4 bg-slate-900/30 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-200 group/about">
              <div className="p-3 bg-pink-500/20 rounded-xl flex items-center justify-center">
                <Info className="w-5 h-5 text-pink-400" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 w-full min-w-0">
                <span className="font-semibold text-base text-white whitespace-nowrap">About</span>
                <span className="text-slate-400 text-sm truncate sm:whitespace-normal">Version 1.0.0 • Build 2025.07.13</span>
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-red-500/10 via-red-500/5 to-red-500/10 border border-red-500/20 rounded-2xl p-6 hover:bg-red-500/15 transition-all duration-300 group">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-2xl group-hover:from-red-500/30 group-hover:to-red-600/30 transition-all duration-300">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-red-400">Danger Zone</h2>
              <p className="text-slate-400 text-sm">Irreversible actions</p>
            </div>
          </div>

          <div className="space-y-4">
            <div
              className="flex items-center gap-4 p-4 bg-red-500/10 rounded-xl border border-red-500/20 hover:border-red-500/30 transition-all duration-200 cursor-pointer"
              onClick={onLogout}
            >
              <div className="p-3 bg-red-500/20 rounded-xl flex items-center justify-center">
                <LogOut className="w-5 h-5 text-red-400" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 w-full min-w-0">
                <span className="font-semibold text-base text-red-400 whitespace-nowrap">Sign Out</span>
                <span className="text-slate-400 text-sm truncate sm:whitespace-normal">You'll need to authenticate again</span>
              </div>
            </div>

            {/* Delete Wallet */}
            <div className="flex items-center gap-4 p-4 bg-red-500/10 rounded-xl border border-red-500/20 hover:border-red-500/30 transition-all duration-200 group/delete">
              <div className="p-3 bg-red-500/20 rounded-xl flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-400" />
              </div>
              <div className="flex flex-col w-full min-w-0">
                <span className="font-semibold text-base text-red-400">Delete Wallet</span>
                <span className="text-slate-400 text-sm break-words">Permanently remove this wallet</span>
              </div>
              <button className="opacity-0 group-hover/delete:opacity-100 transition-opacity duration-200 p-2 hover:bg-red-700/50 rounded-lg">
                <ChevronRight className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
