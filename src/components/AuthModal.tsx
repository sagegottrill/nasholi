import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  signUp: (email: string, password: string, fullName: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  resetPassword: (email: string) => Promise<any>;
}

type AuthMode = 'login' | 'signup' | 'reset';

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  signUp,
  signIn,
  resetPassword
}) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
    setError('');
    setSuccess('');
  };

  const handleClose = () => {
    resetForm();
    setMode('login');
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }
        const { error } = await signUp(email, password, fullName);
        if (error) {
          setError(error.message);
        } else {
          setSuccess('Account created! Please check your email to verify your account.');
          setTimeout(() => {
            setMode('login');
            resetForm();
          }, 3000);
        }
      } else if (mode === 'login') {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message);
        } else {
          onSuccess();
          handleClose();
        }
      } else if (mode === 'reset') {
        const { error } = await resetPassword(email);
        if (error) {
          setError(error.message);
        } else {
          setSuccess('Password reset email sent! Check your inbox.');
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[hsl(var(--dark-green))]/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[hsl(var(--cream-bg))] rounded-2xl shadow-2xl overflow-hidden border border-[hsl(var(--primary))]/20">
        {/* Header */}
        <div className="relative bg-[hsl(var(--dark-green))] px-6 py-8 text-[hsl(var(--cream-bg))]">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {mode === 'reset' && (
            <button
              onClick={() => { setMode('login'); resetForm(); }}
              className="absolute top-4 left-4 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <img
                src="/white%20logo.png"
                alt="Nasholi Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold font-serif">
              {mode === 'login' && 'Welcome Back'}
              {mode === 'signup' && 'Join the Harvest'}
              {mode === 'reset' && 'Reset Password'}
            </h2>
            <p className="text-[hsl(var(--cream-bg))]/80 mt-1 text-sm">
              {mode === 'login' && 'Sign in to access your dashboard'}
              {mode === 'signup' && 'Create your account to start ordering'}
              {mode === 'reset' && 'Enter your email to reset password'}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-600 rounded-xl text-sm">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* Full Name (Signup only) */}
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-[hsl(var(--dark-green))] mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[hsl(var(--primary))]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-orange))] focus:border-transparent text-[hsl(var(--dark-green))]"
                  required
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[hsl(var(--dark-green))] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full pl-10 pr-4 py-3 bg-white border border-[hsl(var(--primary))]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-orange))] focus:border-transparent text-[hsl(var(--dark-green))]"
                required
              />
            </div>
          </div>

          {/* Password (Login & Signup) */}
          {mode !== 'reset' && (
            <div>
              <label className="block text-sm font-medium text-[hsl(var(--dark-green))] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 bg-white border border-[hsl(var(--primary))]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-orange))] focus:border-transparent text-[hsl(var(--dark-green))]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}

          {/* Confirm Password (Signup only) */}
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-[hsl(var(--dark-green))] mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[hsl(var(--primary))]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-orange))] focus:border-transparent text-[hsl(var(--dark-green))]"
                  required
                />
              </div>
            </div>
          )}

          {/* Forgot Password Link */}
          {mode === 'login' && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => { setMode('reset'); setError(''); setSuccess(''); }}
                className="text-sm text-[hsl(var(--primary))] hover:text-[hsl(var(--accent-orange))]"
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[hsl(var(--accent-orange))] hover:bg-[hsl(var(--accent-orange))]/90 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Please wait...</span>
              </>
            ) : (
              <>
                {mode === 'login' && 'Sign In'}
                {mode === 'signup' && 'Create Account'}
                {mode === 'reset' && 'Send Reset Link'}
              </>
            )}
          </button>

          {/* Toggle Mode */}
          {mode !== 'reset' && (
            <p className="text-center text-gray-600 text-sm">
              {mode === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('signup'); resetForm(); }}
                    className="text-[hsl(var(--primary))] hover:text-[hsl(var(--accent-orange))] font-medium"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('login'); resetForm(); }}
                    className="text-[hsl(var(--primary))] hover:text-[hsl(var(--accent-orange))] font-medium"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          )}
        </form>

        {/* Benefits (Signup only) */}
        {mode === 'signup' && (
          <div className="px-6 pb-6">
            <div className="bg-[hsl(var(--primary))]/5 rounded-xl p-4 border border-[hsl(var(--primary))]/10">
              <p className="text-sm font-medium text-[hsl(var(--dark-green))] mb-2">Account Benefits:</p>
              <ul className="space-y-1.5 text-sm text-[hsl(var(--primary))]">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[hsl(var(--accent-orange))]" />
                  Save your cart across devices
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[hsl(var(--accent-orange))]" />
                  Track order history & shipments
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[hsl(var(--accent-orange))]" />
                  Exclusive member discounts
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
