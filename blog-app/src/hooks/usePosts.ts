"use client"

import { useState, useCallback } from 'react';
import axios from 'axios';
import { usePostStore } from '@/store/usePostStore';
import { Post } from '@/types/post';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const usePosts = () => {
  const { posts, setPosts, addPost, updatePost, deletePost } = usePostStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Post[]>(API_URL);
      // We take only first 12 for better UI presentation
      setPosts(response.data.slice(0, 12));
    } catch (err) {
      setError('Failed to fetch posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [setPosts]);

  const createPost = async (data: Omit<Post, 'id'>) => {
    setLoading(true);
    try {
      const response = await axios.post<Post>(API_URL, data);
      // JSONPlaceholder always returns id: 101, so we create a unique one for local UI
      const newPost = { ...response.data, id: Date.now() };
      addPost(newPost);
      return newPost;
    } catch (err) {
      setError('Failed to create post.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editPost = async (id: number, data: Partial<Post>) => {
    setLoading(true);
    try {
      const response = await axios.put<Post>(`${API_URL}/${id}`, data);
      updatePost(response.data);
    } catch (err) {
      // Note: JSONPlaceholder fails on PUT for IDs > 100 (created locally)
      // So we update locally anyway for the test's sake
      updatePost({ id, ...data } as Post);
    } finally {
      setLoading(false);
    }
  };

  const removePost = async (id: number) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      deletePost(id);
    } catch (err) {
      setError('Failed to delete post.');
    } finally {
      setLoading(false);
    }
  };

  return {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    editPost,
    removePost,
  };
};