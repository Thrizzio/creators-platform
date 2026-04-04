import { useState } from 'react';

const ImageUpload = ({ onUpload, disabled = false }) => {
  const [selectedFileName, setSelectedFileName] = useState('');

  const handleChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setSelectedFileName('');
      return;
    }

    setSelectedFileName(file.name);

    const formData = new FormData();
    formData.append('image', file);

    await onUpload(formData);
  };

  return (
    <div style={wrapperStyle}>
      <label htmlFor="cover-image" style={labelStyle}>Cover Image</label>
      <input
        id="cover-image"
        type="file"
        accept="image/*"
        onChange={handleChange}
        disabled={disabled}
        style={inputStyle}
      />
      {selectedFileName ? <p style={helperTextStyle}>Selected: {selectedFileName}</p> : null}
    </div>
  );
};

const wrapperStyle = {
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
  backgroundColor: 'var(--white)',
};

const helperTextStyle = {
  fontSize: '0.9rem',
  color: 'var(--text-muted)',
  margin: 0,
};

export default ImageUpload;
