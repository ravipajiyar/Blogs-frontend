"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

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
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md p-8 space-y-6 bg-card border rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-muted-foreground mt-2">Join our blog community today</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              {...register('name')}
              placeholder="John Doe"
              className="w-full p-2.5 rounded-lg border bg-background outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              {...register('email')}
              type="email"
              placeholder="name@example.com"
              className="w-full p-2.5 rounded-lg border bg-background outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              {...register('password')}
              type="password"
              placeholder="••••••••"
              className="w-full p-2.5 rounded-lg border bg-background outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              {...register('confirmPassword')}
              type="password"
              placeholder="••••••••"
              className="w-full p-2.5 rounded-lg border bg-background outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
            />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Register'}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}