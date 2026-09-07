'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  ExamIcon,
  CardsIcon,
  StatsIcon,
  CompassIcon,
  TargetIcon,
  ArrowRightIcon,
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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    // Only apply on desktop
    if (window.innerWidth >= 860) {
      if (isCollapsed) {
        document.documentElement.style.setProperty('--sidebar-width', '80px');
      } else {
        document.documentElement.style.setProperty('--sidebar-width', `${sidebarWidth}px`);
      }
    }
  }, [isCollapsed, sidebarWidth]);

  const startResizing = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    setIsResizing(true);
    document.body.classList.add('is-resizing-sidebar');
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!isResizing) return;
      let newWidth = e.clientX;

      // Snap to collapse if dragged too small
      if (newWidth < 120) {
        if (!isCollapsed) setIsCollapsed(true);
        return;
      }

      // Uncollapse if dragged out
      if (isCollapsed && newWidth >= 120) {
        setIsCollapsed(false);
      }

      // Constrain width
      if (newWidth < 180) {
        newWidth = 180; // Min width when expanded
      } else if (newWidth > 400) {
        newWidth = 400; // Max width
      }
      setSidebarWidth(newWidth);
    };

    const stopResizing = () => {
      setIsResizing(false);
      document.body.classList.remove('is-resizing-sidebar');
    };

    if (isResizing) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', stopResizing);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', stopResizing);
    };
  }, [isResizing, isCollapsed]);

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
    <nav className={`${styles.navbar} ${isCollapsed ? styles.collapsed : ''} ${isResizing ? styles.resizing : ''}`}>
      <div 
        className={styles.resizer} 
        onPointerDown={startResizing}
        title="Kéo để thay đổi kích thước"
      />
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

      <div className={styles.bottomArea}>
        <button 
          className={styles.toggleBtn}
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
        >
          <div style={{ transform: isCollapsed ? 'none' : 'rotate(180deg)', transition: 'transform 0.3s', display: 'flex' }}>
            <ArrowRightIcon size={20} />
          </div>
        </button>
      </div>
    </nav>
  );
}
