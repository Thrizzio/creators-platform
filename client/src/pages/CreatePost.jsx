import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ImageUpload from '../components/common/ImageUpload';
import api from '../services/api';

const CreatePost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('draft');
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [coverImageUrl, setCoverImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [error, setError] = useState('');

  const handleUpload = async (formData) => {
    setUploading(true);
    setUploadError('');

    try {
      const response = await api.post('/api/upload', formData);
      setCoverImageUrl(response.url);
      toast.success('Image uploaded successfully!');
      return response.url;
    } catch (requestError) {
      const message = requestError.response?.data?.message || 'Image upload failed';
      setUploadError(message);
      toast.error(message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!title.trim() || !content.trim()) {
      const message = !title.trim() ? 'Title is required' : 'Content is required';
      setError(message);
      toast.error(message);
      return;
    }

    setSubmitting(true);

    try {
      await api.post('/api/posts', {
        title: title.trim(),
        content: content.trim(),
        coverImage: coverImageUrl,
        category: category.trim(),
        status,
      });

      toast.success('Post created successfully');
      setTitle('');
      setContent('');
      setCategory('');
      setStatus('draft');
      setCoverImageUrl(null);
      setUploadError('');
      navigate('/dashboard');
    } catch (requestError) {
      const message = requestError.response?.data?.message || 'Something went wrong';
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container" style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Create Post</h1>
        {error ? <div style={errorStyle}>{error}</div> : null}

        <form onSubmit={handlePostSubmit} style={formStyle}>
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

          <ImageUpload onUpload={handleUpload} disabled={uploading || submitting} />
          {uploading ? <p style={helperStyle}>Uploading image, please wait...</p> : null}
          {uploadError ? <p style={uploadErrorStyle}>{uploadError}</p> : null}
          {coverImageUrl ? (
            <>
              <p style={helperStyle}>Image uploaded successfully.</p>
              <img
                src={coverImageUrl}
                alt="Post cover preview"
                style={previewImageStyle}
              />
            </>
          ) : null}
          {/* TODO: If a user uploads a new image before creating the post, the previous Cloudinary upload becomes orphaned. */}

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

          <button type="submit" style={buttonStyle} disabled={uploading || submitting}>
            {submitting ? 'Saving...' : 'Create Post'}
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

const helperStyle = {
  color: 'var(--text-muted)',
  margin: 0,
};

const uploadErrorStyle = {
  color: '#b91c1c',
  margin: 0,
};

const previewImageStyle = {
  width: '100%',
  maxHeight: '240px',
  objectFit: 'cover',
  borderRadius: '0.75rem',
  border: '1px solid var(--border-color)',
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
