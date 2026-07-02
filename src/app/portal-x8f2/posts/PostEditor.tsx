'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import styles from './Posts.module.css';
import 'react-quill-new/dist/quill.snow.css';

// ReactQuill must be loaded dynamically since it requires the document object
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false }) as any;

export default function PostEditor({ postId }: { postId?: string }) {
  const router = useRouter();
  const quillRef = useRef<any>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Sustainability',
    excerpt: '',
    content: '',
    coverImage: '',
    metaTitle: '',
    metaDescription: '',
    published: false,
  });
  const [loading, setLoading] = useState(postId ? true : false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (postId) {
      fetch(`/api/portal-x8f2/posts/${postId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) setError(data.error);
          else setFormData({
            title: data.title || '',
            slug: data.slug || '',
            category: data.category || 'Sustainability',
            excerpt: data.excerpt || '',
            content: data.content || '',
            coverImage: data.coverImage || '',
            metaTitle: data.metaTitle || '',
            metaDescription: data.metaDescription || '',
            published: data.published || false,
          });
          setLoading(false);
        });
    }
  }, [postId]);

  // Image upload handler for ReactQuill
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (!file) return;

      const fd = new FormData();
      fd.append('image', file);

      try {
        const res = await fetch('/api/portal-x8f2/upload', {
          method: 'POST',
          body: fd,
        });
        const data = await res.json();

        if (data.url) {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, 'image', data.url);
        }
      } catch (err) {
        console.error('Image upload failed', err);
        alert('Image upload failed');
      }
    };
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    setUploading(true);
    const fd = new FormData();
    fd.append('image', file);
    try {
      const res = await fetch('/api/portal-x8f2/upload', {
        method: 'POST',
        body: fd,
      });
      const data = await res.json();
      if (data.url) {
        // Save the full optimized URL (already has f_auto,q_auto injected server-side)
        setFormData(prev => ({ ...prev, coverImage: data.url }));
      } else {
        alert('Upload failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('Cover upload failed', err);
      alert('Cover upload failed — check that CLOUDINARY_URL is set in Vercel environment variables.');
    } finally {
      setUploading(false);
    }
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  }), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const url = postId ? `/api/portal-x8f2/posts/${postId}` : '/api/portal-x8f2/posts';
    const method = postId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setSaving(false);

    if (data.error) {
      setError(data.error);
    } else {
      router.push('/portal-x8f2/posts');
    }
  };

  if (loading) return <p>Loading editor...</p>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{postId ? 'Edit Post' : 'Create New Post'}</h1>
      </header>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} className={styles.editorForm}>
        <div className={styles.formGroup}>
          <label>Title <span className={styles.hint}>(e.g., How Returnable Packaging Reduces TCO)</span></label>
          <input name="title" value={formData.title} onChange={handleChange} required placeholder="Enter the main headline of your blog post" />
        </div>

        <div className={styles.formGroup}>
          <label>Slug <span className={styles.hint}>(Auto-generated from title if left blank. e.g., returnable-packaging-tco)</span></label>
          <input name="slug" value={formData.slug} onChange={handleChange} placeholder="Custom URL slug (optional)" />
        </div>

        <div className={styles.formGroup}>
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="Sustainability">Sustainability</option>
            <option value="Engineering">Engineering</option>
            <option value="Logistics">Logistics</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Excerpt <span className={styles.hint}>(A short 1-2 sentence summary shown on the blog list page)</span></label>
          <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} required placeholder="e.g., Discover how switching to PP corrugated can cut logistics costs by 40%." />
        </div>

        <div className={styles.formGroup}>
          <label>Cover Image <span className={styles.hint}>(Displays on the blog list and top of the article)</span></label>
          <input type="file" accept="image/*" onChange={handleCoverUpload} disabled={uploading} />
          {uploading && <p style={{ marginTop: '8px', color: 'var(--color-accent)', fontSize: '13px' }}>⏳ Uploading to Cloudinary...</p>}
          {formData.coverImage && !uploading && (
            <div style={{ marginTop: '12px' }}>
              <img src={formData.coverImage} alt="Cover preview" style={{ maxWidth: '300px', borderRadius: '4px', display: 'block' }} />
              <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', marginTop: '4px' }}>✓ Cover image uploaded</p>
            </div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Content</label>
          {/* @ts-ignore - quill ref typing is loose */}
          <ReactQuill 
            ref={quillRef}
            theme="snow" 
            value={formData.content} 
            onChange={handleContentChange} 
            modules={modules}
          />
        </div>

        <div className={styles.formGroup}>
          <label>SEO Meta Title <span className={styles.hint}>(What shows up in Google search tabs. Keep under 60 chars)</span></label>
          <input name="metaTitle" value={formData.metaTitle} onChange={handleChange} required placeholder="e.g., Polyveda | Returnable Packaging TCO Guide" />
        </div>

        <div className={styles.formGroup}>
          <label>SEO Meta Description <span className={styles.hint}>(What shows up under the link in Google/LinkedIn. Keep under 160 chars)</span></label>
          <textarea name="metaDescription" value={formData.metaDescription} onChange={handleChange} required placeholder="e.g., Learn how switching to PP Corrugated returnable packaging can cut your logistics costs while improving ESG compliance." />
        </div>

        <div className={`${styles.formGroup} ${styles.checkbox}`}>
          <label>Published</label>
          <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} />
        </div>

        <button type="submit" className={styles.btnPrimary} disabled={saving}>
          {saving ? 'Saving...' : 'Save Post'}
        </button>
      </form>
    </div>
  );
}
