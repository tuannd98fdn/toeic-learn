'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MasterclassDayPack } from '@/schema/masterclass';
import { MASTERCLASS_DAY_PACKS } from '@/data/masterclass/masterclassPacks';
import ConnectedSpeechPlayer from './ConnectedSpeechPlayer';
import ParaphraseDecoderCard from './ParaphraseDecoderCard';
import HighScoreChallengeCard from './HighScoreChallengeCard';
import {
  ClockIcon,
  PlayIcon,
  PauseIcon,
  HeadphonesIcon,
  BookOpenIcon,
  TargetIcon,
  AwardIcon,
  SparklesIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  RotateCcwIcon,
  ShieldCheckIcon
} from '@/components/icons/AppIcons';
import { soundEffects } from '@/utils/soundEffects';
import { useStreak } from '@/hooks/useStreak';
import { storage } from '@/utils/storage';
import styles from './DailyMasterclassHub.module.css';

interface DailyMasterclassHubProps {
  initialDay?: number;
}

export default function DailyMasterclassHub({ initialDay = 1 }: DailyMasterclassHubProps) {
  const { recordStudy } = useStreak();
  const [selectedDay, setSelectedDay] = useState<number>(initialDay);
  const [currentStage, setCurrentStage] = useState<1 | 2 | 3 | 4>(1);

  // 30-minute timer state (1800 seconds)
  const [secondsLeft, setSecondsLeft] = useState<number>(1800);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const pack: MasterclassDayPack =
    MASTERCLASS_DAY_PACKS.find((p) => p.dayNumber === selectedDay) || MASTERCLASS_DAY_PACKS[0];

  // Timer countdown effect
  useEffect(() => {
    if (!isTimerRunning || secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsLeft]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleFinishSession = () => {
    setIsCompleted(true);
    setIsTimerRunning(false);
    soundEffects.playVictory();
    recordStudy();

    // Save retention vocab to Leitner SRS
    const existingProgress = storage.get<Record<string, any>>('leitner_progress', {});
    const updated = { ...existingProgress };
    pack.retentionVocab.forEach((v) => {
      const vocabId = `mc_${v.word.replace(/\s+/g, '_').toLowerCase()}`;
      if (!updated[vocabId]) {
        updated[vocabId] = {
          wordId: vocabId,
          box: 2, // Start in box 2 for masterclass retention
          lastReviewed: new Date().toISOString(),
          nextReviewDate: new Date(Date.now() + 2 * 24 * 3600 * 1000).toISOString()
        };
      }
    });
    storage.set('leitner_progress', updated);

    // Record masterclass completion
    const completedDays = storage.get<number[]>('toeic_masterclass_completed_days', []);
    if (!completedDays.includes(pack.dayNumber)) {
      storage.set('toeic_masterclass_completed_days', [...completedDays, pack.dayNumber]);
    }
  };

  const stages = [
    { id: 1, label: 'Trạm 1: Bẻ Khóa Âm', time: '07:00', icon: <HeadphonesIcon size={16} /> },
    { id: 2, label: 'Trạm 2: Đọc Thương Mại', time: '10:00', icon: <BookOpenIcon size={16} /> },
    { id: 3, label: 'Trạm 3: Đấu Trường 850+', time: '08:00', icon: <TargetIcon size={16} /> },
    { id: 4, label: 'Trạm 4: Khắc Sâu & Nhận XP', time: '05:00', icon: <AwardIcon size={16} /> }
  ];

  return (
    <div className={styles.hubContainer}>
      {/* Top Banner with Pack Info & Live Countdown */}
      <div className={styles.topBar}>
        <div className={styles.packMeta}>
          <div className={styles.packTitleRow}>
            <span className={styles.masterclassBadge}>
              <SparklesIcon size={14} />
              TOEIC Masterclass 800 - 990
            </span>
            <select
              className={styles.daySelector}
              value={selectedDay}
              onChange={(e) => {
                const day = parseInt(e.target.value, 10);
                setSelectedDay(day);
                setCurrentStage(1);
                setIsCompleted(false);
                setSecondsLeft(1800);
              }}
            >
              {MASTERCLASS_DAY_PACKS.map((p) => (
                <option key={p.dayNumber} value={p.dayNumber}>
                  Ngày {p.dayNumber}: {p.theme}
                </option>
              ))}
            </select>
          </div>
          <p className={styles.packDesc}>{pack.description}</p>
        </div>

        {/* 30:00 Countdown Timer Widget */}
        <div className={styles.timerWidget}>
          <div className={styles.timerDisplay}>
            <ClockIcon size={18} className={styles.clockIcon} />
            <span className={styles.timerText}>{formatTime(secondsLeft)}</span>
          </div>
          <div className={styles.timerControls}>
            <button
              type="button"
              className={styles.timerBtn}
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              title={isTimerRunning ? 'Tạm dừng đồng hồ' : 'Tiếp tục học'}
            >
              {isTimerRunning ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
            </button>
            <button
              type="button"
              className={styles.timerBtn}
              onClick={() => setSecondsLeft(1800)}
              title="Đặt lại 30:00"
            >
              <RotateCcwIcon size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* 4-Stage Stepper */}
      <div className={styles.stepper}>
        {stages.map((st) => {
          const isCurrent = currentStage === st.id;
          const isPassed = currentStage > st.id;
          return (
            <button
              key={st.id}
              type="button"
              className={`${styles.stepBtn} ${isCurrent ? styles.activeStep : ''} ${
                isPassed ? styles.passedStep : ''
              }`}
              onClick={() => setCurrentStage(st.id as 1 | 2 | 3 | 4)}
            >
              <div className={styles.stepIconWrap}>{st.icon}</div>
              <div className={styles.stepInfo}>
                <span className={styles.stepLabel}>{st.label}</span>
                <span className={styles.stepTime}>{st.time}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Content Area Based on Stage */}
      <div className={styles.stageContent}>
        {currentStage === 1 && (
          <div className={styles.stageView}>
            <ConnectedSpeechPlayer
              lesson={pack.speechLesson}
              onCompleted={() => {}}
            />
            <div className={styles.stageNavFooter}>
              <div className={styles.navTip}>
                <SparklesIcon size={16} />
                <span>Hoàn thành Trạm 1 để rèn phản xạ nhận diện âm thanh nuốt/nối giọng bản xứ.</span>
              </div>
              <button
                type="button"
                className={styles.nextStageBtn}
                onClick={() => setCurrentStage(2)}
              >
                <span>Sang Trạm 2: Đọc Hiểu Thương Mại</span>
                <ArrowRightIcon size={16} />
              </button>
            </div>
          </div>
        )}

        {currentStage === 2 && (
          <div className={styles.stageView}>
            <ParaphraseDecoderCard scenario={pack.businessScenario} />
            <div className={styles.stageNavFooter}>
              <button
                type="button"
                className={styles.prevStageBtn}
                onClick={() => setCurrentStage(1)}
              >
                Quay lại Trạm 1
              </button>
              <button
                type="button"
                className={styles.nextStageBtn}
                onClick={() => setCurrentStage(3)}
              >
                <span>Sang Trạm 3: Đấu Trường 850+</span>
                <ArrowRightIcon size={16} />
              </button>
            </div>
          </div>
        )}

        {currentStage === 3 && (
          <div className={styles.stageView}>
            <HighScoreChallengeCard
              questions={pack.challengeQuestions}
              onComplete={() => setCurrentStage(4)}
            />
            <div className={styles.stageNavFooter}>
              <button
                type="button"
                className={styles.prevStageBtn}
                onClick={() => setCurrentStage(2)}
              >
                Quay lại Trạm 2
              </button>
              <button
                type="button"
                className={styles.nextStageBtn}
                onClick={() => setCurrentStage(4)}
              >
                <span>Sang Trạm 4: Khắc Sâu Trí Nhớ</span>
                <ArrowRightIcon size={16} />
              </button>
            </div>
          </div>
        )}

        {currentStage === 4 && (
          <div className={styles.stageView}>
            {!isCompleted ? (
              <div className={styles.retentionCard}>
                <div className={styles.retentionHeader}>
                  <AwardIcon size={28} className={styles.retentionIcon} />
                  <div>
                    <h3 className={styles.retentionTitle}>Khắc Sâu 5 Cụm Từ Vựng Tinh Hoa Hôm Nay</h3>
                    <p className={styles.retentionSub}>
                      Các cụm từ này sẽ được tự động đưa vào Hộp Trí Nhớ Leitner Box 2 để Spaced Repetition nhắc nhở bạn định kỳ.
                    </p>
                  </div>
                </div>

                <div className={styles.vocabGrid}>
                  {pack.retentionVocab.map((v, i) => (
                    <div key={i} className={styles.vocabItemCard}>
                      <div className={styles.vocabItemTop}>
                        <span className={styles.vocabItemWord}>{v.word}</span>
                        <span className={styles.vocabItemIpa}>{v.ipa}</span>
                      </div>
                      <p className={styles.vocabItemMeaning}>{v.meaning}</p>
                      <div className={styles.vocabItemColloc}>
                        <span className={styles.collocLabel}>Collocation:</span>
                        <code>{v.collocation}</code>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className={styles.claimRewardBtn}
                  onClick={handleFinishSession}
                >
                  <ShieldCheckIcon size={20} />
                  <span>HOÀN TẤT 30 PHÚT &amp; NHẬN +100 XP</span>
                </button>
              </div>
            ) : (
              <div className={styles.celebrationCard}>
                <div className={styles.celebrationBadge}>
                  <CheckCircleIcon size={36} />
                </div>
                <h3 className={styles.celebrationTitle}>Xuất Sắc! Hoàn Tất 30 Phút Bứt Phá Điểm Cao</h3>
                <p className={styles.celebrationSub}>
                  Bạn đã làm chủ bài học âm học, giải mã trọn vẹn kịch bản thương mại cao cấp và chinh phục các câu bẫy điểm 850+.
                </p>

                <div className={styles.rewardStatsRow}>
                  <div className={styles.rewardStat}>
                    <span className={styles.rewardStatValue}>+100 XP</span>
                    <span className={styles.rewardStatLabel}>Điểm Thưởng Nỗ Lực</span>
                  </div>
                  <div className={styles.rewardStat}>
                    <span className={styles.rewardStatValue}>+5 Từ Vựng</span>
                    <span className={styles.rewardStatLabel}>Đã Nhập Leitner Box 2</span>
                  </div>
                  <div className={styles.rewardStat}>
                    <span className={styles.rewardStatValue}>+20 Điểm</span>
                    <span className={styles.rewardStatLabel}>Nâng Trần Tri Thức</span>
                  </div>
                </div>

                <div className={styles.celebrationActions}>
                  <Link href="/" className={styles.primaryActionBtn}>
                    <span>Về Trang Chủ</span>
                    <ArrowRightIcon size={16} />
                  </Link>
                  <button
                    type="button"
                    className={styles.secondaryActionBtn}
                    onClick={() => {
                      const nextDay = selectedDay < MASTERCLASS_DAY_PACKS.length ? selectedDay + 1 : 1;
                      setSelectedDay(nextDay);
                      setCurrentStage(1);
                      setIsCompleted(false);
                      setSecondsLeft(1800);
                    }}
                  >
                    Học Bài Ngày Tiếp Theo
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
