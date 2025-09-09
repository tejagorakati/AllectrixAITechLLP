import React, { useState, useEffect } from 'react';
import { Calendar, User, Clock, Search, Filter, Eye, Heart, Share2, ArrowRight, MessageCircle, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

const Blog = () => {
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set());
  const [viewedPosts, setViewedPosts] = useState<Set<number>>(new Set());

  // Load blog posts from localStorage or use default
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('blogPosts');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
    {
      id: 1,
      title: 'The Future of AI in Business: Transforming Industries',
      excerpt: 'Explore how artificial intelligence is revolutionizing business operations, from process automation to predictive analytics.',
      content: 'Artificial Intelligence is reshaping the business landscape in unprecedented ways. From automated decision-making to predictive analytics, AI technologies are enabling companies to operate more efficiently, make better decisions, and stay competitive. At Allectrix AI, we are at the forefront of this transformation, developing intelligent solutions that harness the power of AI across various industries. Our solutions enable process automation, predictive insights, and intelligent decision-making that empower businesses to achieve their goals. The integration of AI in business is not just about technology – it\'s about creating smarter, more efficient, and more innovative organizations.',
      author: 'Dr. Sarah Johnson',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'AI Technology',
      image: 'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=800',
      views: 1250,
      likes: 89,
      featured: true,
      comments: [
        { id: 1, author: 'John Doe', content: 'Great insights on AI in business!', date: '2024-01-16', likes: 5 },
        { id: 2, author: 'Jane Smith', content: 'Very informative article. Looking forward to more.', date: '2024-01-17', likes: 3 }
      ],
      shares: 45
    },
    {
      id: 2,
      title: 'Machine Learning: The Next Frontier in Business Intelligence',
      excerpt: 'Discover how machine learning algorithms are making data-driven insights accessible and actionable for every business.',
      content: 'Machine learning has evolved far beyond simple data analysis. Today\'s advanced ML systems are sophisticated intelligence platforms that can process vast amounts of data, detect patterns, and provide real-time business insights. At Allectrix AI, our ML solutions incorporate cutting-edge algorithms and AI technologies to deliver enterprise-grade analytics in user-friendly interfaces. These systems can predict market trends, optimize operations, and provide valuable insights for business leaders. The future of machine learning lies in seamless integration with business processes, enabling intelligent automation and data-driven decision making.',
      author: 'Michael Chen',
      date: '2024-01-10',
      readTime: '6 min read',
      category: 'Machine Learning',
      image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800',
      views: 980,
      likes: 67,
      featured: true,
      comments: [
        { id: 3, author: 'Alex Wilson', content: 'Amazing technology! Can\'t wait to try it.', date: '2024-01-11', likes: 8 }
      ],
      shares: 32
    },
    {
      id: 3,
      title: 'Data Security in AI: Protecting Business Intelligence',
      excerpt: 'Understanding the critical importance of data security and privacy in AI-powered business solutions.',
      content: 'In the digital business era, protecting sensitive data is paramount. Organizations handle vast amounts of confidential information, making robust security measures essential. At Allectrix AI, we implement enterprise-grade security protocols including end-to-end encryption, secure authentication, and compliance with industry regulations. Our approach to data security encompasses not just technical safeguards, but also organizational policies and procedures that ensure data privacy is maintained throughout the entire AI lifecycle. We believe that trust is the foundation of effective AI technology, and that starts with uncompromising data security.',
      author: 'Emily Rodriguez',
      date: '2024-01-05',
      readTime: '7 min read',
      category: 'Data Security',
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
      views: 756,
      likes: 45,
      featured: false,
      comments: [],
      shares: 18
    },
    {
      id: 4,
      title: 'Predictive Analytics: The Power of AI-Driven Insights',
      excerpt: 'How proactive data analysis can prevent business problems and improve operational efficiency.',
      content: 'Prevention is always better than reaction, and modern AI is making predictive business analytics more effective than ever. Through continuous data monitoring and AI-powered analytics, we can now detect business issues before they become serious problems. Our AI solutions at Allectrix AI are designed with prediction in mind, providing early warning systems that alert business leaders to potential risks and opportunities. This proactive approach not only improves business outcomes but also reduces costs and increases efficiency. The future of business is predictive, personalized, and powered by intelligent technology.',
      author: 'Dr. David Kim',
      date: '2023-12-28',
      readTime: '5 min read',
      category: 'Business Intelligence',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800',
      views: 892,
      likes: 73,
      featured: false,
      comments: [
        { id: 4, author: 'Maria Garcia', content: 'Prevention is indeed better than cure!', date: '2023-12-29', likes: 12 }
      ],
      shares: 25
    }
    ];
  });

  // Load liked posts and comments from localStorage
  useEffect(() => {
    const savedLikedPosts = localStorage.getItem('likedPosts');
    const savedLikedComments = localStorage.getItem('likedComments');
    const savedViewedPosts = localStorage.getItem('viewedPosts');
    
    if (savedLikedPosts) {
      setLikedPosts(new Set(JSON.parse(savedLikedPosts)));
    }
    if (savedLikedComments) {
      setLikedComments(new Set(JSON.parse(savedLikedComments)));
    }
    if (savedViewedPosts) {
      setViewedPosts(new Set(JSON.parse(savedViewedPosts)));
    }
  }, []);

  // Track post views when selected
  useEffect(() => {
    if (selectedPost && !viewedPosts.has(selectedPost.id)) {
      const updatedViewedPosts = new Set(viewedPosts);
      updatedViewedPosts.add(selectedPost.id);
      setViewedPosts(updatedViewedPosts);
      localStorage.setItem('viewedPosts', JSON.stringify([...updatedViewedPosts]));
      
      // Increment view count
      const updatedPosts = blogPosts.map(post => 
        post.id === selectedPost.id ? { ...post, views: post.views + 1 } : post
      );
      setBlogPosts(updatedPosts);
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    }
  }, [selectedPost, viewedPosts, blogPosts]);

  const categories = ['All', 'AI Technology', 'Machine Learning', 'Business Intelligence', 'Data Security'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  const handleLike = (postId: number) => {
    if (likedPosts.has(postId)) {
      return; // Already liked, don't allow multiple likes
    }
    
    const updatedLikedPosts = new Set(likedPosts);
    updatedLikedPosts.add(postId);
    setLikedPosts(updatedLikedPosts);
    localStorage.setItem('likedPosts', JSON.stringify([...updatedLikedPosts]));
    
    const updatedPosts = blogPosts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setBlogPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
  };

  const handleShare = (postId: number) => {
    const updatedPosts = blogPosts.map(post => 
      post.id === postId ? { ...post, shares: post.shares + 1 } : post
    );
    setBlogPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    
    // Copy to clipboard
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  const handleAddComment = (postId: number) => {
    if (newComment.trim() && commentAuthor.trim()) {
      const comment: Comment = {
        id: Date.now(),
        author: commentAuthor,
        content: newComment,
        date: new Date().toISOString().split('T')[0],
        likes: 0
      };
      
      const updatedPosts = blogPosts.map(post => 
        post.id === postId 
          ? { ...post, comments: [...post.comments, comment] }
          : post
      );
      setBlogPosts(updatedPosts);
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
      setNewComment('');
      setCommentAuthor('');
    }
  };

  const handleCommentLike = (postId: number, commentId: number) => {
    if (likedComments.has(commentId)) {
      return; // Already liked, don't allow multiple likes
    }
    
    const updatedLikedComments = new Set(likedComments);
    updatedLikedComments.add(commentId);
    setLikedComments(updatedLikedComments);
    localStorage.setItem('likedComments', JSON.stringify([...updatedLikedComments]));
    
    const updatedPosts = blogPosts.map(post => 
      post.id === postId 
        ? {
            ...post,
            comments: post.comments.map(comment =>
              comment.id === commentId 
                ? { ...comment, likes: comment.likes + 1 }
                : comment
            )
          }
        : post
    );
    setBlogPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
  };

  // Show individual blog post
  if (selectedPost) {
    const currentPost = blogPosts.find(post => post.id === selectedPost.id) || selectedPost;
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <button
            onClick={() => setSelectedPost(null)}
            className="mb-8 text-emerald-600 hover:text-emerald-700 font-medium flex items-center transition-colors duration-200"
          >
            ← Back to Blog
          </button>
          
          <article className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto">
            <img
              src={currentPost.image}
              alt={currentPost.title}
              className="w-full h-96 object-cover"
            />
            
            <div className="p-8">
              <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">
                  {currentPost.category}
                </span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(currentPost.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {currentPost.author}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {currentPost.readTime}
                </div>
              </div>
              
              <h1 className="text-4xl font-bold text-slate-800 mb-6 leading-tight">
                {currentPost.title}
              </h1>
              
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-8">
                {currentPost.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="flex items-center gap-6 text-gray-600">
                  <button 
                    onClick={() => handleLike(currentPost.id)}
                    className={`flex items-center gap-2 transition-colors duration-200 ${
                      likedPosts.has(currentPost.id) 
                        ? 'text-red-500 cursor-not-allowed' 
                        : 'text-gray-600 hover:text-red-500 cursor-pointer'
                    }`}
                    disabled={likedPosts.has(currentPost.id)}
                  >
                    <Heart className={`h-5 w-5 ${likedPosts.has(currentPost.id) ? 'fill-current' : ''}`} />
                    <span>{likedPosts.has(currentPost.id) ? 'Liked' : 'Like'}</span>
                  </button>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MessageCircle className="h-5 w-5" />
                    <span>{currentPost.comments.length} comments</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleShare(currentPost.id)}
                  className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
                >
                  <Share2 className="h-5 w-5" />
                  Share ({currentPost.shares})
                </button>
              </div>
              
              {/* Comments Section */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">
                  Comments ({currentPost.comments.length})
                </h3>
                
                {/* Add Comment Form */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold text-slate-800 mb-4">Leave a Comment</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <textarea
                    placeholder="Write your comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent mb-4"
                  />
                  <button
                    onClick={() => handleAddComment(currentPost.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Post Comment
                  </button>
                </div>
                
                {/* Comments List */}
                <div className="space-y-4">
                  {currentPost.comments.map((comment) => (
                    <div key={comment.id} className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-emerald-600" />
                          </div>
                          <span className="font-medium text-slate-800">{comment.author}</span>
                          <span className="text-gray-500 text-sm">
                            {new Date(comment.date).toLocaleDateString()}
                          </span>
                        </div>
                        <button
                          onClick={() => handleCommentLike(currentPost.id, comment.id)}
                          className={`flex items-center gap-1 transition-colors duration-200 ${
                            likedComments.has(comment.id)
                              ? 'text-red-500 cursor-not-allowed'
                              : 'text-gray-500 hover:text-red-500 cursor-pointer'
                          }`}
                          disabled={likedComments.has(comment.id)}
                        >
                          <Heart className={`h-4 w-4 ${likedComments.has(comment.id) ? 'fill-current' : ''}`} />
                          <span>{comment.likes}</span>
                        </button>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 animate-fade-in-up">
            Latest Insights
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-blue-600 mx-auto mb-6 animate-pulse"></div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in-up-delayed">
            Stay updated with the latest trends in AI healthcare technology, wearable innovations, 
            and insights from our team of experts.
          </p>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-slate-800 mb-8 animate-fade-in-up">Featured Articles</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-gray-500 text-sm mb-3">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </div>
                      <div className="flex items-center gap-4 text-gray-500 text-sm">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(post.id);
                          }}
                          className={`flex items-center gap-1 transition-colors duration-200 ${
                            likedPosts.has(post.id) 
                              ? 'text-red-500 cursor-not-allowed' 
                              : 'text-gray-600 hover:text-red-500'
                          }`}
                          disabled={likedPosts.has(post.id)}
                        >
                          <Heart className={`h-3 w-3 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                          {likedPosts.has(post.id) ? 'Liked' : 'Like'}
                        </button>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {post.comments.length}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 animate-fade-in-up-delayed">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedPost(post)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {post.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-emerald-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Featured
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-gray-500 text-sm mb-3">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                    {post.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <User className="h-3 w-3" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-3 text-gray-500 text-sm">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(post.id);
                      }}
                      className="flex items-center gap-1 hover:text-red-500 transition-colors duration-200"
                    >
                      <Heart className="h-3 w-3" />
                      {post.likes}
                    </button>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      {post.comments.length}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-emerald-600 font-medium text-sm group-hover:text-emerald-700 transition-colors duration-200">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;