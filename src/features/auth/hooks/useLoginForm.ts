import { useState, type ChangeEvent, type FormEvent } from 'react';
import { z } from 'zod';
import { useAuth } from './useAuth';
import axios from 'axios';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'The email is mandatory')
    .email('Invalid email format')
    .refine((val) => !val.includes('asd@asd'), {
      message: 'Please enter a valid corporate or personal email',
    })
    .refine((val) => {
      const domain = val.split('@')[1];
      return domain && domain.includes('.') && domain.split('.').pop()!.length >= 2;
    }, { message: 'The email domain is incomplete' }),
  password: z
    .string()
    .min(1, 'The password is mandatory')
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const useLoginForm = () => {
  const { login } = useAuth();
  const [values, setValues] = useState<LoginFormValues>({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof LoginFormValues) => (e: ChangeEvent<HTMLInputElement>) => {
    setValues(prev => ({ ...prev, [field]: e.target.value }));
    // Limpieza de error optimista: solo si el usuario empieza a corregir
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validation with Zod
    const result = loginSchema.safeParse(values);
    
    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: formattedErrors.email?.[0],
        password: formattedErrors.password?.[0],
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await login(values);
    } catch (err) {
      const message = axios.isAxiosError(err) ? err.response?.data?.message : 'Network error';
      setErrors({ password: message || 'Unauthorized credentials' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { values, errors, isSubmitting, handleLogin, handleChange };
};