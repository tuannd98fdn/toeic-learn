'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserIcon, TargetIcon, ZapIcon, SettingsIcon, ArrowRightIcon } from '@/components/icons/AppIcons';
import { useCloudSync } from '@/hooks/useCloudSync';
import { storage } from '@/utils/storage';
import styles from './page.module.css';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { isSyncing, lastSynced, syncNow } = useCloudSync();

  const [targetScore, setTargetScore] = useState<string>('750+');
  const [examDate, setExamDate] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    setTargetScore(storage.get('toeic_target_score', '750+'));
    setExamDate(storage.get('toeic_exam_date', null));
  }, []);

  if (status === 'loading') {
    return (
      <div className={styles.container}>
        <div className="skeleton" style={{ height: 200, borderRadius: 16 }} />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const daysLeft = examDate 
    ? Math.max(0, Math.ceil((new Date(examDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)))
    : null;

  return (
    <div className={`${styles.container} stagger-children`}>
      <header className={styles.header}>
        <h1 className={styles.title}>Tài khoản</h1>
        <p className={styles.subtitle}>Quản lý thông tin và dữ liệu học tập</p>
      </header>

      <div className={styles.grid}>
        {/* User Info Card */}
        <section className={`${styles.card} card-glow`}>
          <div className={styles.avatarSection}>
            <img 
              src={session.user.image || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + session.user.email} 
              alt="Avatar" 
              className={styles.avatar}
            />
            <div className={styles.userInfo}>
              <h2 className={styles.userName}>{session.user.name || 'Người học TOEIC'}</h2>
              <p className={styles.userEmail}>{session.user.email}</p>
            </div>
          </div>
        </section>

        {/* Study Goals Card */}
        <section className={`${styles.card} card-glow`}>
          <div className={styles.cardHeader}>
            <div className={styles.iconWrapper}>
              <TargetIcon size={22} />
            </div>
            <h3 className={styles.cardTitle}>Mục tiêu học tập</h3>
          </div>
          
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Mục tiêu điểm</span>
            <span className={styles.infoValue}>
              {targetScore}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Ngày thi dự kiến</span>
            <span className={styles.infoValue}>
              {examDate ? new Date(examDate).toLocaleDateString('vi-VN') : 'Chưa xác định'}
              {daysLeft !== null && (
                <span style={{ fontSize: '0.85rem', color: 'var(--primary)', background: 'rgba(var(--primary-rgb), 0.1)', padding: '2px 8px', borderRadius: 12 }}>
                  Còn {daysLeft} ngày
                </span>
              )}
            </span>
          </div>
          <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
            <Link href="/diagnostic" className="btn-secondary btn-sm">
              Cập nhật mục tiêu
              <ArrowRightIcon size={16} />
            </Link>
          </div>
        </section>

        {/* Data & Sync Card */}
        <section className={`${styles.card} card-glow`}>
          <div className={styles.cardHeader}>
            <div className={styles.iconWrapper}>
              <ZapIcon size={22} />
            </div>
            <h3 className={styles.cardTitle}>Đồng bộ dữ liệu Cloud</h3>
          </div>
          
          <div className={styles.syncStatus}>
            <svg 
              className={`${styles.syncIcon} ${isSyncing ? styles.syncing : ''}`} 
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
            </svg>
            <span>
              {isSyncing 
                ? 'Đang đồng bộ...' 
                : lastSynced 
                  ? `Đồng bộ lần cuối: ${lastSynced.toLocaleTimeString('vi-VN')}`
                  : 'Chưa đồng bộ'}
            </span>
          </div>
          
          <button 
            className="btn-primary" 
            onClick={() => syncNow()}
            disabled={isSyncing}
          >
            {isSyncing ? 'Đang xử lý...' : 'Đồng bộ ngay'}
          </button>
        </section>

        {/* Danger Zone */}
        <section className={styles.dangerZone}>
          <h3 className={styles.dangerTitle}>Khu vực nguy hiểm</h3>
          <button 
            className="btn-danger"
            onClick={() => signOut({ callbackUrl: '/login' })}
          >
            Đăng xuất
          </button>
        </section>
      </div>
    </div>
  );
}
