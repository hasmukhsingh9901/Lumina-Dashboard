
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { api, Post } from '@/services/api';
import Header from '@/components/Header';
import PostCard from '@/components/PostCard';
import SearchFilter from '@/components/SearchFilter';
import Pagination from '@/components/Pagination';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [search, setSearch] = useState('');
  const [idFilter, setIdFilter] = useState('');
  
  const postsPerPage = 5;
  
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await api.getPosts(currentPage, postsPerPage, search, idFilter);
        setPosts(response.posts);
        setTotalPosts(response.total);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, [currentPage, search, idFilter]);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    
    // Scroll to top of posts section
    document.getElementById('posts-section')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1); // Reset to first page on search
  };
  
  const handleIdFilterChange = (value: string) => {
    setIdFilter(value);
    setCurrentPage(1); // Reset to first page on filter
  };
  
  const totalPages = Math.max(1, Math.ceil(totalPosts / postsPerPage));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-6 md:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome, {user?.username}</h1>
          <p className="text-muted-foreground">
            Here's a list of posts from JSONPlaceholder API.
          </p>
        </div>
        
        <div className="mb-8">
          <SearchFilter
            onSearchChange={handleSearchChange}
            onIdFilterChange={handleIdFilterChange}
          />
        </div>
        
        <section id="posts-section" className="mb-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 glass-panel rounded-lg">
              <h3 className="text-lg font-medium">No posts found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </section>
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
      
      <footer className="border-t py-4 px-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Lumina Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
