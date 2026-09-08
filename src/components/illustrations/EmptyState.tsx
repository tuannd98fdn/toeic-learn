import styles from './EmptyState.module.css';
import MascotSVG from './MascotSVG';

interface EmptyStateProps {
  title: string;
  description?: string;
  mascotMood?: 'idle' | 'happy' | 'thinking' | 'sleeping';
  children?: React.ReactNode;
}

export default function EmptyState({ title, description, mascotMood = 'idle', children }: EmptyStateProps) {
  return (
    <div className={styles.container}>
      <div className={`${styles.illustration} animate-float`}>
        <MascotSVG mood={mascotMood} size={100} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {children && <div className={styles.actions}>{children}</div>}
    </div>
  );
}
