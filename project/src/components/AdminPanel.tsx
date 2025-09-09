import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, Plus, Edit, Trash2, Calendar, LogOut, Save, X, ArrowLeft } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  views: number;
  likes: number;
  featured: boolean;
  comments: Comment[];
  shares: number;
}

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  likes: number;
}

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    image: '',
    featured: false
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: 'The Future of AI in Healthcare: Transforming Patient Care',
      excerpt: 'Explore how artificial intelligence is revolutionizing healthcare delivery, from diagnostic accuracy to personalized treatment plans.',
      content: 'Artificial Intelligence is reshaping the healthcare landscape in unprecedented ways. From early disease detection to personalized treatment protocols, AI technologies are enabling healthcare providers to deliver more precise, efficient, and effective care. At Allectrix AI, we are at the forefront of this transformation, developing wearable technologies that harness the power of AI to monitor health in real-time.',
      author: 'Dr. Sarah Johnson',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'AI Technology',
      image: 'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=800',
      views: 1250,
      likes: 89,
      featured: true,
      comments: [
        { id: 1, author: 'John Doe', content: 'Great insights on AI in healthcare!', date: '2024-01-16', likes: 5 },
        { id: 2, author: 'Jane Smith', content: 'Very informative article. Looking forward to more.', date: '2024-01-17', likes: 3 }
      ],
      shares: 45
    },
    {
      id: 2,
      title: 'Wearable Technology: The Next Frontier in Health Monitoring',
      excerpt: 'Discover how next-generation wearables are making continuous health monitoring accessible and actionable for everyone.',
      content: 'Wearable technology has evolved far beyond simple step counters and heart rate monitors. Today\'s advanced wearables are sophisticated health monitoring systems that can track multiple vital signs, detect anomalies, and provide real-time health insights.',
      author: 'Michael Chen',
      date: '2024-01-10',
      readTime: '6 min read',
      category: 'Wearable Tech',
      image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800',
      views: 980,
      likes: 67,
      featured: true,
      comments: [
        { id: 3, author: 'Alex Wilson', content: 'Amazing technology! Can\'t wait to try it.', date: '2024-01-11', likes: 8 }
      ],
      shares: 32
    }
  ]);

  const categories = ['AI Technology', 'Machine Learning', 'Business Intelligence', 'Data Security'];

  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuth');
    const saved = localStorage.getItem('blogPosts');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    if (saved) {
      setBlogPosts(JSON.parse(saved));
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === 'allectrix2024') {
        setIsAuthenticated(true);
        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
      } else {
        setError('Invalid username or password');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    navigate('/');
  };

  const handleAddPost = () => {
    if (newPost.title && newPost.excerpt && newPost.content && newPost.author && newPost.category) {
      const post: BlogPost = {
        id: blogPosts.length + 1,
        ...newPost,
        date: new Date().toISOString().split('T')[0],
        readTime: `${Math.ceil(newPost.content.length / 200)} min read`,
        image: newPost.image || 'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=800',
        views: 0,
        likes: 0,
        comments: [],
        shares: 0
      };
      const updatedPosts = [post, ...blogPosts];
      setBlogPosts(updatedPosts);
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
      setNewPost({
        title: '',
        excerpt: '',
        content: '',
        author: '',
        category: '',
        image: '',
        featured: false
      });
      setShowAddForm(false);
    }
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setNewPost({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      image: post.image,
      featured: post.featured
    });
  };

  const handleUpdatePost = () => {
    if (editingPost && newPost.title && newPost.excerpt && newPost.content && newPost.author && newPost.category) {
      const updatedPosts = blogPosts.map(post => 
        post.id === editingPost.id 
          ? { ...post, ...newPost, readTime: `${Math.ceil(newPost.content.length / 200)} min read` }
          : post
      );
      setBlogPosts(updatedPosts);
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
      setEditingPost(null);
      setNewPost({
        title: '',
        excerpt: '',
        content: '',
        author: '',
        category: '',
        image: '',
        featured: false
      });
    }
  };

  const handleDeletePost = (id: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const updatedPosts = blogPosts.filter(post => post.id !== id);
      setBlogPosts(updatedPosts);
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    }
  };

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-blue-900 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <button
              onClick={() => navigate('/')}
              className="absolute top-6 left-6 text-white hover:text-emerald-400 transition-colors duration-200"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Admin Login</h2>
            <p className="text-gray-600">Access Allectrix AI Blog Administration</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Demo Credentials:</p>
            <p>Username: <code className="bg-gray-100 px-2 py-1 rounded">admin</code></p>
            <p>Password: <code className="bg-gray-100 px-2 py-1 rounded">allectrix2024</code></p>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="mr-4 text-gray-600 hover:text-emerald-600 transition-colors duration-200"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg mr-3 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-2xl font-bold text-slate-800">Allectrix AI - Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-emerald-600 mb-2">{blogPosts.length}</div>
            <div className="text-gray-600">Total Posts</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">{blogPosts.filter(p => p.featured).length}</div>
            <div className="text-gray-600">Featured Posts</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-2">{blogPosts.reduce((sum, p) => sum + p.views, 0)}</div>
            <div className="text-gray-600">Total Views</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-orange-600 mb-2">{blogPosts.reduce((sum, p) => sum + p.likes, 0)}</div>
            <div className="text-gray-600">Total Likes</div>
          </div>
        </div>

        {/* Add Post Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 transform hover:scale-105"
          >
            <Plus className="h-5 w-5" />
            Add New Post
          </button>
        </div>

        {/* Add/Edit Post Form */}
        {(showAddForm || editingPost) && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-800">
                {editingPost ? 'Edit Post' : 'Add New Post'}
              </h3>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingPost(null);
                  setNewPost({
                    title: '',
                    excerpt: '',
                    content: '',
                    author: '',
                    category: '',
                    image: '',
                    featured: false
                  });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Post Title *</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter post title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
                <input
                  type="text"
                  value={newPost.author}
                  onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Author name"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  value={newPost.image}
                  onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Post Excerpt *</label>
              <textarea
                value={newPost.excerpt}
                onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Brief description of the post"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Post Content *</label>
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Write your post content here..."
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newPost.featured}
                  onChange={(e) => setNewPost({ ...newPost, featured: e.target.checked })}
                  className="mr-2 w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <span className="text-sm font-medium text-gray-700">Featured Post</span>
              </label>
              <button
                onClick={editingPost ? handleUpdatePost : handleAddPost}
                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {editingPost ? 'Update Post' : 'Publish Post'}
              </button>
            </div>
          </div>
        )}

        {/* Posts List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-slate-800">Manage Posts</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stats</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-12 h-12 rounded-lg object-cover mr-4"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{post.title}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.date).toLocaleDateString()}
                            {post.featured && (
                              <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">Featured</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {post.views}
                        </div>
                        <div>❤️ {post.likes}</div>
                        <div>💬 {post.comments.length}</div>
                        <div>📤 {post.shares}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditPost(post)}
                          className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;