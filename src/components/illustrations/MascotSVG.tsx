'use client';

interface MascotProps {
  mood?: 'idle' | 'happy' | 'thinking' | 'sleeping';
  size?: number;
  className?: string;
}

/**
 * "Master Owl" — geometric minimalist mascot SVG.
 * 4 moods: idle, happy, thinking, sleeping.
 */
export default function MascotSVG({ mood = 'idle', size = 120, className }: MascotProps) {
  const getEyes = () => {
    switch (mood) {
      case 'happy':
        return (
          <>
            {/* Happy squinted eyes */}
            <path d="M34 44 Q38 38 42 44" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M58 44 Q62 38 66 44" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        );
      case 'sleeping':
        return (
          <>
            {/* Closed eyes — horizontal lines */}
            <line x1="33" y1="43" x2="43" y2="43" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="57" y1="43" x2="67" y2="43" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            {/* Z's */}
            <text x="72" y="28" fontSize="10" fontWeight="800" fill="var(--text-tertiary, #999)" opacity="0.6">z</text>
            <text x="78" y="22" fontSize="8" fontWeight="800" fill="var(--text-tertiary, #999)" opacity="0.4">z</text>
          </>
        );
      case 'thinking':
        return (
          <>
            {/* Normal eyes with one raised */}
            <circle cx="38" cy="43" r="4.5" fill="currentColor" />
            <circle cx="62" cy="41" r="4.5" fill="currentColor" />
            {/* Thinking dots */}
            <circle cx="78" cy="30" r="2" fill="var(--primary, #6366f1)" opacity="0.6">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="83" cy="24" r="1.5" fill="var(--primary, #6366f1)" opacity="0.4">
              <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
            </circle>
            <circle cx="86" cy="18" r="1" fill="var(--primary, #6366f1)" opacity="0.3">
              <animate attributeName="opacity" values="0.1;0.6;0.1" dur="1.5s" begin="0.6s" repeatCount="indefinite" />
            </circle>
          </>
        );
      default: // idle
        return (
          <>
            {/* Normal round eyes with highlights */}
            <circle cx="38" cy="43" r="5" fill="currentColor" />
            <circle cx="62" cy="43" r="5" fill="currentColor" />
            <circle cx="36" cy="41" r="1.5" fill="var(--surface, white)" />
            <circle cx="60" cy="41" r="1.5" fill="var(--surface, white)" />
          </>
        );
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Body — rounded owl shape */}
      <ellipse cx="50" cy="58" rx="28" ry="30" fill="var(--surface-elevated, #222538)" stroke="var(--border, #1e2030)" strokeWidth="1.5" />
      
      {/* Belly circle */}
      <ellipse cx="50" cy="68" rx="16" ry="18" fill="var(--surface-hover, #1e2030)" opacity="0.5" />
      
      {/* Head — wider on top */}
      <circle cx="50" cy="40" r="24" fill="var(--surface-elevated, #222538)" stroke="var(--border, #1e2030)" strokeWidth="1.5" />
      
      {/* Ear tufts */}
      <polygon points="30,22 36,32 26,32" fill="var(--primary, #818cf8)" opacity="0.8" />
      <polygon points="70,22 74,32 64,32" fill="var(--primary, #818cf8)" opacity="0.8" />
      
      {/* Face disc */}
      <ellipse cx="50" cy="44" rx="18" ry="14" fill="var(--surface-sunken, #0f1017)" opacity="0.3" />
      
      {/* Eyes (mood-dependent) */}
      {getEyes()}
      
      {/* Beak */}
      <polygon points="47,50 53,50 50,55" fill="var(--warning, #fbbf24)" />
      
      {/* Graduation cap */}
      <polygon points="32,22 50,14 68,22 50,18" fill="var(--primary, #818cf8)" />
      <rect x="48" y="10" width="4" height="6" rx="1" fill="var(--primary, #818cf8)" />
      <circle cx="50" cy="10" r="2.5" fill="var(--warning, #fbbf24)" />
      
      {/* Wings — subtle side shapes */}
      <path d="M22,50 Q16,60 24,72" stroke="var(--border-focus, #2d3050)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M78,50 Q84,60 76,72" stroke="var(--border-focus, #2d3050)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      
      {/* Feet */}
      <ellipse cx="42" cy="88" rx="6" ry="3" fill="var(--warning, #fbbf24)" opacity="0.8" />
      <ellipse cx="58" cy="88" rx="6" ry="3" fill="var(--warning, #fbbf24)" opacity="0.8" />
    </svg>
  );
}
