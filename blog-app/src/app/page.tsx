"use client"

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { ArrowRight, BookOpen, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col items-center space-y-24 bg-background dark:bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] dark:from-blue-900/20 dark:via-zinc-950 dark:to-zinc-950 min-h-screen">
      {/* Hero Section */}
      <section className="py-24 text-center space-y-8 max-w-4xl animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-sm font-semibold dark:bg-zinc-900/50 dark:border-zinc-800 dark:text-zinc-400">
          <Sparkles className="w-4 h-4" />
          Welcome to BlogApp Platform
        </div>
        
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-b dark:from-white dark:to-zinc-400">
          Create & Share Your Stories
        </h1>
        
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed dark:text-zinc-400">
          A modern platform built for technical writers. Create beautifully formatted blog posts with an intuitive editor, secure authentication, and seamless content management.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href={isAuthenticated ? "/dashboard" : "/login"}
            className="w-fit mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all px-8 py-4 text-base gap-2 group rounded-lg text-white font-semibold flex items-center"
          >
            {isAuthenticated ? "Go to Dashboard" : "Get Started Free"} 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/"
            className="btn btn-outline px-8 py-4 text-base"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full space-y-12 py-24">
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white">Powerful Features</h2>
          <p className="text-slate-600 text-lg dark:text-zinc-400">Everything you need to manage your blog</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white border border-slate-200 shadow-sm p-8 rounded-2xl space-y-4 group hover:border-blue-400 hover:shadow-md transition-all duration-300 animate-slide-up dark:bg-white/[0.02] dark:border-white/[0.05] dark:hover:bg-white/[0.05] dark:shadow-none">
            <div className="w-14 h-14 bg-blue-50 flex items-center justify-center rounded-xl text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Secure Authentication</h3>
            <p className="text-slate-600 leading-relaxed dark:text-zinc-400">
              JWT-based authentication with protected routes and persistent sessions. Your data is always safe and secure.
            </p>
            <div className="pt-4 border-t border-slate-200 dark:border-white/[0.05]">
              <span className="badge badge-primary">Security First</span>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white border border-slate-200 shadow-sm p-8 rounded-2xl space-y-4 group hover:border-blue-400 hover:shadow-md transition-all duration-300 animate-slide-up dark:bg-white/[0.02] dark:border-white/[0.05] dark:hover:bg-white/[0.05] dark:shadow-none" style={{ animationDelay: '0.1s' }}>
            <div className="w-14 h-14 bg-indigo-50 flex items-center justify-center rounded-xl text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 group-hover:scale-110 transition-transform">
              <BookOpen className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Rich Text Editor</h3>
            <p className="text-slate-600 leading-relaxed dark:text-zinc-400">
              Write beautifully formatted posts with our integrated React Quill editor. Full control over your content styling.
            </p>
            <div className="pt-4 border-t border-slate-200 dark:border-white/[0.05]">
              <span className="badge badge-secondary">Pro Writing</span>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white border border-slate-200 shadow-sm p-8 rounded-2xl space-y-4 group hover:border-blue-400 hover:shadow-md transition-all duration-300 animate-slide-up dark:bg-white/[0.02] dark:border-white/[0.05] dark:hover:bg-white/[0.05] dark:shadow-none" style={{ animationDelay: '0.2s' }}>
            <div className="w-14 h-14 bg-cyan-50 flex items-center justify-center rounded-xl text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Lightning Fast</h3>
            <p className="text-slate-600 leading-relaxed dark:text-zinc-400">
              Instant search and filtering, smooth animations, and optimized performance. Experience the speed difference.
            </p>
            <div className="pt-4 border-t border-slate-200 dark:border-white/[0.05]">
              <span className="badge badge-accent">Performance</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="w-full bg-slate-50 border border-slate-200 p-12 space-y-6 text-center rounded-2xl dark:bg-zinc-900/50 dark:border-zinc-800">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Ready to start writing?</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto dark:text-zinc-400">
            Join thousands of writers and creators who are already using BlogApp to share their stories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn btn-primary px-8 py-3">
              Create Free Account
            </Link>
            <Link href="/login" className="btn btn-outline px-8 py-3">
              Sign In
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}