'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  ExamIcon,
  CardsIcon,
  StatsIcon,
  CompassIcon,
  TargetIcon,
} from '@/components/icons/AppIcons';
import styles from './Navbar.module.css';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

export default function Navbar() {
  const pathname = usePathname();

  // Simplified navigation for gamified app (Duolingo style usually has 5-6 max items)
  const NAV_ITEMS: NavItem[] = [
    { path: '/', label: 'Học', icon: <HomeIcon size={26} /> },
    { path: '/study-plan', label: 'Lộ trình', icon: <CompassIcon size={26} /> },
    { path: '/diagnostic', label: 'Mục tiêu', icon: <TargetIcon size={26} /> },
    { path: '/exam', label: 'Thi thử', icon: <ExamIcon size={26} />, badge: 'MỚI' },
    { path: '/stats', label: 'Thống kê', icon: <StatsIcon size={26} /> },
    { path: '/study', label: 'Từ vựng', icon: <CardsIcon size={26} /> },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoArea}>
        <div className={styles.logoIcon}>T</div>
        <div className={styles.logoText}>
          <span className={styles.brandName}>TOEIC Master</span>
          <span className={styles.brandSub}>Nền tảng #1 Việt Nam</span>
        </div>
      </div>

      <ul className={styles.navList}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(`${item.path}/`));
          
          return (
            <li key={item.path} className={styles.navItem}>
              <Link
                href={item.path}
                className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                title={item.label}
              >
                <div className={styles.iconWrapper}>
                  {item.icon}
                  {item.badge && <span className={styles.badge}>{item.badge}</span>}
                </div>
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
