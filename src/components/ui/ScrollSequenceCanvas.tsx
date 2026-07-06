'use client';

import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { useMotionValueEvent, MotionValue } from 'framer-motion';
import { usePreloader } from '@/context/PreloaderContext';

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
  const { setLoadProgress } = usePreloader();

  // Preload frames in chunks
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = Array(frameCount).fill(null);
    let isCancelled = false;

    // Buffer to unblock preloader early
    const BUFFER_FRAMES = Math.min(60, frameCount);

    const loadFrame = (i: number) => {
      return new Promise<void>((resolve) => {
        if (isCancelled) return resolve();
        
        const img = new Image();
        const index = i.toString().padStart(3, '0');
        img.src = `${imagePathPrefix}/frame_${index}.jpg`;
        
        img.onload = () => {
          if (isCancelled) return;
          images[i - 1] = img;
          loadedCount++;
          
          // Throttle state updates: update every 5 frames, or exactly at the buffer threshold
          if (loadedCount % 5 === 0 || loadedCount === BUFFER_FRAMES || loadedCount === frameCount) {
             setLoaded(loadedCount);
             // Cap progress at 100 once buffer is reached
             const progress = Math.min(100, Math.floor((loadedCount / BUFFER_FRAMES) * 100));
             setLoadProgress(progress);
          }
          
          if (i === 1 && contextRef.current && canvasRef.current) {
            drawFrame(img);
          }
          resolve();
        };
        img.onerror = () => {
          if (!isCancelled) resolve();
        };
      });
    };

    const startLoading = async () => {
      // Phase 1: Load buffer frames in chunks of 10
      const loadChunk = async (start: number, end: number) => {
        const promises = [];
        for (let i = start; i <= end; i++) {
          if (i <= frameCount) promises.push(loadFrame(i));
        }
        await Promise.all(promises);
      };

      for (let i = 1; i <= BUFFER_FRAMES; i += 10) {
        if (isCancelled) return;
        await loadChunk(i, Math.min(i + 9, BUFFER_FRAMES));
      }

      // Phase 2: Load the rest quietly in chunks of 5
      if (frameCount > BUFFER_FRAMES) {
        for (let i = BUFFER_FRAMES + 1; i <= frameCount; i += 5) {
          if (isCancelled) return;
          await loadChunk(i, Math.min(i + 4, frameCount));
          // brief yield to let main thread breathe
          await new Promise(r => setTimeout(r, 40));
        }
      }
    };

    startLoading();
    imagesRef.current = images;

    return () => {
      isCancelled = true;
    };
  }, [frameCount, imagePathPrefix, setLoadProgress]);

  // Set up canvas context
  useLayoutEffect(() => {
    if (canvasRef.current) {
      // alpha: false skips transparency blending, massively boosting GPU performance
      contextRef.current = canvasRef.current.getContext('2d', { alpha: false });
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

  const lastDrawnFrameRef = useRef<number>(-1);

  useMotionValueEvent(progress, "change", (latest) => {
    // Map 0 -> 1 progress to 0 -> max index
    const frameIndex = Math.min(
      frameCount - 1,
      Math.floor(latest * frameCount)
    );
    
    // Only re-draw if the frame has actually changed! (Saves massive GPU overhead during spring physics)
    if (frameIndex !== lastDrawnFrameRef.current) {
      const img = imagesRef.current[frameIndex];
      if (img && img.complete) {
        lastDrawnFrameRef.current = frameIndex;
        requestAnimationFrame(() => drawFrame(img));
      }
    }
  });

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </>
  );
}
