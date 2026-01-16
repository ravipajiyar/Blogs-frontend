"use client"

import React, { useEffect, useState } from 'react';
import PostForm from '@/components/PostForm';
import { usePosts } from '@/hooks/usePosts';
import { useRouter, useParams } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function EditPostPage() {
  const { posts, editPost } = usePosts();
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Find post from local state
  const postToEdit = posts.find(p => p.id === Number(id));

  useEffect(() => {
    if (!postToEdit && posts.length > 0) {
      router.push('/dashboard');
    }
  }, [postToEdit, posts, router]);

  const handleEdit = async (data: { title: string; body: string }) => {
    setLoading(true);
    try {
      await editPost(Number(id), data);
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      {postToEdit ? (
        <PostForm 
          title="Edit Post" 
          initialData={{ title: postToEdit.title, body: postToEdit.body }}
          onSubmit={handleEdit} 
          isSubmitting={loading} 
        />
      ) : (
        <div className="text-center py-20">Loading post data...</div>
      )}
    </ProtectedRoute>
  );
}