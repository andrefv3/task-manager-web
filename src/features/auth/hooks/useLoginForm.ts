import { useState, type ChangeEvent, type FormEvent } from 'react';
import { z } from 'zod';
import { useAuth } from './useAuth';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is mandatory').email('Invalid format'),
  password: z.string().min(1, 'Password is mandatory')
});

type LoginFormValues = z.infer<typeof loginSchema>;

// We define the errors with the exact keys of the schema + 'global'
type LoginFormErrors = {
  [K in keyof LoginFormValues]?: string;
} & { global?: string };

export const useLoginForm = () => {
  const { login, handleGoogleAccess } = useAuth();
  const [values, setValues] = useState<LoginFormValues>({ email: '', password: '' });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof LoginFormValues) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field] || errors.global) {
      setErrors(prev => ({ ...prev, [field]: undefined, global: undefined }));
    }
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = loginSchema.safeParse(values);
    
    if (!result.success) {
      const fieldErrors: LoginFormErrors = {};
      result.error.issues.forEach((err) => {
        const path = err.path[0] as keyof LoginFormValues;
        fieldErrors[path] = err.message;
      });
      return setErrors(fieldErrors);
    }

    setIsSubmitting(true);
    try {
      await login(result.data);
    } catch (err) {
      const message = axios.isAxiosError(err) ? err.response?.data?.message : 'Credentials error';
      setErrors({ global: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // Enviamos el token al proceso de autenticación de nuestra app
      handleGoogleAccess(tokenResponse);
    },
    onError: (error) => console.error('Google Login Error:', error),
  });

  return { values, errors, isSubmitting, handleLogin, handleChange, handleGoogleLogin };
};