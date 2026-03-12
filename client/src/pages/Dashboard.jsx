import { useCallback, useEffect, useState } from 'react';
import socket from '../services/socket';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/useAuth';
import api from '../services/api';

const Dashboard = () => {
  const { user, logout, loading } = useAuth();
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState('');

  const fetchPosts = useCallback(async (page = 1) => {
    setIsLoading(true);
    setError('');

    try {
      const data = await api.get(`/api/posts?page=${page}&limit=10`);

      setPosts(Array.isArray(data.data) ? data.data : []);
      setPagination(data.pagination || {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
      });
      setCurrentPage(page);
    } catch (requestError) {
      const message = requestError.response?.data?.message || 'Something went wrong';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDelete = async (postId) => {
    const confirmed = window.confirm('Delete this post?');
    if (!confirmed) {
      return;
    }

    setDeletingId(postId);
    setError('');

    try {
      await api.delete(`/api/posts/${postId}`);
      setPosts((previousPosts) => previousPosts.filter((post) => post._id !== postId));
      toast.success('Post deleted successfully');
    } catch (requestError) {
      const message = requestError.response?.data?.message || 'Failed to delete post';
      setError(message);
      toast.error(message);
    } finally {
      setDeletingId('');
    }
  };

  useEffect(() => {
    fetchPosts(1);
  }, [fetchPosts]);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
    });

    socket.on("newPost", (data) => {
      toast.success(data.message);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("newPost");
      socket.disconnect();
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container" style={pageStyle}>
      <h1 style={titleStyle}>Dashboard</h1>
      <p style={subTitleStyle}>You are logged in.</p>

      <div style={cardStyle}>
        <h2 style={cardTitleStyle}>User Info</h2>
        <p><strong>Name:</strong> {user?.name ?? '-'}</p>
        <p><strong>Email:</strong> {user?.email ?? '-'}</p>
      </div>

      <div style={postsHeaderStyle}>
        <h2 style={cardTitleStyle}>My Posts</h2>
        <Link to="/create" style={createButtonStyle}>Create Post</Link>
      </div>

      {isLoading ? <p>Loading posts...</p> : null}
      {!isLoading && error ? <p style={errorStyle}>{error}</p> : null}
      {!isLoading && !error && posts.length === 0 ? <p>No posts yet</p> : null}

      {!isLoading && !error && posts.length > 0 ? (
        <div style={postListStyle}>
          {posts.map((post) => (
            <article key={post._id} style={postCardStyle}>
              <h3 style={postTitleStyle}>{post.title}</h3>
              <p style={postContentStyle}>{post.content}</p>
              {post.category ? <p style={metaStyle}>Category: {post.category}</p> : null}
              <p style={metaStyle}>Status: {post.status || 'draft'}</p>
              <div style={actionRowStyle}>
                <Link to={`/edit/${post._id}`}>
                  <button type="button" style={secondaryButtonStyle}>Edit</button>
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(post._id)}
                  disabled={deletingId === post._id}
                  style={deleteButtonStyle}
                >
                  {deletingId === post._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : null}

      <div style={paginationStyle}>
        <button
          type="button"
          onClick={() => fetchPosts(currentPage - 1)}
          disabled={!pagination.hasPrevPage || isLoading}
          style={secondaryButtonStyle}
        >
          Previous
        </button>
        <span>Page {pagination.page} of {pagination.totalPages}</span>
        <button
          type="button"
          onClick={() => fetchPosts(currentPage + 1)}
          disabled={!pagination.hasNextPage || isLoading}
          style={secondaryButtonStyle}
        >
          Next
        </button>
      </div>

      <button type="button" onClick={logout} style={buttonStyle}>
        Logout
      </button>
    </div>
  );
};

const pageStyle = {
  padding: '40px 0',
  maxWidth: '680px',
};

const titleStyle = {
  fontSize: '2rem',
  fontWeight: '700',
  marginBottom: '0.5rem',
};

const subTitleStyle = {
  color: 'var(--text-muted)',
  marginBottom: '2rem',
};

const cardStyle = {
  backgroundColor: 'var(--white)',
  padding: '1.5rem',
  borderRadius: '0.75rem',
  border: '1px solid var(--border-color)',
  marginBottom: '1.5rem',
};

const cardTitleStyle = {
  fontSize: '1.125rem',
  fontWeight: '600',
  marginBottom: '1rem',
};

const postsHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
};

const createButtonStyle = {
  backgroundColor: 'var(--primary-color)',
  color: 'var(--white)',
  padding: '0.6rem 1rem',
  borderRadius: '0.5rem',
  fontWeight: '600',
};

const postListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  marginBottom: '1rem',
};

const postCardStyle = {
  backgroundColor: 'var(--white)',
  border: '1px solid var(--border-color)',
  borderRadius: '0.75rem',
  padding: '1rem',
};

const postTitleStyle = {
  marginBottom: '0.5rem',
};

const postContentStyle = {
  color: 'var(--text-muted)',
  whiteSpace: 'pre-wrap',
};

const metaStyle = {
  fontSize: '0.9rem',
  color: 'var(--text-muted)',
  marginTop: '0.5rem',
};

const actionRowStyle = {
  display: 'flex',
  gap: '0.75rem',
  marginTop: '1rem',
};

const paginationStyle = {
  display: 'flex',
  gap: '0.75rem',
  alignItems: 'center',
  marginBottom: '1.5rem',
};

const secondaryButtonStyle = {
  border: '1px solid var(--border-color)',
  backgroundColor: 'var(--white)',
  borderRadius: '0.5rem',
  padding: '0.5rem 0.75rem',
  cursor: 'pointer',
};

const deleteButtonStyle = {
  border: 'none',
  backgroundColor: '#b91c1c',
  color: 'var(--white)',
  borderRadius: '0.5rem',
  padding: '0.5rem 0.75rem',
  cursor: 'pointer',
};

const errorStyle = {
  color: '#b91c1c',
  marginBottom: '1rem',
};

const buttonStyle = {
  backgroundColor: '#b91c1c',
  color: 'var(--white)',
  border: 'none',
  padding: '0.75rem 1.25rem',
  borderRadius: '0.5rem',
  fontWeight: '600',
  cursor: 'pointer',
};

export default Dashboard;
