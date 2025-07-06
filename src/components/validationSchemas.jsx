import { z } from 'zod';

export const signUpSchema = z
  .object({
    name: z.string().min(1, { message: 'Full Name is required' }),
    email: z.string().email({ message: 'Enter a valid email' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string().min(6, { message: 'Confirm password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

  export const LoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
