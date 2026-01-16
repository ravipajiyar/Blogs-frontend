"use client"

import React, { useEffect, useState } from 'react';
import { usePosts } from '@/hooks/usePosts';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Search, Plus, Trash2, Edit3, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

const POSTS_PER_PAGE = 6;

export default function DashboardPage() {
  const { posts, loading, error, fetchPosts, removePost } = usePosts();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Filter logic (Search Bonus)
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic (Pagination Bonus)
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Your Feed</h1>
          <Link 
            href="/dashboard/create" 
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" /> Create New Post
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Search posts by title..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to page 1 on search
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-card outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Error State */}
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && posts.length === 0 ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          </div>
        ) : (
          <>
            {/* Post Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPosts.map((post) => (
                <div key={post.id} className="group bg-card border rounded-xl p-5 hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                      {post.body.replace(/<[^>]*>?/gm, '')} {/* Strip HTML for preview */}
                    </p>
                  </div>
                  <div className="flex items-center justify-end gap-2 border-t pt-4">
                    <button 
                      onClick={() => removePost(post.id)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <Link 
                      href={`/dashboard/edit/${post.id}`}
                      className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-xl border-2 border-dashed">
                <p className="text-muted-foreground">No posts found matching your search.</p>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 border rounded-lg disabled:opacity-30 hover:bg-accent"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 border rounded-lg disabled:opacity-30 hover:bg-accent"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}