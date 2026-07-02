'use client';

import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { useMotionValueEvent, MotionValue } from 'framer-motion';

interface ScrollSequenceCanvasProps {
  frameCount: number;
  progress: MotionValue<number>;
  imagePathPrefix?: string;
}

export function ScrollSequenceCanvas({ frameCount, progress, imagePathPrefix = '/hero-sequence-new' }: ScrollSequenceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);

  // Preload all frames
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];
    
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      // Pad to 3 digits (001, 002, ...)
      const index = i.toString().padStart(3, '0');
      img.src = `${imagePathPrefix}/frame_${index}.jpg`;
      img.onload = () => {
        loadedCount++;
        setLoaded(loadedCount);
        // Draw the first frame as soon as it's loaded
        if (i === 1 && contextRef.current && canvasRef.current) {
          drawFrame(img);
        }
      };
      images.push(img);
    }
    
    imagesRef.current = images;
  }, [frameCount]);

  // Set up canvas context
  useLayoutEffect(() => {
    if (canvasRef.current) {
      contextRef.current = canvasRef.current.getContext('2d');
      handleResize();
    }
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      contextRef.current = ctx;
      // Redraw current frame immediately on resize
      const currentProgress = progress.get();
      const frameIndex = Math.min(frameCount - 1, Math.floor(currentProgress * frameCount));
      if (imagesRef.current[frameIndex]?.complete) {
         drawFrame(imagesRef.current[frameIndex]); 
      }
    }
  };

  const drawFrame = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx || !img) return;

    const rect = canvas.getBoundingClientRect();
    
    // Object-fit: cover logic
    const hRatio = rect.width / img.width;
    const vRatio = rect.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (rect.width - img.width * ratio) / 2;
    const centerShift_y = (rect.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  };

  useMotionValueEvent(progress, "change", (latest) => {
    // Map 0 -> 1 progress to 0 -> 184 index
    const frameIndex = Math.min(
      frameCount - 1,
      Math.floor(latest * frameCount)
    );
    
    const img = imagesRef.current[frameIndex];
    if (img && img.complete) {
      requestAnimationFrame(() => drawFrame(img));
    }
  });

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
      {/* Loading overlay if we haven't loaded the first 10 frames */}
      {loaded < Math.min(10, frameCount) && (
        <div style={{ 
          position: 'absolute', inset: 0, display: 'flex', 
          alignItems: 'center', justifyContent: 'center', 
          background: 'var(--color-bg-dark)', color: 'rgba(255,255,255,0.2)', 
          zIndex: 10, fontSize: '14px', letterSpacing: '2px' 
        }}>
          LOADING HERO SEQUENCE
        </div>
      )}
    </>
  );
}
