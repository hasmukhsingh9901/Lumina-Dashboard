
import { toast } from 'sonner';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
}

const API_URL = 'https://jsonplaceholder.typicode.com';

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || `Error: ${response.status} ${response.statusText}`;
    throw new Error(errorMessage);
  }
  return response.json();
};

// Helper to get auth token
const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  // Fetch posts with pagination, search, and filtering
  async getPosts(page: number = 1, limit: number = 5, search: string = '', filterById: string = ''): Promise<PostsResponse> {
    try {
      // In a real app, these params would be sent to the server
      // For JSONPlaceholder, we'll fetch all and filter client-side
      const response = await fetch(`${API_URL}/posts`, {
        headers: {
          ...getAuthHeaders()
        }
      });
      
      const allPosts: Post[] = await handleResponse(response);
      
      // Filter posts based on search and filterById
      let filteredPosts = allPosts;
      
      if (search) {
        const searchLower = search.toLowerCase();
        filteredPosts = filteredPosts.filter(post => 
          post.title.toLowerCase().includes(searchLower) || 
          post.body.toLowerCase().includes(searchLower)
        );
      }
      
      if (filterById) {
        const id = parseInt(filterById);
        if (!isNaN(id)) {
          filteredPosts = filteredPosts.filter(post => post.id === id);
        }
      }
      
      // Calculate pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
      
      return {
        posts: paginatedPosts,
        total: filteredPosts.length
      };
    } catch (error) {
      toast.error('Failed to fetch posts');
      console.error('Error fetching posts:', error);
      throw error;
    }
  },
  
  // Get a single post by ID
  async getPost(id: number): Promise<Post> {
    try {
      const response = await fetch(`${API_URL}/posts/${id}`, {
        headers: {
          ...getAuthHeaders()
        }
      });
      
      return handleResponse(response);
    } catch (error) {
      toast.error(`Failed to fetch post #${id}`);
      console.error(`Error fetching post #${id}:`, error);
      throw error;
    }
  }
};
