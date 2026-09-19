'use client';

import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { 
  ShareIcon, 
  DownloadIcon, 
  CloseIcon, 
  CheckIcon, 
  ZapIcon, 
  CardsIcon, 
  ExamIcon 
} from '@/components/icons/AppIcons';
import styles from './ShareButton.module.css';

export interface StatsShareData {
  predictedScore: string;
  cefrLevel: string;
  currentStreak: number;
  masteredWords: number;
  totalExams: number;
}

interface ShareButtonProps {
  elementId?: string;
  statsData?: StatsShareData;
  title?: string;
  text?: string;
  className?: string;
}

export default function ShareButton({ 
  statsData,
  title = 'Chứng Nhận Năng Lực TOEIC', 
  className = 'btn-primary'
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const fallbackData: StatsShareData = {
    predictedScore: '750 - 820',
    cefrLevel: 'B2',
    currentStreak: 0,
    masteredWords: 0,
    totalExams: 0,
  };

  const data = statsData || fallbackData;
  const todayStr = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const generateCanvas = async () => {
    if (!cardRef.current) return null;
    return await html2canvas(cardRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      logging: false,
    });
  };

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      setFeedback(null);
      const canvas = await generateCanvas();
      if (!canvas) return;

      const link = document.createElement('a');
      link.download = `toeic-certificate-${todayStr.replace(/\//g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      setFeedback('Đã tải ảnh chứng nhận thành công!');
      setTimeout(() => setFeedback(null), 3500);
    } catch (err) {
      console.error('Lỗi khi tải ảnh:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNativeShare = async () => {
    try {
      setIsGenerating(true);
      setFeedback(null);
      const canvas = await generateCanvas();
      if (!canvas) return;

      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], 'toeic-certificate.png', { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title,
              text: `Tôi vừa đạt mức điểm dự đoán ${data.predictedScore} TOEIC trên TOEIC Master VN! Cùng rèn luyện nhé!`,
              files: [file],
            });
            setFeedback('Đã mở chia sẻ thành công!');
          } catch (shareErr) {
            console.log('User cancelled share', shareErr);
          }
        } else {
          // Fallback: trigger download
          const link = document.createElement('a');
          link.download = `toeic-certificate-${todayStr.replace(/\//g, '-')}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
          setFeedback('Thiết bị không hỗ trợ Share API, đã tự động tải ảnh về máy!');
        }
        setTimeout(() => setFeedback(null), 3500);
        setIsGenerating(false);
      });
    } catch (err) {
      console.error('Lỗi khi chia sẻ:', err);
      setIsGenerating(false);
    }
  };

  return (
    <>
      <button 
        className={className} 
        onClick={() => setIsOpen(true)}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}
      >
        <ShareIcon size={18} />
        <span>Khoe Thành Tích</span>
      </button>

      {isOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Chứng Nhận Tiến Trình & Thành Tích TOEIC</h3>
              <button 
                className={styles.closeBtn} 
                onClick={() => setIsOpen(false)}
                aria-label="Đóng modal"
              >
                <CloseIcon size={20} />
              </button>
            </div>

            <div className={styles.previewContainer}>
              {/* Captured Card */}
              <div 
                ref={cardRef} 
                className={styles.certificateCard} 
                id="achievement-certificate-card"
              >
                <div className={styles.cardGlowTop} />
                
                <div className={styles.cardTopRow}>
                  <div className={styles.brandWrap}>
                    <span className={styles.brandLogo}>TOEIC Master VN</span>
                  </div>
                  <span className={styles.badgeOfficial}>Chứng Nhận Năng Lực</span>
                </div>

                <div className={styles.scoreHeroSection}>
                  <span className={styles.scoreLabel}>Điểm Dự Đoán Thực Chiến</span>
                  <div className={styles.scoreValue}>{data.predictedScore}</div>
                  <div className={styles.cefrPillWrap}>
                    <span>Xếp loại CEFR: {data.cefrLevel}</span>
                  </div>
                </div>

                <div className={styles.statsTrio}>
                  <div className={styles.trioItem}>
                    <div className={styles.trioIcon}>
                      <ZapIcon size={18} />
                    </div>
                    <span className={styles.trioValue}>{data.currentStreak} ngày</span>
                    <span className={styles.trioLabel}>Chuỗi rèn luyện</span>
                  </div>

                  <div className={styles.trioItem}>
                    <div className={styles.trioIcon}>
                      <CardsIcon size={18} />
                    </div>
                    <span className={styles.trioValue}>{data.masteredWords} từ</span>
                    <span className={styles.trioLabel}>Nắm vững (Box 5)</span>
                  </div>

                  <div className={styles.trioItem}>
                    <div className={styles.trioIcon}>
                      <ExamIcon size={18} />
                    </div>
                    <span className={styles.trioValue}>{data.totalExams} đề</span>
                    <span className={styles.trioLabel}>Đề thi ETS hoàn thành</span>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <span>Hiệu chuẩn theo ngân hàng đề thi chuẩn ETS 2022</span>
                  <span>{todayStr} • toeicmaster.app</span>
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              {feedback ? (
                <div className={styles.feedbackMsg}>
                  <CheckIcon size={16} />
                  <span>{feedback}</span>
                </div>
              ) : (
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Thẻ được tối ưu tỷ lệ chuẩn để đăng Story Facebook / Zalo
                </span>
              )}

              <div className={styles.actionBtns}>
                <button 
                  className={styles.downloadBtn} 
                  onClick={handleDownload}
                  disabled={isGenerating}
                >
                  <DownloadIcon size={17} />
                  <span>{isGenerating ? 'Đang tạo...' : 'Tải Ảnh (PNG)'}</span>
                </button>

                <button 
                  className={styles.nativeShareBtn} 
                  onClick={handleNativeShare}
                  disabled={isGenerating}
                >
                  <ShareIcon size={17} />
                  <span>Chia Sẻ</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
