"use client"

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { ArrowRight, BookOpen, ShieldCheck, Zap } from 'lucide-react';

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="py-20 text-center space-y-6 max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          A Modern Platform for <span className="text-blue-600">Technical Writers</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Create, edit, and manage your blog posts with a professional-grade editor and seamless authentication.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href={isAuthenticated ? "/dashboard" : "/login"}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all transform hover:scale-105"
          >
            {isAuthenticated ? "Go to Dashboard" : "Get Started"} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8 py-20 w-full border-t">
        <div className="p-6 bg-card border rounded-2xl space-y-3">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center rounded-xl text-blue-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Secure Auth</h3>
          <p className="text-muted-foreground">JWT-based authentication with protected routes and persistent sessions.</p>
        </div>

        <div className="p-6 bg-card border rounded-2xl space-y-3">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center rounded-xl text-purple-600">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Rich Content</h3>
          <p className="text-muted-foreground">Write beautifully formatted posts using our integrated rich-text editor.</p>
        </div>

        <div className="p-6 bg-card border rounded-2xl space-y-3">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 flex items-center justify-center rounded-xl text-green-600">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Fast Search</h3>
          <p className="text-muted-foreground">Instantly find your articles with high-performance client-side filtering.</p>
        </div>
      </section>
    </div>
  );
}