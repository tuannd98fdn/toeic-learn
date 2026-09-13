'use client';

import { useEffect, useState, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  UserIcon,
  TargetIcon,
  ZapIcon,
  SettingsIcon,
  ShieldIcon,
  AwardIcon,
  CheckCircleIcon,
  TrendingUpIcon,
  NotebookIcon,
  CardsIcon,
  VolumeIcon,
  VolumeXIcon,
  RotateCcwIcon,
  ArrowRightIcon,
  DownloadIcon,
  UploadIcon,
  TrashIcon,
  ClockIcon,
} from '@/components/icons/AppIcons';
import { useCloudSync } from '@/hooks/useCloudSync';
import { useStreak } from '@/hooks/useStreak';
import { useVocabulary } from '@/hooks/useVocabulary';
import { useLeitner } from '@/hooks/useLeitner';
import { useMistakeNotebook } from '@/hooks/useMistakeNotebook';
import { getPredictiveScore, PredictiveScoreData } from '@/utils/scorePredictor';
import { storage } from '@/utils/storage';
import styles from './page.module.css';

const TARGET_SCORE_OPTIONS = ['450+', '550+', '650+', '750+', '850+', '990'];
const DAILY_MINUTE_OPTIONS = [15, 30, 45, 60];

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { isSyncing, lastSynced, syncNow } = useCloudSync();

  // Learning state hooks
  const { streakData } = useStreak();
  const { allWords } = useVocabulary();
  const { getStats } = useLeitner();
  const { mistakes } = useMistakeNotebook();

  // Local user settings
  const [targetScore, setTargetScore] = useState<string>('750+');
  const [selectedTargetScore, setSelectedTargetScore] = useState<string>('750+');
  const [examDate, setExamDate] = useState<string>('');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Learning preferences
  const [vocabAutoplay, setVocabAutoplay] = useState<boolean>(false);
  const [soundEffects, setSoundEffects] = useState<boolean>(true);
  const [dailyMinutes, setDailyMinutes] = useState<number>(30);

  // Predictive score data
  const [predictiveScore, setPredictiveScore] = useState<PredictiveScoreData | null>(null);

  // Hidden file input for JSON import
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load stored state on mount
  useEffect(() => {
    const storedTarget = storage.get<string>('toeic_target_score', '750+');
    setTargetScore(storedTarget);
    setSelectedTargetScore(storedTarget);

    const storedDate = storage.get<string | null>('toeic_exam_date', null);
    if (storedDate) {
      setExamDate(storedDate);
    }

    setVocabAutoplay(storage.get<boolean>('toeic_vocab_autoplay', false));
    setSoundEffects(storage.get<boolean>('toeic_sound_effects', true));
    setDailyMinutes(storage.get<number>('toeic_daily_minutes', 30));

    setPredictiveScore(getPredictiveScore());
  }, []);

  const isAuthenticated = status === 'authenticated' && !!session?.user;
  const leitnerStats = getStats();
  const totalMistakesCount = Object.keys(mistakes).length;

  // Calculate days left to exam
  const parsedExamDate = examDate ? new Date(examDate) : null;
  const isDateValid = parsedExamDate !== null && !isNaN(parsedExamDate.getTime());
  const daysLeft = isDateValid
    ? Math.max(0, Math.ceil((parsedExamDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24)))
    : null;

  // Save goal changes
  const handleSaveGoals = () => {
    setTargetScore(selectedTargetScore);
    storage.set('toeic_target_score', selectedTargetScore);

    if (examDate) {
      storage.set('toeic_exam_date', examDate);
    }

    if (isAuthenticated) {
      syncNow();
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Toggle vocab autoplay
  const handleToggleAutoplay = () => {
    const nextVal = !vocabAutoplay;
    setVocabAutoplay(nextVal);
    storage.set('toeic_vocab_autoplay', nextVal);
  };

  // Toggle sound effects
  const handleToggleSound = () => {
    const nextVal = !soundEffects;
    setSoundEffects(nextVal);
    storage.set('toeic_sound_effects', nextVal);
  };

  // Change daily minutes
  const handleSelectMinutes = (minutes: number) => {
    setDailyMinutes(minutes);
    storage.set('toeic_daily_minutes', minutes);
  };

  // Export local data to JSON
  const handleExportData = () => {
    if (typeof window === 'undefined') return;

    const backupData: Record<string, any> = {
      exportDate: new Date().toISOString(),
      version: '1.0',
      targetScore: storage.get('toeic_target_score', '750+'),
      examDate: storage.get('toeic_exam_date', null),
      streak: storage.get('toeic_study_streak', null),
      vocabAutoplay: storage.get('toeic_vocab_autoplay', false),
      soundEffects: storage.get('toeic_sound_effects', true),
      dailyMinutes: storage.get('toeic_daily_minutes', 30),
      mistakes: storage.get('mistake_notebook', {}),
      userVocabulary: storage.get('user_vocabulary', []),
      examHistory: storage.get('toeic_exam_history', []),
      adaptivePlan: storage.get('toeic_adaptive_study_plan', null),
    };

    // Collect all progress keys
    const progressKeys: Record<string, any> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('progress_')) {
        progressKeys[key] = storage.get(key, true);
      }
    }
    backupData.progress = progressKeys;

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    a.href = url;
    a.download = `toeic_master_backup_${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import JSON backup
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json && typeof json === 'object') {
          if (json.targetScore) storage.set('toeic_target_score', json.targetScore);
          if (json.examDate) storage.set('toeic_exam_date', json.examDate);
          if (json.streak) storage.set('toeic_study_streak', json.streak);
          if (json.mistakes) storage.set('mistake_notebook', json.mistakes);
          if (json.userVocabulary) storage.set('user_vocabulary', json.userVocabulary);
          if (json.examHistory) storage.set('toeic_exam_history', json.examHistory);
          if (json.adaptivePlan) storage.set('toeic_adaptive_study_plan', json.adaptivePlan);
          if (json.progress) {
            Object.entries(json.progress).forEach(([k, v]) => storage.set(k, v));
          }

          alert('Khôi phục dữ liệu thành công! Trang sẽ tải lại để cập nhật.');
          window.location.reload();
        }
      } catch (err) {
        alert('Tệp dữ liệu không hợp lệ. Vui lòng chọn tệp JSON sao lưu đúng chuẩn.');
      }
    };
    reader.readAsText(file);
  };

  // Clear local storage cache
  const handleClearCache = () => {
    const confirmed = window.confirm(
      'Bạn có chắc chắn muốn xóa toàn bộ dữ liệu học tập cục bộ? Hành động này không thể hoàn tác nếu chưa đồng bộ Cloud.'
    );
    if (!confirmed) return;

    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('toeic_') || key.startsWith('progress_') || key.includes('mistake') || key.includes('vocab'))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
    alert('Đã xóa dữ liệu cục bộ thành công.');
    window.location.reload();
  };

  // Milestones verification
  const isStreakBadgeUnlocked = (streakData.currentStreak || 0) >= 3 || (streakData.bestStreak || 0) >= 3;
  const isVocabBadgeUnlocked = (leitnerStats.mastered || 0) >= 20;
  const isMistakeBadgeUnlocked = totalMistakesCount > 0;
  const isExamBadgeUnlocked = storage.get<any[]>('toeic_exam_history', []).length > 0;

  return (
    <div className={`${styles.container} stagger-children`}>
      {/* 1. Hero Profile Banner */}
      <section className={styles.heroBanner}>
        <div className={styles.heroContent}>
          <div className={styles.avatarWrapper}>
            <img
              src={
                isAuthenticated
                  ? session.user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user?.email}`
                  : 'https://api.dicebear.com/7.x/avataaars/svg?seed=local_learner'
              }
              alt="Avatar"
              className={styles.avatar}
            />
            <div className={styles.avatarBadge}>
              <UserIcon size={14} />
            </div>
          </div>

          <div className={styles.heroInfo}>
            <div className={styles.heroTitleRow}>
              <h1 className={styles.userName}>
                {isAuthenticated ? session.user?.name || 'Học viên TOEIC' : 'Người học Cục bộ (Local)'}
              </h1>
              <span
                className={`${styles.statusTag} ${isAuthenticated ? styles.statusTagSynced : styles.statusTagLocal}`}
              >
                {isAuthenticated ? (
                  <>
                    <CheckCircleIcon size={12} />
                    Đã đồng bộ Cloud
                  </>
                ) : (
                  <>
                    <ShieldIcon size={12} />
                    Lưu trữ Cục bộ
                  </>
                )}
              </span>
            </div>

            <p className={styles.userEmail}>
              {isAuthenticated ? session.user?.email : 'Tiến độ được bảo vệ an toàn trên thiết bị này'}
            </p>

            <div className={styles.heroMeta}>
              <span>Mục tiêu hiện tại: {targetScore}</span>
              <span>•</span>
              <span>
                {isDateValid && parsedExamDate ? `Thi ngày: ${parsedExamDate.toLocaleDateString('vi-VN')}` : 'Chưa đặt ngày thi'}
              </span>
              {daysLeft !== null && (
                <>
                  <span>•</span>
                  <span>Còn {daysLeft} ngày</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* CTA prompt if unauthenticated */}
        {!isAuthenticated && (
          <div className={styles.guestPrompt}>
            <div className={styles.guestPromptText}>
              <span className={styles.guestPromptTitle}>Kích hoạt đồng bộ đa thiết bị</span>
              <span className={styles.guestPromptDesc}>
                Đăng nhập tài khoản Google để tự động lưu lộ trình, sổ tay lỗi sai và chuỗi học tập lên đám mây.
              </span>
            </div>
            <Link href="/login" className="btn-primary btn-sm">
              Đăng nhập ngay
              <ArrowRightIcon size={16} />
            </Link>
          </div>
        )}
      </section>

      {/* 2. Main Layout Grid (2 Columns) */}
      <div className={styles.layoutGrid}>
        {/* Left Column (60%): Overview & Achievements */}
        <div className={styles.column}>
          {/* Card: Learning Overview */}
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderLeft}>
                <div className={styles.iconBox}>
                  <TrendingUpIcon size={20} />
                </div>
                <h2 className={styles.cardTitle}>Tổng quan năng lực</h2>
              </div>
              <Link href="/stats" className="btn-secondary btn-sm">
                Chi tiết
                <ArrowRightIcon size={14} />
              </Link>
            </div>

            {/* Predictive Score Box */}
            {predictiveScore && (
              <div className={styles.predictedScoreCard}>
                <div className={styles.predictedTopRow}>
                  <span className={styles.predictedLabel}>Dự đoán điểm TOEIC hiện tại</span>
                  <span className={styles.confidenceBadge}>{predictiveScore.sourceLabel}</span>
                </div>

                <div className={styles.predictedScoreRange}>
                  <span className={styles.predictedScoreNumber}>
                    {predictiveScore.predictedMin} – {predictiveScore.predictedMax}
                  </span>
                  <span className={styles.predictedScoreSub}>/ 990</span>
                </div>

                <div className={styles.subScoreRow}>
                  <div className={styles.subScoreItem}>
                    <span>Listening:</span>
                    <span className={styles.subScoreVal}>{predictiveScore.listeningScore}</span>
                  </div>
                  <div className={styles.subScoreItem}>
                    <span>Reading:</span>
                    <span className={styles.subScoreVal}>{predictiveScore.readingScore}</span>
                  </div>
                  <div className={styles.subScoreItem}>
                    <span>Cách mục tiêu:</span>
                    <span className={styles.subScoreVal} style={{ color: 'var(--primary)' }}>
                      {Math.max(0, predictiveScore.distanceToTarget)} điểm
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 4 Mini Stat Boxes */}
            <div className={styles.statsMiniGrid}>
              <div className={styles.statBox}>
                <span className={styles.statBoxValue} style={{ color: 'var(--warning)' }}>
                  {streakData.currentStreak || 0}
                </span>
                <span className={styles.statBoxLabel}>Ngày chuỗi</span>
              </div>

              <div className={styles.statBox}>
                <span className={styles.statBoxValue} style={{ color: 'var(--primary)' }}>
                  {streakData.freezeCount || 0}
                </span>
                <span className={styles.statBoxLabel}>Khiên bảo vệ</span>
              </div>

              <div className={styles.statBox}>
                <span className={styles.statBoxValue} style={{ color: 'var(--success)' }}>
                  {leitnerStats.mastered}
                </span>
                <span className={styles.statBoxLabel}>Từ đã thuộc</span>
              </div>

              <div className={styles.statBox}>
                <span className={styles.statBoxValue} style={{ color: 'var(--danger)' }}>
                  {totalMistakesCount}
                </span>
                <span className={styles.statBoxLabel}>Câu cần ôn</span>
              </div>
            </div>
          </section>

          {/* Card: Milestones & Badges */}
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderLeft}>
                <div className={`${styles.iconBox} ${styles.iconBoxSuccess}`}>
                  <AwardIcon size={20} />
                </div>
                <h2 className={styles.cardTitle}>Huy hiệu học tập</h2>
              </div>
            </div>

            <div className={styles.badgesGrid}>
              <div className={`${styles.badgeCard} ${isStreakBadgeUnlocked ? styles.unlocked : styles.locked}`}>
                <div className={styles.badgeIconBox}>
                  <ShieldIcon size={22} />
                </div>
                <h3 className={styles.badgeTitle}>Kiên Trì</h3>
                <p className={styles.badgeDesc}>Duy trì chuỗi học 3 ngày liên tục</p>
              </div>

              <div className={`${styles.badgeCard} ${isVocabBadgeUnlocked ? styles.unlocked : styles.locked}`}>
                <div className={styles.badgeIconBox}>
                  <CardsIcon size={22} />
                </div>
                <h3 className={styles.badgeTitle}>Từ Vựng Vàng</h3>
                <p className={styles.badgeDesc}>Nắm vững 20+ từ vựng vào Hộp 5</p>
              </div>

              <div className={`${styles.badgeCard} ${isMistakeBadgeUnlocked ? styles.unlocked : styles.locked}`}>
                <div className={styles.badgeIconBox}>
                  <NotebookIcon size={22} />
                </div>
                <h3 className={styles.badgeTitle}>Tự Phản Tư</h3>
                <p className={styles.badgeDesc}>Ghi nhận lỗi sai vào Sổ tay</p>
              </div>

              <div className={`${styles.badgeCard} ${isExamBadgeUnlocked ? styles.unlocked : styles.locked}`}>
                <div className={styles.badgeIconBox}>
                  <TargetIcon size={22} />
                </div>
                <h3 className={styles.badgeTitle}>Chiến Binh ETS</h3>
                <p className={styles.badgeDesc}>Hoàn thành ít nhất 1 bài thi thử</p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column (40%): Goals, Preferences & Cloud Sync */}
        <div className={styles.column}>
          {/* Card: Direct Goal Editing */}
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderLeft}>
                <div className={styles.iconBox}>
                  <TargetIcon size={20} />
                </div>
                <h2 className={styles.cardTitle}>Mục tiêu của bạn</h2>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Mục tiêu điểm số</label>
              <div className={styles.pillsRow}>
                {TARGET_SCORE_OPTIONS.map((score) => (
                  <button
                    key={score}
                    type="button"
                    className={`${styles.scorePill} ${selectedTargetScore === score ? styles.scorePillActive : ''}`}
                    onClick={() => setSelectedTargetScore(score)}
                  >
                    {score}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Ngày thi dự kiến</label>
              <div className={styles.dateInputRow}>
                <input
                  type="date"
                  className={styles.dateInput}
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                />
                {daysLeft !== null && <span className={styles.daysLeftChip}>Còn {daysLeft} ngày</span>}
              </div>
            </div>

            <div className={styles.saveBtnRow}>
              {saveSuccess ? (
                <span className={styles.saveFeedback}>
                  <CheckCircleIcon size={16} />
                  Đã lưu mục tiêu!
                </span>
              ) : (
                <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Tự động đồng bộ với lộ trình</span>
              )}
              <button type="button" className="btn-primary btn-sm" onClick={handleSaveGoals}>
                Lưu thay đổi
              </button>
            </div>
          </section>

          {/* Card: Learning Preferences */}
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderLeft}>
                <div className={`${styles.iconBox} ${styles.iconBoxWarning}`}>
                  <SettingsIcon size={20} />
                </div>
                <h2 className={styles.cardTitle}>Cài đặt học tập</h2>
              </div>
            </div>

            {/* Preference: Vocab Autoplay */}
            <div className={styles.preferenceItem}>
              <div className={styles.preferenceText}>
                <span className={styles.preferenceTitle}>Tự động phát âm Flashcard</span>
                <span className={styles.preferenceDesc}>Tự động đọc từ khi chuyển thẻ mới</span>
              </div>
              <button
                type="button"
                className={`${styles.toggleSwitch} ${vocabAutoplay ? styles.active : ''}`}
                onClick={handleToggleAutoplay}
                aria-label="Toggle autoplay"
              >
                <div className={styles.toggleKnob} />
              </button>
            </div>

            {/* Preference: Sound Effects */}
            <div className={styles.preferenceItem}>
              <div className={styles.preferenceText}>
                <span className={styles.preferenceTitle}>Hiệu ứng âm thanh</span>
                <span className={styles.preferenceDesc}>Âm thanh khi chọn đáp án và hoàn thành</span>
              </div>
              <button
                type="button"
                className={`${styles.toggleSwitch} ${soundEffects ? styles.active : ''}`}
                onClick={handleToggleSound}
                aria-label="Toggle sound effects"
              >
                <div className={styles.toggleKnob} />
              </button>
            </div>

            {/* Preference: Daily study target */}
            <div className={styles.preferenceItem}>
              <div className={styles.preferenceText}>
                <span className={styles.preferenceTitle}>Thời gian học mỗi ngày</span>
                <span className={styles.preferenceDesc}>Khuyến nghị tối thiểu 30 phút</span>
              </div>
              <div className={styles.minutePills}>
                {DAILY_MINUTE_OPTIONS.map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    className={`${styles.minPill} ${dailyMinutes === mins ? styles.minPillActive : ''}`}
                    onClick={() => handleSelectMinutes(mins)}
                  >
                    {mins}p
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Card: Cloud Sync & Data Management */}
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderLeft}>
                <div className={styles.iconBox}>
                  <ZapIcon size={20} />
                </div>
                <h2 className={styles.cardTitle}>Đồng bộ & Dữ liệu</h2>
              </div>
            </div>

            <div className={styles.syncStatusBox}>
              <div className={styles.syncStatusLeft}>
                <div className={isSyncing ? styles.syncIconSpin : ''}>
                  <RotateCcwIcon size={16} />
                </div>
                <span>
                  {isSyncing
                    ? 'Đang đồng bộ đám mây...'
                    : lastSynced
                    ? `Lần cuối: ${lastSynced.toLocaleTimeString('vi-VN')}`
                    : 'Chưa đồng bộ lên mây'}
                </span>
              </div>
              {isAuthenticated && (
                <button
                  type="button"
                  className="btn-secondary btn-sm"
                  onClick={() => syncNow()}
                  disabled={isSyncing}
                >
                  {isSyncing ? 'Xử lý...' : 'Đồng bộ'}
                </button>
              )}
            </div>

            {/* Backup & Restore Row */}
            <div className={styles.backupBtnRow}>
              <button type="button" className={styles.backupBtn} onClick={handleExportData}>
                <DownloadIcon size={16} />
                Xuất file sao lưu
              </button>

              <button
                type="button"
                className={styles.backupBtn}
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadIcon size={16} />
                Khôi phục dữ liệu
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                style={{ display: 'none' }}
                onChange={handleImportFile}
              />
            </div>
          </section>

          {/* Danger Zone */}
          <section className={`${styles.card} ${styles.dangerCard}`}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderLeft}>
                <div className={styles.iconBox}>
                  <TrashIcon size={18} />
                </div>
                <h2 className={styles.cardTitle} style={{ color: 'var(--danger)' }}>
                  Quản trị tài khoản
                </h2>
              </div>
            </div>

            <div className={styles.dangerActions}>
              <button type="button" className={styles.clearDataBtn} onClick={handleClearCache}>
                Xóa dữ liệu cục bộ
              </button>

              {isAuthenticated ? (
                <button
                  type="button"
                  className={styles.dangerBtn}
                  onClick={() => signOut({ callbackUrl: '/login' })}
                >
                  Đăng xuất
                </button>
              ) : (
                <Link href="/login" className="btn-primary btn-sm">
                  Đăng nhập
                </Link>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
