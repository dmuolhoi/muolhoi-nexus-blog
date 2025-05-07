
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPublishedPosts, searchPosts } from "@/lib/api";
import { Post } from "@/lib/supabase";
import PostCard from "@/components/blog/PostCard";
import { Loader2, SearchX } from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

const POSTS_PER_PAGE = 6;

const BlogPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("search");
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        let data: Post[];
        
        if (query) {
          setSearching(true);
          data = await searchPosts(query);
        } else {
          setSearching(false);
          data = await getPublishedPosts();
        }
        
        setPosts(data);
        setTotalPages(Math.ceil(data.length / POSTS_PER_PAGE));
        setCurrentPage(1); // Reset to first page on new search
      } catch (err: any) {
        setError(err.message || "Failed to fetch blog posts");
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [query]);

  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-dm-gray500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-dm-gray700 mb-4">Failed to load blog posts.</p>
        <p className="text-sm text-dm-gray500">{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-10 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Blog</h2>
        
        {searching ? (
          <div className="flex flex-col items-center">
            <SearchX className="h-16 w-16 text-dm-gray400 mb-4" />
            <p className="text-dm-gray700">No posts found matching "{query}".</p>
            <p className="text-sm text-dm-gray500 mt-2">Try a different search term.</p>
          </div>
        ) : (
          <p className="text-dm-gray700">No blog posts yet. Check back soon!</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Blog</h1>
        {searching && (
          <p className="text-dm-gray600 mt-1">
            Search results for: <span className="font-medium">"{query}"</span>
            <span className="text-dm-gray500 ml-2">({posts.length} {posts.length === 1 ? 'result' : 'results'})</span>
          </p>
        )}
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(currentPage - 1)} 
                  className="cursor-pointer"
                />
              </PaginationItem>
            )}
            
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              // Show first page, last page, and pages around current page
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      isActive={pageNumber === currentPage}
                      onClick={() => handlePageChange(pageNumber)}
                      className="cursor-pointer"
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              // Show ellipsis for skipped pages
              if (
                (pageNumber === currentPage - 2 && pageNumber > 2) ||
                (pageNumber === currentPage + 2 && pageNumber < totalPages - 1)
              ) {
                return <PaginationItem key={pageNumber}>...</PaginationItem>;
              }
              return null;
            })}
            
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(currentPage + 1)} 
                  className="cursor-pointer"
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default BlogPage;
