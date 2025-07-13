import { useState } from 'react';
import { Smartphone, Laptop, Tablet, Monitor, Plus, Trash2, Shield, Clock, Settings, Wifi, Power, X } from 'lucide-react';

type Device = {
  id: string;
  name: string;
  type: 'phone' | 'laptop' | 'tablet' | 'desktop';
  lastActive: string;
  isActive: boolean;
};

// Mock data for devices
const mockDevices: Device[] = [
  { id: '1', name: 'iPhone 15 Pro', type: 'phone', lastActive: '2025-07-13T10:30:00Z', isActive: true },
  { id: '2', name: 'MacBook Pro M3', type: 'laptop', lastActive: '2025-07-13T09:15:00Z', isActive: true },
  { id: '3', name: 'iPad Air', type: 'tablet', lastActive: '2025-07-12T18:45:00Z', isActive: false },
  { id: '4', name: 'Gaming Desktop', type: 'desktop', lastActive: '2025-07-11T22:30:00Z', isActive: false },
];

const Devices = () => {
  const [devices, setDevices] = useState<Device[]>(mockDevices);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newDeviceName, setNewDeviceName] = useState('');
  const [newDeviceType, setNewDeviceType] = useState<Device['type']>('phone');
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const getDeviceIcon = (type: Device['type']) => {
    switch (type) {
      case 'phone': return Smartphone;
      case 'laptop': return Laptop;
      case 'tablet': return Tablet;
      case 'desktop': return Monitor;
      default: return Smartphone;
    }
  };

  const getDeviceGradient = (type: Device['type']) => {
    switch (type) {
      case 'phone': return 'from-blue-500/20 to-blue-600/20';
      case 'laptop': return 'from-purple-500/20 to-purple-600/20';
      case 'tablet': return 'from-green-500/20 to-green-600/20';
      case 'desktop': return 'from-orange-500/20 to-orange-600/20';
      default: return 'from-slate-500/20 to-slate-600/20';
    }
  };

  const getDeviceIconColor = (type: Device['type']) => {
    switch (type) {
      case 'phone': return 'text-blue-400';
      case 'laptop': return 'text-purple-400';
      case 'tablet': return 'text-green-400';
      case 'desktop': return 'text-orange-400';
      default: return 'text-slate-400';
    }
  };

  const deviceTypes = [
    { value: 'phone' as Device['type'], label: 'Phone', icon: Smartphone },
    { value: 'laptop' as Device['type'], label: 'Laptop', icon: Laptop },
    { value: 'tablet' as Device['type'], label: 'Tablet', icon: Tablet },
    { value: 'desktop' as Device['type'], label: 'Desktop', icon: Monitor },
  ];

  const handleAddDevice = () => {
    if (newDeviceName.trim()) {
      const newDevice: Device = {
        id: Date.now().toString(),
        name: newDeviceName.trim(),
        type: newDeviceType,
        lastActive: new Date().toISOString(),
        isActive: true,
      };
      setDevices([...devices, newDevice]);
      setNewDeviceName('');
      setIsAddDialogOpen(false);
    }
  };

  const handleDisableDevice = (deviceId: string) => {
    setDevices(devices.map(device => 
      device.id === deviceId ? { ...device, isActive: false } : device
    ));
  };

  const handleRemoveDevice = (deviceId: string) => {
    setDevices(devices.filter(device => device.id !== deviceId));
  };

  const formatLastActive = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  const activeDevices = devices.filter(d => d.isActive);
  const inactiveDevices = devices.filter(d => !d.isActive);

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-4 pb-28 space-y-6">
        {/* Header Devices Management */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-800/50 flex items-center justify-center">
              <Settings className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">Device Management</h1>
              <p className="text-xs text-slate-400">Manage your connected devices securely</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddDialogOpen(true)}
            className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 w-10 h-10 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
            title="Add Device"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/20 rounded-2xl p-3">
            <Shield className="w-5 h-5 text-green-400 mb-1" />
            <div className="text-lg font-bold text-green-400">{activeDevices.length}</div>
            <div className="text-xs text-green-300 font-medium">Active</div>
          </div>
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/20 rounded-2xl p-3">
            <Clock className="w-5 h-5 text-orange-400 mb-1" />
            <div className="text-lg font-bold text-orange-400">{inactiveDevices.length}</div>
            <div className="text-xs text-orange-300 font-medium">Inactive</div>
          </div>
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/20 rounded-2xl p-3">
            <Wifi className="w-5 h-5 text-blue-400 mb-1" />
            <div className="text-lg font-bold text-blue-400">{devices.length}</div>
            <div className="text-xs text-blue-300 font-medium">Total</div>
          </div>
        </div>

        {/* Active Devices Section */}
        {activeDevices.length > 0 && (
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-6">
              <div className="p-1 md:p-2 bg-green-500/20 rounded-full">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
              </div>
              <h2 className="text-lg md:text-2xl font-bold text-green-400">Active Devices</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-green-500/50 to-transparent" />
            </div>

            <div className="grid gap-2 md:gap-4">
              {activeDevices.map((device) => {
                const Icon = getDeviceIcon(device.type);
                const gradient = getDeviceGradient(device.type);
                const iconColor = getDeviceIconColor(device.type);

                return (
                  <div
                    key={device.id}
                    className="flex items-center gap-3 backdrop-blur-xl bg-slate-800/30 border border-slate-700/50 rounded-2xl p-3 md:p-6 hover:bg-slate-800/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group min-h-[60px]"
                  >
                    <div className={`p-2 md:p-4 bg-gradient-to-br ${gradient} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-5 h-5 md:w-8 md:h-8 ${iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                        <h3 className="text-base md:text-xl font-bold text-white">{device.name}</h3>
                        <div className="flex items-center gap-1 md:gap-2 bg-green-500/20 text-green-400 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-medium">
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse" />
                          <span>Online</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 md:gap-4 text-slate-400 text-xs md:text-base">
                        <span className="capitalize font-medium">{device.type}</span>
                        <span>•</span>
                        <span>Last active: {formatLastActive(device.lastActive)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2">
                      <button
                        onClick={() => handleDisableDevice(device.id)}
                        className="p-2 md:p-3 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg md:rounded-xl transition-all duration-300 hover:scale-105"
                        title="Disable Device"
                      >
                        <Power className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                      <button
                        onClick={() => handleRemoveDevice(device.id)}
                        className="p-2 md:p-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg md:rounded-xl transition-all duration-300 hover:scale-105"
                        title="Remove Device"
                      >
                        <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Inactive Devices Section */}
        {inactiveDevices.length > 0 && (
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-6">
              <div className="p-1 md:p-2 bg-orange-500/20 rounded-full">
                <Clock className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
              </div>
              <h2 className="text-lg md:text-2xl font-bold text-orange-400">Inactive Devices</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-orange-500/50 to-transparent" />
            </div>

            <div className="grid gap-2 md:gap-4">
              {inactiveDevices.map((device) => {
                const Icon = getDeviceIcon(device.type);
                const gradient = getDeviceGradient(device.type);
                const iconColor = getDeviceIconColor(device.type);

                return (
                  <div
                    key={device.id}
                    className="flex items-center gap-3 backdrop-blur-xl bg-slate-800/20 border border-slate-700/30 rounded-2xl p-3 md:p-6 hover:bg-slate-800/30 transition-all duration-300 opacity-75 hover:opacity-100 min-h-[60px]"
                  >
                    <div className={`p-2 md:p-4 bg-gradient-to-br ${gradient} rounded-xl opacity-50`}>
                      <Icon className={`w-5 h-5 md:w-8 md:h-8 ${iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                        <h3 className="text-base md:text-xl font-bold text-slate-300">{device.name}</h3>
                        <div className="flex items-center gap-1 md:gap-2 bg-slate-500/20 text-slate-400 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-medium">
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-slate-500 rounded-full" />
                          <span>Offline</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 md:gap-4 text-slate-500 text-xs md:text-base">
                        <span className="capitalize font-medium">{device.type}</span>
                        <span>•</span>
                        <span>Last active: {formatLastActive(device.lastActive)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2">
                      <button
                        onClick={() => handleRemoveDevice(device.id)}
                        className="p-2 md:p-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg md:rounded-xl transition-all duration-300 hover:scale-105"
                        title="Remove Device"
                      >
                        <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {devices.length === 0 && (
          <div className="text-center py-20">
            <div className="p-8 bg-gradient-to-br from-slate-800/30 to-slate-700/30 rounded-3xl w-32 h-32 mx-auto mb-8 flex items-center justify-center">
              <Settings className="w-16 h-16 text-slate-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">No devices connected</h3>
            <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
              Add your first device to start managing your wallet securely across all your devices
            </p>
            <button
              onClick={() => setIsAddDialogOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8 py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg mx-auto"
            >
              <Plus className="w-5 h-5" />
              Add Your First Device
            </button>
          </div>
        )}

        {/* Add Device Dialog */}
        {isAddDialogOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2">
            <div className="backdrop-blur-xl bg-slate-800/90 border border-slate-700/50 rounded-3xl p-4 max-w-sm w-full shadow-2xl relative">
              {/* Header */}
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-bold text-white flex-1">Add New Device</h2>
                <button
                  onClick={() => setIsAddDialogOpen(false)}
                  className="p-2 hover:bg-slate-700/50 rounded-full transition-colors"
                  title="Close"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <p className="text-slate-400 mb-4">Connect a new device to control your wallet securely</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-white mb-2">Device Name</label>
                  <input
                    type="text"
                    value={newDeviceName}
                    onChange={(e) => setNewDeviceName(e.target.value)}
                    placeholder="e.g., iPhone 15 Pro"
                    className="w-full p-4 bg-slate-900/60 border border-slate-700 rounded-2xl text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white mb-2">Device Type</label>
                  {/* Custom Dropdown Start */}
                  <div className="relative">
                    <button
                      type="button"
                      className="w-full flex items-center justify-between p-4 bg-slate-900/60 border border-slate-700 rounded-2xl text-white focus:border-blue-500 focus:outline-none transition-colors text-base appearance-none"
                      onClick={() => setShowTypeDropdown((prev) => !prev)}
                    >
                      <span className="flex items-center gap-2">
                        {(() => { const Icon = getDeviceIcon(newDeviceType); return <Icon className={`w-5 h-5 ${getDeviceIconColor(newDeviceType)}`} />; })()}
                        <span className="capitalize">{newDeviceType}</span>
                      </span>
                      <svg className="w-4 h-4 ml-2 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {showTypeDropdown && (
                      <div className="absolute left-0 mt-2 w-full max-h-56 overflow-y-auto bg-slate-900/95 border border-slate-700 rounded-2xl shadow-xl z-50">
                        {deviceTypes.map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            className={`w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-slate-700/60 transition-colors ${newDeviceType === type.value ? 'bg-slate-700/40' : ''}`}
                            onClick={() => { setNewDeviceType(type.value as Device['type']); setShowTypeDropdown(false); }}
                          >
                            {(() => { const Icon = getDeviceIcon(type.value); return <Icon className={`w-5 h-5 ${getDeviceIconColor(type.value)}`} />; })()}
                            <span className="capitalize">{type.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Custom Dropdown End */}
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setIsAddDialogOpen(false)}
                    className="flex-1 p-4 bg-slate-700/50 hover:bg-slate-700/70 text-white rounded-2xl transition-colors text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddDevice}
                    disabled={!newDeviceName.trim()}
                    className="flex-1 p-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-base font-semibold"
                  >
                    Add Device
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Devices;
