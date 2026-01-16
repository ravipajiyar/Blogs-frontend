import { create } from 'zustand';
import { Post } from '@/types/post';

interface PostState {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  updatePost: (post: Post) => void;
  deletePost: (id: number) => void;
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  updatePost: (updatedPost) => set((state) => ({
    posts: state.posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)),
  })),
  deletePost: (id) => set((state) => ({
    posts: state.posts.filter((p) => p.id !== id),
  })),
}));