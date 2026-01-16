"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2, UserPlus, Mail, Lock, User } from 'lucide-react';

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Registered:", data);
    router.push('/login');
    setIsSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="p-4 bg-indigo-500/10 rounded-2xl">
              <UserPlus className="w-8 h-8 text-indigo-400" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-white">Create Account</h1>
          <p className="text-zinc-400">Join our community of writers and creators</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white/[0.02] backdrop-blur-md border border-white/[0.05] p-8 rounded-2xl space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
              <input
                {...register('name')}
                placeholder="John Doe"
                className={`input pl-12 bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-blue-500/50 ${errors.name ? 'input-error border-red-900/50' : ''}`}
              />
            </div>
            {errors.name && (
              <p className="text-sm font-medium text-red-400 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                {errors.name.message}
              </p>
            )}
          </div>

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
            <label className="block text-sm font-semibold text-white">Password</label>
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

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
              <input
                {...register('confirmPassword')}
                type="password"
                placeholder="••••••••"
                className={`input pl-12 bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-blue-500/50 ${errors.confirmPassword ? 'input-error border-red-900/50' : ''}`}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-sm font-medium text-red-400 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-secondary w-full py-3 gap-2 mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                Create Account
              </>
            )}
          </button>
        </form>

        <p className="text-center text-zinc-400">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-400 hover:text-blue-300 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}