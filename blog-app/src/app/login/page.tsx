"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, LogIn, Mail, Lock } from 'lucide-react';

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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await login(data.email);
    setIsSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="p-4 bg-blue-500/10 rounded-2xl">
              <LogIn className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-white">Welcome Back</h1>
          <p className="text-zinc-400">Sign in to your account to manage your blog</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white/[0.02] backdrop-blur-md border border-white/[0.05] p-8 rounded-2xl space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
              <input
                {...register('email')}
                type="email"
                placeholder="name@example.com"
                className={`input pl-12 bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-blue-500/50 ${errors.email ? 'input-error border-red-900/50' : ''}`}
              />
            </div>
            {errors.email && (
              <p className="text-sm font-medium text-red-400 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-white">Password</label>
              <Link href="#" className="text-sm text-blue-400 hover:text-blue-300 font-medium">
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
              <input
                {...register('password')}
                type="password"
                placeholder="••••••••"
                className={`input pl-12 bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-blue-500/50 ${errors.password ? 'input-error border-red-900/50' : ''}`}
              />
            </div>
            {errors.password && (
              <p className="text-sm font-medium text-red-400 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full py-3 gap-2 mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Sign In
              </>
            )}
          </button>
        </form>

        <p className="text-center text-zinc-400">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-blue-400 hover:text-blue-300 font-semibold">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}