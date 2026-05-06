import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import axios from 'axios';
import { useAuth } from './useAuth';
import type { RegisterCredentials } from '@/shared/types/auth';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const registerSchema = z.object({
  name: z.string().min(2, 'How should we call you? We need at least 2 characters'),
  email: z.string()
    .min(1, 'Email is required')
    .regex(EMAIL_REGEX, 'Please enter a valid email address')
    .refine(email => !email.endsWith('.temp') && !email.endsWith('.mailinator.com'), {
      message: 'We do not accept temporary email addresses'
    }),
  password: z.string()
    .min(8, 'Password must have at least 8 characters')
    .regex(/[A-Z]/, 'Must include at least one uppercase letter')
    .regex(/[a-z]/, 'Must include at least one lowercase letter')
    .regex(/[0-9]/, 'Must include at least one number')
    .regex(/[^A-Za-z0-9]/, 'Must include a special character'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], 
});

export const useRegisterForm = () => {
    const [values, setValues] = useState<RegisterCredentials>({
        name: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { register, login } = useAuth(); 

    const handleChange = (field: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues(prev => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = registerSchema.safeParse(values);
        
        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            
            const { fieldErrors: flattenedErrors } = result.error.flatten();
            
            Object.entries(flattenedErrors).forEach(([field, messages]) => {
                if (messages && messages.length > 0) {
                    fieldErrors[field] = messages[0];
                }
            });
            
            return setErrors(fieldErrors);
        }

        setIsSubmitting(true);
        try {
            await register(values);
            await login({ email: values.email, password: values.password });
            navigate('/dashboard', { replace: true });
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 409) {
                setErrors({ email: 'This email is already registered' });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return { values, errors, isSubmitting, handleRegister, handleChange };
};