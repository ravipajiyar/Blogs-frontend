"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

// Form Validation Schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await login(data.email);
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md p-8 space-y-6 bg-card border rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Enter your credentials to access your blog</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              {...register('email')}
              type="email"
              placeholder="name@example.com"
              className={`w-full p-2.5 rounded-lg border bg-background outline-none focus:ring-2 transition-all ${
                errors.email ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200 focus:border-blue-500'
              }`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              {...register('password')}
              type="password"
              placeholder="••••••••"
              className={`w-full p-2.5 rounded-lg border bg-background outline-none focus:ring-2 transition-all ${
                errors.password ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200 focus:border-blue-500'
              }`}
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-blue-600 hover:underline font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}