import { Button, Input } from '@/shared/components/ui';
import { useLoginForm } from '../hooks/useLoginForm';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  // We destructure everything we need from the hook
  const { 
    values, 
    errors, 
    isSubmitting, 
    handleLogin, 
    handleChange, 
    handleGoogleLogin 
  } = useLoginForm();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-white overflow-hidden p-6">
      {/* Background Blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-5%] w-200 h-175 bg-purple-200/50 blur-[100px] opacity-70 animate-blob" style={{ borderRadius: '30% 70% 50% 50% / 30% 30% 70% 70%' }} />
        <div className="absolute bottom-[-15%] right-[-5%] w-225 h-200 bg-blue-100/60 blur-[120px] opacity-70 animate-blob animation-delay-2000" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }} />
      </div>

      {/* Desktop Link */}
      <div className="absolute top-8 right-8 z-20 hidden md:block">
        <p className="text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-gray-900 hover:text-blue-600 transition-colors ml-1">
            Sign up
          </Link>
        </p>
      </div>

      <div className="relative z-10 w-full max-w-100 p-10 rounded-[48px] bg-white/60 border border-white/80 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.04)] backdrop-blur-3xl text-center">
        <img className='mx-auto w-16 h-16 rounded-2xl shadow-sm mb-6' src='/assets/logo-kynetic.svg' alt="Logo" />

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Sign in with email</h1>
          <p className="text-gray-400 text-sm mt-2 px-4">Access your control panel and manage your tasks.</p>
        </div>

        <form onSubmit={handleLogin} className="text-left space-y-2">
          <div className="h-auto "> 
            <Input
              label="Email"
              type="email"
              name="email"
              value={values.email}
              error={errors.email}
              disabled={isSubmitting}
              onChange={handleChange('email')}
              placeholder="name@company.com"
            />
          </div>

          <div className="h-auto">
            <Input 
              label="Password"
              name="password"
              iconType="password" 
              value={values.password}
              error={errors.password}
              disabled={isSubmitting}
              onChange={handleChange('password')}
              placeholder="••••••••"
            />
          </div>

          <div className="text-right mb-6">
            <button type="button" className="cursor-pointer text-[11px] font-bold text-gray-400 hover:text-gray-600 transition-colors">
              Forgot password?
            </button>
          </div>

          {/* Error Global (Incorrect Credentials) */}
          {errors.global && (
            <p className="text-red-500 text-xs text-center mb-4 font-medium animate-in fade-in slide-in-from-top-1">
              {errors.global}
            </p>
          )}

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="cursor-pointer w-full h-12 bg-[#1c1c1c] hover:bg-black text-white rounded-2xl font-bold shadow-lg transition-all active:scale-95"
          >
            {isSubmitting ? 'Signing in...' : 'Get Started'}
          </Button>

          <div className="relative flex items-center py-6">
            <div className="grow border-t border-gray-100"></div>
            <span className="shrink mx-4 text-gray-300 text-[10px] font-bold uppercase tracking-widest">Or sign in with</span>
            <div className="grow border-t border-gray-100"></div>
          </div>

          <div className="flex justify-center">
            <button type="button" onClick={() => handleGoogleLogin()} className="cursor-pointer hover:scale-110 transition-transform p-2">
              <img src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" className="w-6 h-6" alt="Google" />
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6 md:hidden">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-gray-900 underline">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};