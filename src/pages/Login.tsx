import { useState } from 'react';
import { Fingerprint, Shield, Sparkles, Lock, Zap, Check, X } from 'lucide-react';

const Login = ({ onLogin = () => {} }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStep, setAuthStep] = useState(0);

  const fakeLogin = () => {
    setIsDialogOpen(true);
    setIsAuthenticating(true);
    setAuthStep(0);
    
    // Simulate authentication steps
    setTimeout(() => setAuthStep(1), 600);
    setTimeout(() => setAuthStep(2), 1200);
    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthStep(3);
      setTimeout(() => {
        setIsDialogOpen(false);
        onLogin();
      }, 800);
    }, 1800);
  };

  const getAuthMessage = () => {
    switch (authStep) {
      case 0: return 'Initializing secure connection...';
      case 1: return 'Verifying biometric data...';
      case 2: return 'Authenticating with passkey...';
      case 3: return 'Authentication successful!';
      default: return 'Please authenticate using your device';
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000 opacity-60" />
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000 opacity-60" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main content - perfectly centered */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative z-10 w-full max-w-md">
          {/* Glass morphism container */}
          <div className="backdrop-blur-xl bg-slate-900/30 border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
            {/* Header Section */}
            <div className="flex flex-col items-center space-y-6 text-center">
              {/* Enhanced Logo with multiple glowing layers */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse" />
                <div className="absolute inset-2 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse delay-300" />
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 flex items-center justify-center shadow-2xl border border-slate-600/50 group-hover:border-slate-500/70 transition-all duration-500 hover:scale-110 backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 rounded-full" />
                  <Shield className="w-12 h-12 text-blue-400 relative z-10 drop-shadow-lg" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-white/5 to-transparent animate-pulse" />
                </div>
              </div>

              {/* Enhanced Title with better gradient */}
              <div className="space-y-3">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-tight drop-shadow-lg">
                  LazorKit
                </h1>
                <div className="text-xl font-semibold bg-gradient-to-r from-slate-300 to-slate-400 bg-clip-text text-transparent">
                  Crypto Wallet
                </div>
                <p className="text-slate-400 text-base font-medium">
                  Secure • Fast • Private
                </p>
              </div>

              {/* Enhanced feature cards */}
              <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
                {[
                  { icon: Shield, label: 'Secure', color: 'from-green-500/20 to-green-500/5', iconColor: 'text-green-400' },
                  { icon: Zap, label: 'Fast', color: 'from-yellow-500/20 to-yellow-500/5', iconColor: 'text-yellow-400' },
                  { icon: Sparkles, label: 'Easy', color: 'from-purple-500/20 to-purple-500/5', iconColor: 'text-purple-400' },
                ].map(({ icon: Icon, label, color, iconColor }) => (
                  <div
                    key={label}
                    className={`p-4 rounded-xl bg-gradient-to-b ${color} border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 hover:scale-105 group backdrop-blur-sm`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <Icon className={`w-6 h-6 ${iconColor} group-hover:scale-110 transition-transform duration-300 drop-shadow-lg`} />
                      <span className="text-sm font-medium text-slate-300">{label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Login Button */}
            <div className="space-y-6 mt-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                <button
                  onClick={fakeLogin}
                  className="relative w-full h-16 text-lg font-semibold shadow-2xl bg-gradient-to-r from-blue-600/80 via-purple-600/80 to-cyan-600/80 hover:from-blue-500/90 hover:via-purple-500/90 hover:to-cyan-500/90 border border-slate-600/50 hover:border-slate-500/70 transition-all duration-500 hover:scale-105 hover:shadow-3xl group overflow-hidden rounded-2xl backdrop-blur-sm text-white"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-black/10 rounded-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <div className="flex items-center justify-center space-x-3 relative z-10">
                    <Fingerprint className="w-6 h-6" />
                    <span>Login with Passkey</span>
                  </div>
                </button>
              </div>
              
              <div className="text-center space-y-3">
                <p className="text-sm text-slate-400">
                  Use your device's biometric authentication or PIN
                </p>
                <div className="flex items-center justify-center space-x-2 text-xs text-slate-500">
                  <Lock className="w-3 h-3" />
                  <span>End-to-end encrypted</span>
                </div>
              </div>
            </div>

            {/* Enhanced trust indicators */}
            <div className="flex items-center justify-center space-x-8 text-xs text-slate-500 mt-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-500 shadow-lg shadow-blue-400/50" />
                <span>Private</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-1000 shadow-lg shadow-purple-400/50" />
                <span>Trusted</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Authentication Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-md">
            <div className="backdrop-blur-xl bg-slate-900/90 border border-slate-600/50 rounded-3xl p-8 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 rounded-3xl" />
              
              {/* Close button */}
              <button
                onClick={() => setIsDialogOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>

              <div className="relative z-10">
                {/* Header */}
                <div className="text-center space-y-2 mb-8">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="p-2 bg-blue-500/20 rounded-full">
                      <Fingerprint className="w-6 h-6 text-blue-400" />
                    </div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Authenticate with Passkey
                    </h2>
                  </div>
                  <p className="text-slate-400 text-sm">
                    Please authenticate using your device's security method
                  </p>
                </div>
                
                <div className="flex flex-col items-center space-y-6">
                  {isAuthenticating ? (
                    <>
                      {/* Enhanced animated authentication icon */}
                      <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-full flex items-center justify-center relative backdrop-blur-sm">
                          <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full animate-spin" />
                          <div className="absolute inset-2 border-2 border-purple-500/50 rounded-full animate-spin" style={{ animationDirection: 'reverse' }} />
                          <div className="absolute inset-4 border border-cyan-500/30 rounded-full animate-pulse" />
                          <Fingerprint className="w-12 h-12 text-blue-400 animate-pulse relative z-10" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-2xl animate-pulse" />
                      </div>
                      
                      {/* Enhanced progress steps */}
                      <div className="flex items-center space-x-3">
                        {[0, 1, 2].map((step) => (
                          <div key={step} className="flex items-center">
                            <div
                              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                                step <= authStep
                                  ? 'bg-blue-400 scale-110 shadow-lg shadow-blue-400/50'
                                  : 'bg-slate-600 scale-90'
                              }`}
                            />
                            {step < 2 && (
                              <div className={`w-8 h-0.5 mx-1 transition-all duration-500 ${
                                step < authStep ? 'bg-blue-400' : 'bg-slate-600'
                              }`} />
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <div className="text-center space-y-3">
                        <p className="text-sm font-medium text-slate-200">
                          {getAuthMessage()}
                        </p>
                        <div className="flex items-center justify-center space-x-1 text-xs text-slate-500">
                          <div className="w-1 h-1 bg-current rounded-full animate-pulse" />
                          <div className="w-1 h-1 bg-current rounded-full animate-pulse delay-200" />
                          <div className="w-1 h-1 bg-current rounded-full animate-pulse delay-400" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Enhanced success state */}
                      <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-green-500/20 to-green-400/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <Check className="w-12 h-12 text-green-400" />
                        </div>
                        <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl animate-pulse" />
                      </div>
                      
                      <div className="text-center space-y-2">
                        <p className="text-sm font-medium text-green-400">
                          Authentication successful!
                        </p>
                        <p className="text-xs text-slate-500">
                          Redirecting to your wallet...
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
