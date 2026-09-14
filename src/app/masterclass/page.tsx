import { Metadata } from 'next';
import DailyMasterclassHub from '@/components/masterclass/DailyMasterclassHub';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'TOEIC Masterclass 30\' | Bứt Phá Điểm Cao 800 - 990',
  description: 'Trạm học chuyên sâu 30 phút mỗi ngày: Bẻ khóa âm nối giọng Anh/Úc, giải mã ma trận Paraphrase thương mại và làm chủ ngữ pháp đảo ngữ Part 5.'
};

export default function MasterclassPage() {
  return (
    <main className={styles.pageWrapper}>
      <header className={styles.heroHeader}>
        <h1 className={styles.heroTitle}>
          Trạm Học Chuyên Sâu 30 Phút{' '}
          <span className="text-gradient">TOEIC Masterclass</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Nâng trần tri thức ngôn ngữ bứt phá điểm 800 - 990: Bẻ khóa âm bản xứ (UK/AU/US), giải mã kịch bản thương mại thực chiến và làm chủ bẫy đề ETS.
        </p>
      </header>

      <section className={styles.hubSection}>
        <DailyMasterclassHub />
      </section>
    </main>
  );
}
