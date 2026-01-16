"use client"

import React, { useState } from 'react';
import PostForm from '@/components/PostForm';
import { usePosts } from '@/hooks/usePosts';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function CreatePostPage() {
  const { createPost } = usePosts();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async (data: { title: string; body: string }) => {
    setLoading(true);
    try {
      await createPost(data);
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <PostForm 
        title="Create New Post" 
        onSubmit={handleCreate} 
        isSubmitting={loading} 
      />
    </ProtectedRoute>
  );
}