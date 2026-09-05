'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/study', label: 'Study', icon: '🃏' },
  { path: '/quiz', label: 'Quiz', icon: '🎯' },
  { path: '/vocabulary', label: 'Words', icon: '📚' },
  { path: '/stats', label: 'Stats', icon: '📊' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path;
          return (
            <li key={item.path} className={styles.navItem}>
              <Link 
                href={item.path} 
                className={`${styles.navLink} ${isActive ? styles.active : ''}`}
              >
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.label}>{item.label}</span>
                {isActive && <div className={styles.indicator} />}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
