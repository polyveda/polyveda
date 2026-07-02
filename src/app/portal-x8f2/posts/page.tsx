'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Posts.module.css';

export default function PostsAdmin() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portal-x8f2/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await fetch(`/api/portal-x8f2/posts/${id}`, { method: 'DELETE' });
      setPosts(posts.filter((p) => p._id !== id));
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Blog Posts</h1>
        <Link href="/portal-x8f2/posts/new" className={styles.btnPrimary}>
          Create New Post
        </Link>
      </header>

      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td>{post.title}</td>
                <td>{post.category}</td>
                <td>
                  <span className={post.published ? styles.badgeSuccess : styles.badgeDraft}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                <td className={styles.actions}>
                  <Link href={`/portal-x8f2/posts/${post._id}`} className={styles.btnSecondary}>
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(post._id)} className={styles.btnDanger}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className={styles.emptyState}>No posts found. Create your first post!</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
