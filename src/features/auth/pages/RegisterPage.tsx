import { Link } from 'react-router-dom';
import { Button, Input } from '@/shared/components/ui';
import { useRegisterForm } from '../hooks/useRegisterForm';

export const RegisterPage = () => {
  const { values, errors, isSubmitting, handleRegister, handleChange } = useRegisterForm();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-white overflow-hidden p-6">
      {/* Background Blobs - Los mantenemos por identidad */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-5%] w-200 h-175 bg-purple-200/50 blur-[100px] opacity-70 animate-blob" />
        <div className="absolute bottom-[-15%] right-[-5%] w-225 h-200 bg-blue-100/60 blur-[120px] opacity-70 animate-blob animation-delay-2000" />
      </div>

      {/* Enlace Estratégico Arriba a la Derecha */}
      <div className="absolute top-8 right-8 z-20 hidden md:block">
        <p className="text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-gray-900 hover:text-blue-600 transition-colors ml-1">
            Sign in
          </Link>
        </p>
      </div>

      <div className="relative z-10 w-full max-w-105 p-8 rounded-[40px] bg-white/60 border border-white/80 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.04)] backdrop-blur-3xl">
        
        {/* Header más pequeño y alineado a la izquierda para modernidad */}
        <div className="flex justify-between items-start mb-8">
          <div className="text-left">
            <img className='w-10 h-10 rounded-xl mb-4' src='/assets/logo-kynetic.svg' alt="Logo" />
            <h1 className="text-xl font-bold text-gray-900">Create account</h1>
            <p className="text-gray-400 text-sm mt-1">Join the next gen of productivity.</p>
          </div>
          {/* Botón de Google compacto al lado del título */}
          <button type="button" className="cursor-pointer p-3 border border-gray-100 rounded-2xl hover:bg-white transition-all shadow-sm active:scale-95">
            <img src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" className="w-5 h-5" alt="Google" />
          </button>
        </div>

        <form onSubmit={handleRegister} className="text-left space-y-1">
          <div className="grid grid-cols-2 gap-x-4">
            <div className="min-h-20">
              <Input
                label="First Name"
                value={values.name}
                error={errors.name}
                onChange={handleChange('name')}
                placeholder="Name"
                className="h-auto text-sm bg-white/40"
              />
            </div>
            <div className="min-h-20">
              <Input
                label="Last Name"
                value={values.lastName}
                error={errors.lastName}
                onChange={handleChange('lastName')}
                placeholder="Last Name"
                className="h-auto text-sm bg-white/40"
              />
            </div>
          </div>

          <div className="min-h-20"> 
            <Input
              label="Email"
              type="email"
              value={values.email}
              error={errors.email}
              onChange={handleChange('email')}
              placeholder="name@company.com"
              className="h-auto text-sm bg-white/40"
            />
          </div>

          <div className="min-h-20">
            <Input 
              label="Password"
              type="password" 
              value={values.password}
              error={errors.password}
              onChange={handleChange('password')}
              placeholder="••••••••"
              className="h-auto text-sm bg-white/40" 
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="cursor-pointer w-full h-auto mt-4 bg-[#1c1c1c] hover:bg-black text-white rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-gray-200"
          >
            {isSubmitting ? 'Creating account...' : 'Create free account'}
          </Button>

          {/* Mobile Version */}
          <p className="text-center text-sm text-gray-500 mt-6 md:hidden">
            Have an account?{' '}
            <Link to="/login" className="font-bold text-gray-900 underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};