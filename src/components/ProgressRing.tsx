import React from 'react';
import styles from './ProgressRing.module.css';

interface ProgressRingProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}

export default function ProgressRing({
  value,
  max,
  size = 120,
  strokeWidth = 8,
  color = 'var(--primary)',
  label
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  // Ensure percentage is between 0 and 100
  const percent = max > 0 ? Math.min(Math.max((value / max) * 100, 0), 100) : 0;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className={styles.container} style={{ width: size, height: size }}>
      <svg
        className={styles.svg}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background ring */}
        <circle
          className={styles.bgRing}
          stroke="var(--border)"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress ring */}
        <circle
          className={styles.progressRing}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset: offset }}
          strokeLinecap="round"
        />
      </svg>
      <div className={styles.labelContainer}>
        {label ? (
          <span className={styles.label}>{label}</span>
        ) : (
          <span className={styles.percentage}>{Math.round(percent)}%</span>
        )}
      </div>
    </div>
  );
}
