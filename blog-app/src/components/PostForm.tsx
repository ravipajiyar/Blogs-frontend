"use client"

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import dynamic from 'next/dynamic';
import { Loader2, Save, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import 'react-quill/dist/quill.snow.css';

// Dynamic import for Rich Text Editor
const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <div className="h-40 w-full bg-gray-100 animate-pulse rounded-lg" />
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

  // Sync initial data if editing
  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  return (
    <div className="max-w-3xl mx-auto bg-card border rounded-xl shadow-sm p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">{title}</h1>
        <button 
          onClick={() => router.back()}
          className="p-2 hover:bg-accent rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Post Title</label>
          <input
            {...register('title')}
            placeholder="Enter a catchy title..."
            className={`w-full p-3 rounded-lg border bg-background outline-none focus:ring-2 transition-all ${
              errors.title ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200 focus:border-blue-500'
            }`}
          />
          {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <div className="prose dark:prose-invert max-w-none">
            <Controller
              name="body"
              control={control}
              render={({ field }) => (
                <ReactQuill 
                  theme="snow" 
                  value={field.value} 
                  onChange={field.onChange}
                  className="bg-background rounded-lg"
                />
              )}
            />
          </div>
          {errors.body && <p className="mt-1 text-sm text-red-500">{errors.body.message}</p>}
        </div>

        <div className="flex gap-4 pt-4 border-t">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <><Save className="w-4 h-4" /> Save Post</>
            )}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border rounded-lg hover:bg-accent transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}