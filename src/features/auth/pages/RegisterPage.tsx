import { Link } from 'react-router-dom';
import { Button, Input, Tooltip } from '@/shared/components/ui';
import { useRegisterForm } from '../hooks/useRegisterForm';

export const RegisterPage = () => {
  const { errors, isSubmitting, handleRegister, handleGoogleRegister } = useRegisterForm();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-white overflow-hidden p-6">
      {/* Background Blobs - Visual Identity */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-5%] w-200 h-175 bg-purple-200/50 blur-[100px] opacity-70 animate-blob" />
        <div className="absolute bottom-[-15%] right-[-5%] w-225 h-200 bg-blue-100/60 blur-[120px] opacity-70 animate-blob animation-delay-2000" />
      </div>

      {/* Strategy Link - Desktop */}
      <div className="absolute top-8 right-8 z-20 hidden md:block">
        <p className="text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-gray-900 hover:text-blue-600 transition-colors ml-1">
            Sign in
          </Link>
        </p>
      </div>

      <div className="relative z-10 w-full max-w-105 p-8 rounded-[40px] bg-white/60 border border-white/80 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.04)] backdrop-blur-3xl">
        
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div className="text-left">
            <img className='w-10 h-10 rounded-xl mb-4' src='/assets/logo-kynetic.svg' alt="Logo" />
            <h1 className="text-xl font-bold text-gray-900">Create account</h1>
            <p className="text-gray-400 text-sm mt-1">Join the next gen of productivity.</p>
          </div>

          <Tooltip text="Sign Up with Google">       
            <button type="button" onClick={() => handleGoogleRegister()} className="cursor-pointer p-3 border border-gray-100 rounded-2xl hover:bg-white transition-all shadow-sm active:scale-95">
              <img src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" className="w-5 h-5" alt="Google" />
            </button>
          </Tooltip>
        </div>

        <form onSubmit={handleRegister} className="text-left space-y-2">
          {/* Name & Last Name Grid */}
          <div className="grid grid-cols-2 gap-x-4">
            <div className="min-h-20">
              <Input
                name="name"
                label="First Name"
                error={errors.name}
                placeholder="Name"
              />
            </div>
            <div className="min-h-20">
              <Input
                name="lastName"
                label="Last Name"
                error={errors.lastName}
                placeholder="Last Name"
              />
            </div>
          </div>

          {/* Email Field & Password */}
          <div className="min-h-20"> 
            <Input
              name="email"
              label="Email"
              type="email"
              error={errors.email}
              placeholder="name@company.com"
            />
          </div>

          <div className="min-h-20">
            <Input 
              name="password"
              label="Password"
              iconType="password" 
              error={errors.password}
              placeholder="••••••••"
            />
          </div>

          <div className="min-h-20">
            <Input 
              name="confirmPassword"
              label="Confirm Password"
              iconType="password" // Same component logic for the eye icon
              error={errors.confirmPassword}
              placeholder="••••••••"
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="cursor-pointer w-full h-auto mt-6 bg-[#1c1c1c] hover:bg-black text-white rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-gray-200"
          >
            {isSubmitting ? 'Creating account...' : 'Create free account'}
          </Button>

          {errors.global && (
            <p className="text-red-500 text-[11px] font-medium text-center mt-3 animate-pulse">
              {errors.global}
            </p>
          )}

          <p className="text-center text-sm text-gray-500 mt-6 md:hidden">
            Have an account?{' '}
            <Link to="/login" className="font-bold text-gray-900 underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};