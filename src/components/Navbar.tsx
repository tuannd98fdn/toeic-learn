'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  ExamIcon,
  CardsIcon,
  QuizIcon,
  BookIcon,
  NotebookIcon,
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

  const NAV_ITEMS: NavItem[] = [
    { path: '/', label: 'Trang chủ', icon: <HomeIcon size={20} /> },
    { path: '/study-plan', label: 'Lộ trình AI', icon: <CompassIcon size={20} />, badge: 'MỚI' },
    { path: '/diagnostic', label: 'Test 20p', icon: <TargetIcon size={20} /> },
    { path: '/exam', label: 'Thi thử 120p', icon: <ExamIcon size={20} />, badge: 'HOT' },
    { path: '/study', label: 'Học Flashcard', icon: <CardsIcon size={20} /> },
    { path: '/quiz', label: 'Làm Quiz', icon: <QuizIcon size={20} /> },
    { path: '/vocabulary', label: 'Từ điển', icon: <BookIcon size={20} /> },
    { path: '/notebook', label: 'Sổ tay lỗi', icon: <NotebookIcon size={20} /> },
    { path: '/stats', label: 'Thống kê', icon: <StatsIcon size={20} /> },
  ];


  return (
    <nav className={styles.navbar}>
      <div className={styles.logoArea}>
        <div className={styles.logoIcon}>T</div>
        <div className={styles.logoText}>
          <span className={styles.brandName}>TOEIC Master</span>
          <span className={styles.brandSub}>ETS Exam Prep</span>
        </div>
      </div>

      <ul className={styles.navList}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path;
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
