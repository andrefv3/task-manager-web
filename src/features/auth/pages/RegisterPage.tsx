import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  // We extract 'register' (which internally uses the service and the store)
  const { register } = useAuth();
  
  // local state for form data and submission status
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manage form changes with a single handler (cleaner code)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // We send the whole formData object, which matches our expected RegisterCredentials type
      await register(formData);
      toast.success('¡Cuenta creada con éxito!');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Error al crear la cuenta';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0a0a0a]">
      <div className="w-full max-w-md">

        {/* Header - UI consistente con el Login */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 border border-(--accent-border) bg-(--accent-bg)">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-(--accent)">
              <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Create account</h1>
          <p className="text-sm mt-1 text-gray-500">Start managing your tasks today</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-300">Full name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="Andrés Vega"
              className="w-full px-3.5 py-2.5 rounded-lg text-sm outline-none transition-all bg-[#111827] border border-[#1f2937] text-[#f9fafb] focus:border-(--accent-border) disabled:opacity-50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="you@example.com"
              className="w-full px-3.5 py-2.5 rounded-lg text-sm outline-none transition-all bg-[#111827] border border-[#1f2937] text-[#f9fafb] focus:border-(--accent-border) disabled:opacity-50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="••••••••"
              minLength={6}
              className="w-full px-3.5 py-2.5 rounded-lg text-sm outline-none transition-all bg-[#111827] border border-[#1f2937] text-[#f9fafb] focus:border-(--accent-border) disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 rounded-lg text-sm font-medium transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 bg-(--accent) text-white shadow-(--accent-bg)"
          >
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm mt-6 text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-(--accent) hover:underline">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}