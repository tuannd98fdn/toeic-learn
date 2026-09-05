'use client';

import React, { useEffect, useState } from 'react';
import styles from './Confetti.module.css';

interface ConfettiProps {
  show: boolean;
  onComplete?: () => void;
  duration?: number;
}

export default function Confetti({ show, onComplete, duration = 3000 }: ConfettiProps) {
  const [isActive, setIsActive] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    if (show) {
      setIsActive(true);
      
      // Generate random particles
      const colors = ['#f59e0b', '#10b981', '#06b6d4', '#7c3aed', '#ef4444'];
      const newParticles = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // percentage
        y: -10, // start above screen
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 5, // 5px to 15px
        rotate: Math.random() * 360,
        delay: Math.random() * 0.5, // 0 to 0.5s delay
        duration: Math.random() * 1.5 + 1 // 1s to 2.5s fall duration
      }));
      
      setParticles(newParticles);

      // Hide after duration
      const timer = setTimeout(() => {
        setIsActive(false);
        if (onComplete) onComplete();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onComplete]);

  if (!isActive) return null;

  return (
    <div className={styles.container}>
      {particles.map(p => (
        <div
          key={p.id}
          className={styles.particle}
          style={{
            left: `${p.x}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
