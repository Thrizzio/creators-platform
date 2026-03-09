import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const CreatePost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('draft');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }

    setIsSaving(true);

    try {
      await api.post('/api/posts', {
        title: title.trim(),
        content: content.trim(),
        category: category.trim(),
        status,
      });

      navigate('/dashboard', { replace: true });
    } catch (requestError) {
      setError(requestError.message || 'Unable to connect to the server');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container" style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Create Post</h1>
        {error ? <div style={errorStyle}>{error}</div> : null}

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={fieldStyle}>
            <label htmlFor="title" style={labelStyle}>Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              style={inputStyle}
              placeholder="Post title"
            />
          </div>

          <div style={fieldStyle}>
            <label htmlFor="content" style={labelStyle}>Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              style={textareaStyle}
              placeholder="Write your post content..."
              rows={8}
            />
          </div>

          <div style={fieldStyle}>
            <label htmlFor="category" style={labelStyle}>Category</label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              style={inputStyle}
              placeholder="e.g. Tech, Lifestyle"
            />
          </div>

          <div style={fieldStyle}>
            <label htmlFor="status" style={labelStyle}>Status</label>
            <select
              id="status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              style={inputStyle}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <button type="submit" style={buttonStyle} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Create Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

const pageStyle = {
  padding: '40px 0',
};

const cardStyle = {
  maxWidth: '720px',
  margin: '0 auto',
  backgroundColor: 'var(--white)',
  border: '1px solid var(--border-color)',
  borderRadius: '0.75rem',
  padding: '1.5rem',
};

const titleStyle = {
  marginBottom: '1rem',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const fieldStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
};

const labelStyle = {
  fontWeight: '600',
};

const inputStyle = {
  border: '1px solid var(--border-color)',
  borderRadius: '0.5rem',
  padding: '0.75rem',
  fontSize: '1rem',
};

const textareaStyle = {
  ...inputStyle,
  resize: 'vertical',
};

const buttonStyle = {
  alignSelf: 'flex-start',
  backgroundColor: 'var(--primary-color)',
  color: 'var(--white)',
  border: 'none',
  borderRadius: '0.5rem',
  padding: '0.75rem 1rem',
  fontWeight: '600',
  cursor: 'pointer',
};

const errorStyle = {
  backgroundColor: '#fee2e2',
  color: '#b91c1c',
  borderRadius: '0.5rem',
  padding: '0.75rem',
  marginBottom: '1rem',
};

export default CreatePost;
