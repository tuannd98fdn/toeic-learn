import Link from 'next/link';
import { useDailyMission, MISSION_GOALS } from '../hooks/useDailyMission';
import styles from './DailyMission.module.css';

export default function DailyMission() {
  const { mounted, missionData } = useDailyMission();

  if (!mounted) {
    return <div className={`${styles.container} card-minimal`}><div className={styles.loading}>Loading missions...</div></div>;
  }

  const { newWords, reviewedWords, quizzes } = missionData;
  const isNewWordsDone = newWords >= MISSION_GOALS.newWords;
  const isReviewedWordsDone = reviewedWords >= MISSION_GOALS.reviewedWords;
  const isQuizzesDone = quizzes >= MISSION_GOALS.quizzes;

  const totalDone = (isNewWordsDone ? 1 : 0) + (isReviewedWordsDone ? 1 : 0) + (isQuizzesDone ? 1 : 0);
  const totalMissions = 3;

  return (
    <div className={`${styles.container} card-minimal`}>
      <div className={styles.header}>
        <h2 className={styles.title}>🎯 Nhiệm vụ hôm nay</h2>
        <span className={styles.progressText}>{totalDone}/{totalMissions} hoàn thành</span>
      </div>

      <div className={styles.missionList}>
        {/* Mission 1: New Words */}
        <div className={`${styles.missionItem} ${isNewWordsDone ? styles.completed : ''}`}>
          <div className={styles.missionInfo}>
            <span className={styles.icon}>🌱</span>
            <div className={styles.details}>
              <h3>Học từ mới</h3>
              <div className={styles.progressBarBg}>
                <div 
                  className={styles.progressBarFill} 
                  style={{ width: `${(newWords / MISSION_GOALS.newWords) * 100}%` }} 
                />
              </div>
              <span className={styles.statusText}>{newWords}/{MISSION_GOALS.newWords} từ</span>
            </div>
          </div>
          {!isNewWordsDone && (
            <Link href="/vocabulary" className={styles.actionBtn}>Học ngay</Link>
          )}
          {isNewWordsDone && <span className={styles.doneMark}>✅</span>}
        </div>

        {/* Mission 2: Review Words */}
        <div className={`${styles.missionItem} ${isReviewedWordsDone ? styles.completed : ''}`}>
          <div className={styles.missionInfo}>
            <span className={styles.icon}>🔄</span>
            <div className={styles.details}>
              <h3>Ôn tập từ cũ</h3>
              <div className={styles.progressBarBg}>
                <div 
                  className={styles.progressBarFill} 
                  style={{ width: `${(reviewedWords / MISSION_GOALS.reviewedWords) * 100}%` }} 
                />
              </div>
              <span className={styles.statusText}>{reviewedWords}/{MISSION_GOALS.reviewedWords} từ</span>
            </div>
          </div>
          {!isReviewedWordsDone && (
            <Link href="/study" className={styles.actionBtn}>Ôn ngay</Link>
          )}
          {isReviewedWordsDone && <span className={styles.doneMark}>✅</span>}
        </div>

        {/* Mission 3: Quizzes */}
        <div className={`${styles.missionItem} ${isQuizzesDone ? styles.completed : ''}`}>
          <div className={styles.missionInfo}>
            <span className={styles.icon}>🎯</span>
            <div className={styles.details}>
              <h3>Làm bài Quiz</h3>
              <div className={styles.progressBarBg}>
                <div 
                  className={styles.progressBarFill} 
                  style={{ width: `${(quizzes / MISSION_GOALS.quizzes) * 100}%` }} 
                />
              </div>
              <span className={styles.statusText}>{quizzes}/{MISSION_GOALS.quizzes} bài</span>
            </div>
          </div>
          {!isQuizzesDone && (
            <Link href="/quiz" className={styles.actionBtn}>Làm ngay</Link>
          )}
          {isQuizzesDone && <span className={styles.doneMark}>✅</span>}
        </div>
      </div>
    </div>
  );
}
