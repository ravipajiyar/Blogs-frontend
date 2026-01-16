"use client"

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import dynamic from 'next/dynamic';
import { Loader2, Save, X, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <div className="h-40 w-full bg-muted animate-pulse rounded-lg" />
});

const postSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  body: z.string().min(10, "Content must be at least 10 characters"),
});

type PostFormValues = z.infer<typeof postSchema>;

interface PostFormProps {
  initialData?: PostFormValues;
  onSubmit: (data: PostFormValues) => Promise<void>;
  isSubmitting: boolean;
  title: string;
}

export default function PostForm({ initialData, onSubmit, isSubmitting, title }: PostFormProps) {
  const router = useRouter();
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/[0.02] backdrop-blur-md border border-white/[0.05] p-6 md:p-8 rounded-2xl animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <h1 className="text-3xl font-semibold text-white">{title}</h1>
          </div>
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-white/[0.05] rounded-lg transition-colors text-zinc-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white">Post Title</label>
            <input
              {...register('title')}
              placeholder="Enter a catchy title for your post..."
              className={`input bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-blue-500/50 ${errors.title ? 'input-error border-red-900/50' : ''}`}
            />
            {errors.title && (
              <p className="mt-2 text-sm font-medium text-red-400 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white">Content</label>
            <div className="rounded-lg border border-zinc-800 overflow-hidden bg-zinc-900/50">
              <Controller
                name="body"
                control={control}
                render={({ field }) => (
                  <ReactQuill 
                    theme="snow" 
                    value={field.value} 
                    onChange={field.onChange}
                    placeholder="Write your amazing content here..."
                  />
                )}
              />
            </div>
            {errors.body && (
              <p className="mt-2 text-sm font-medium text-red-400 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                {errors.body.message}
              </p>
            )}
          </div>

          <div className="flex gap-4 pt-6 border-t border-white/[0.05]">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary flex-1 px-6 py-3 gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Publish Post
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="btn btn-outline px-6 py-3 border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-900 hover:border-zinc-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}