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
  NotebookIcon,
  UserIcon,
  SearchIcon,
  BookIcon,
  QuizIcon,
  LightbulbIcon,
  SparklesIcon,
} from '@/components/icons/AppIcons';
import MascotSVG from '@/components/illustrations/MascotSVG';
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

  // Restore persisted state on mount
  useEffect(() => {
    try {
      const savedCollapsed = localStorage.getItem('toeic_sidebar_collapsed');
      if (savedCollapsed !== null) {
        setIsCollapsed(savedCollapsed === 'true');
      }
      const savedWidth = localStorage.getItem('toeic_sidebar_width');
      if (savedWidth !== null) {
        const parsed = parseInt(savedWidth, 10);
        if (!isNaN(parsed) && parsed >= 120 && parsed <= 400) {
          setSidebarWidth(parsed);
        }
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, []);

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

  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('toeic_sidebar_collapsed', String(next));
      } catch {}
      return next;
    });
  }, []);

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
        if (!isCollapsed) {
          setIsCollapsed(true);
          try {
            localStorage.setItem('toeic_sidebar_collapsed', 'true');
          } catch {}
        }
        return;
      }

      // Uncollapse if dragged out
      if (isCollapsed && newWidth >= 120) {
        setIsCollapsed(false);
        try {
          localStorage.setItem('toeic_sidebar_collapsed', 'false');
        } catch {}
      }

      // Constrain width
      if (newWidth < 180) {
        newWidth = 180; // Min width when expanded
      } else if (newWidth > 400) {
        newWidth = 400; // Max width
      }
      setSidebarWidth(newWidth);
      try {
        localStorage.setItem('toeic_sidebar_width', String(newWidth));
      } catch {}
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

  interface NavGroup {
    id: string;
    title: string;
    items: NavItem[];
  }

  const NAV_GROUPS: NavGroup[] = [
    {
      id: 'learning',
      title: 'Luyện Thi',
      items: [
        { path: '/', label: 'Học', icon: <HomeIcon size={20} /> },
        { path: '/masterclass', label: 'Masterclass 30\'', icon: <SparklesIcon size={20} />, badge: '800+' },
        { path: '/study-plan', label: 'Lộ trình', icon: <CompassIcon size={20} /> },
        { path: '/exam', label: 'Thi thử', icon: <ExamIcon size={20} />, badge: 'MỚI' },
        { path: '/stats', label: 'Thống kê', icon: <StatsIcon size={20} /> },
      ],
    },
    {
      id: 'tools',
      title: 'Kho Công Cụ',
      items: [
        { path: '/study', label: 'Flashcards', icon: <CardsIcon size={20} /> },
        { path: '/vocabulary', label: 'Từ điển', icon: <BookIcon size={20} /> },
        { path: '/quiz', label: 'Làm Quiz', icon: <QuizIcon size={20} /> },
        { path: '/tips', label: 'Mẹo thi', icon: <LightbulbIcon size={20} /> },
        { path: '/notebook', label: 'Sổ tay lỗi', icon: <NotebookIcon size={20} /> },
      ],
    },
    {
      id: 'account',
      title: 'Cá Nhân',
      items: [
        { path: '/profile', label: 'Tài khoản', icon: <UserIcon size={20} /> },
      ],
    },
  ];

  // Mobile: 5 items — merge Mục tiêu into Lộ trình, highlight Học center
  const MOBILE_ITEMS: NavItem[] = [
    { path: '/study-plan', label: 'Lộ trình', icon: <CompassIcon size={22} /> },
    { path: '/exam', label: 'Thi thử', icon: <ExamIcon size={22} />, badge: '•' },
    { path: '/', label: 'Học', icon: <HomeIcon size={26} /> },
    { path: '/study', label: 'Từ vựng', icon: <CardsIcon size={22} /> },
    { path: '/profile', label: 'Tài khoản', icon: <UserIcon size={22} /> },
  ];

  return (
    <nav className={`${styles.navbar} ${isCollapsed ? styles.collapsed : ''} ${isResizing ? styles.resizing : ''}`}>
      <div 
        className={styles.resizer} 
        onPointerDown={startResizing}
        title="Kéo để thay đổi kích thước"
      />
      
      {/* Desktop Logo */}
      <div className={styles.logoArea}>
        <div className={styles.logoIcon}>
          <MascotSVG mood="idle" size={36} />
        </div>
        <div className={styles.logoText}>
          <span className={styles.brandName}>TOEIC Master</span>
          <span className={styles.brandSub}>Nền tảng #1 Việt Nam</span>
        </div>
      </div>

      {/* Quick Search Trigger */}
      <button
        type="button"
        className={styles.searchTrigger}
        onClick={() => {
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('open-command-palette'));
          }
        }}
        title="Tìm kiếm hoặc mở nhanh (⌘K)"
      >
        <div className={styles.searchTriggerLeft}>
          <SearchIcon size={16} />
          <span className={styles.searchTriggerText}>Tìm nhanh...</span>
        </div>
        <kbd className={styles.searchShortcutBadge}>⌘K</kbd>
      </button>

      {/* Desktop Nav Groups */}
      <div className={styles.navGroups}>
        {NAV_GROUPS.map((group, groupIdx) => (
          <div key={group.id} className={styles.navGroup}>
            <div className={styles.groupHeader}>
              <span className={styles.groupTitle}>{group.title}</span>
            </div>
            <ul className={styles.navList}>
              {group.items.map((item) => {
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
            {groupIdx < NAV_GROUPS.length - 1 && <div className={styles.groupDivider} />}
          </div>
        ))}
      </div>

      {/* Mobile Bottom Nav */}
      <ul className={styles.mobileNavList}>
        {MOBILE_ITEMS.map((item) => {
          const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(`${item.path}/`));
          const isCenter = item.path === '/';
          
          return (
            <li key={item.path} className={`${styles.mobileNavItem} ${isCenter ? styles.mobileCenter : ''}`}>
              <Link
                href={item.path}
                className={`${styles.mobileNavLink} ${isActive ? styles.mobileActive : ''} ${isCenter ? styles.mobileFab : ''}`}
              >
                <div className={styles.mobileIconWrapper}>
                  {item.icon}
                  {item.badge && <span className={styles.mobileBadge}>{item.badge}</span>}
                </div>
                <span className={styles.mobileLabel}>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Desktop Bottom */}
      <div className={styles.bottomArea}>
        <button 
          className={styles.toggleBtn}
          onClick={toggleCollapse}
          title={isCollapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
        >
          <div style={{ transform: isCollapsed ? 'none' : 'rotate(180deg)', transition: 'transform 0.3s', display: 'flex' }}>
            <ArrowRightIcon size={18} />
          </div>
        </button>
      </div>
    </nav>
  );
}
