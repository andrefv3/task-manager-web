import { useActionState, startTransition } from 'react';
import type { RegisterCredentials } from '@/shared/types';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import axios from 'axios';
import { useAuth } from './useAuth';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const registerSchema = z.object({
  name: z.string().min(2, 'How should we call you? We need at least 2 characters'),
  lastName: z.string().optional(), 
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

type RegisterErrors = Partial<Record<keyof z.infer<typeof registerSchema> | 'global', string>>;

export const useRegisterForm = () => {
    const navigate = useNavigate();
    const { register, login } = useAuth();

    // useActionState from React 19:
    // Return: [state_error, action_for_the_form, is_submitting]
    const [errors, formAction, isSubmitting] = useActionState(
        async (_previousState: RegisterErrors, formData: FormData) => {
            // We extract the data from FormData natively
            const rawData = Object.fromEntries(formData);
            
            // 1. Zod Validation
            const result = registerSchema.safeParse(rawData);
            
            if (!result.success) {
                const fieldErrors: RegisterErrors = {};
                result.error.issues.forEach((err) => {
                    const key = err.path[0];
                    if (typeof key === 'string') fieldErrors[key as keyof RegisterErrors] = err.message;
                });
                return fieldErrors; // This becomes the new value of 'errors'
            }

            try {
                // 2. Execute logic (Register) 
                const values = result.data;
                await register(values as RegisterCredentials);
                await login({ email: values.email, password: values.password });
                
                navigate('/dashboard', { replace: true });
                return {}; 
            } catch (err) {
                if (axios.isAxiosError(err) && err.response?.status === 409) {
                    return { email: 'This email is already registered' };
                }
                return { global: 'Something went wrong. Please try again.' };
            }
        },
        {} // Initial state for errors (empty object)
    );

    // Wrapper for managing the form event
    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        // startTransition allows the UI to not block during the action
        startTransition(() => {
            formAction(formData);
        });
    };

    return { 
        errors: errors as Record<string, string>, 
        isSubmitting, 
        handleRegister 
    };
};