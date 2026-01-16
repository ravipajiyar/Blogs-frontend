"use client"

import React, { useEffect, useState } from 'react';
import { usePosts } from '@/hooks/usePosts';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Search, Plus, Trash2, Edit3, ChevronLeft, ChevronRight, Loader2, LayoutGrid } from 'lucide-react';
import Link from 'next/link';

const POSTS_PER_PAGE = 6;

export default function DashboardPage() {
  const { posts, loading, error, fetchPosts, removePost } = usePosts();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <ProtectedRoute>
      <div className="space-y-8 animate-fade-in">
        {/* Header with CTA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
          <div>
            <h1 className="text-4xl font-semibold text-white flex items-center gap-3">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <LayoutGrid className="w-6 h-6 text-blue-400" />
              </div>
              Your Posts
            </h1>
            <p className="text-zinc-400 mt-2">Manage and publish your blog posts</p>
          </div>
          <Link 
            href="/dashboard/create" 
            className="btn btn-primary px-6 py-3 gap-2 whitespace-nowrap justify-center md:justify-start"
          >
            <Plus className="w-5 h-5" /> Create New Post
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search posts by title..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="input pl-12 bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-blue-500/50"
          />
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-zinc-900/50 border border-red-900/50 p-4 text-red-400 rounded-lg">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-4" />
            <p className="text-zinc-400">Loading your posts...</p>
          </div>
        ) : (
          <>
            {/* Post Grid */}
            {paginatedPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedPosts.map((post, index) => (
                  <div 
                    key={post.id} 
                    className="bg-white/[0.02] backdrop-blur-md border border-white/[0.05] p-6 rounded-2xl hover:border-blue-500/50 hover:bg-white/[0.05] transition-all duration-300 group animate-slide-up flex flex-col justify-between"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed">
                        {post.body.replace(/<[^>]*>?/gm, '')}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between gap-2 border-t border-white/[0.05] pt-4 mt-4">
                      <span className="badge badge-primary text-xs">
                        Post
                      </span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => removePost(post.id)}
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <Link 
                          href={`/dashboard/edit/${post.id}`}
                          className="p-2 text-zinc-400 hover:text-white hover:bg-white/[0.05] rounded-lg transition-colors"
                          title="Edit post"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/[0.02] backdrop-blur-md border border-white/[0.05] p-12 text-center space-y-4 rounded-2xl border-dashed">
                <LayoutGrid className="w-12 h-12 text-zinc-500 mx-auto opacity-50" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">No posts found</h3>
                  <p className="text-zinc-400">
                    {searchQuery ? 'Try adjusting your search query.' : 'Start writing your first blog post!'}
                  </p>
                </div>
                {!searchQuery && (
                  <Link href="/dashboard/create" className="btn btn-primary mt-4 inline-block px-6 py-2">
                    Create Your First Post
                  </Link>
                )}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-zinc-800">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="btn btn-outline p-2 disabled:opacity-30 disabled:cursor-not-allowed border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-900 hover:border-zinc-700"
                  title="Previous page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                        currentPage === page
                          ? 'btn btn-primary'
                          : 'btn btn-outline hover:bg-zinc-900 border-zinc-800 bg-zinc-900/50 text-zinc-400'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="btn btn-outline p-2 disabled:opacity-30 disabled:cursor-not-allowed border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-900 hover:border-zinc-700"
                  title="Next page"
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