'use client';

import { useState } from 'react';
import {
  CloseIcon,
  UploadIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  ShieldIcon,
  NotebookIcon,
  CardsIcon,
  TargetIcon,
  FileTextIcon,
  RotateCcwIcon,
  CheckIcon,
} from '@/components/icons/AppIcons';
import { ValidationResult, RestoreMode } from '@/utils/dataBackup';
import styles from './BackupRestoreModal.module.css';

interface BackupRestoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  validationResult: ValidationResult | null;
  fileName: string;
  fileSize: string;
  onConfirmRestore: (mode: RestoreMode) => void;
}

export default function BackupRestoreModal({
  isOpen,
  onClose,
  validationResult,
  fileName,
  fileSize,
  onConfirmRestore,
}: BackupRestoreModalProps) {
  const [selectedMode, setSelectedMode] = useState<RestoreMode>('merge');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen || !validationResult) return null;

  const { isValid, error, metadata } = validationResult;

  const handleExecuteRestore = () => {
    setIsProcessing(true);
    try {
      onConfirmRestore(selectedMode);
      setIsSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (err) {
      console.error('Lỗi khi phục hồi dữ liệu:', err);
      setIsProcessing(false);
    }
  };

  const formattedDate = metadata?.exportDate
    ? new Date(metadata.exportDate).toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Không xác định';

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.iconBox}>
              <UploadIcon size={20} />
            </div>
            <div>
              <h3 className={styles.title}>Khôi Phục Dữ Liệu Học Tập</h3>
              <p className={styles.subtitle}>Kiểm tra bản sao lưu trước khi áp dụng</p>
            </div>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            disabled={isProcessing || isSuccess}
            aria-label="Đóng"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className={styles.body}>
          {isSuccess ? (
            <div className={styles.successBox}>
              <CheckCircleIcon size={36} />
              <h4 className={styles.successTitle}>Khôi Phục Thành Công!</h4>
              <p className={styles.successDesc}>
                Toàn bộ tiến độ học tập đã được cập nhật an toàn. Trang sẽ tự động tải lại ngay...
              </p>
            </div>
          ) : !isValid ? (
            <div className={styles.errorBox}>
              <AlertCircleIcon size={22} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Tệp sao lưu không hợp lệ:</strong>
                <p style={{ margin: '4px 0 0 0' }}>{error || 'Không tìm thấy cấu trúc dữ liệu TOEIC hợp lệ.'}</p>
              </div>
            </div>
          ) : (
            <>
              {/* File details info bar */}
              <div className={styles.fileMetaBar}>
                <span className={styles.fileName}>
                  <FileTextIcon size={14} />
                  {fileName} ({fileSize})
                </span>
                <span className={styles.fileDate}>Tạo lúc: {formattedDate}</span>
              </div>

              {/* Stats overview of backup */}
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statCardIcon}>
                    <ShieldIcon size={18} />
                  </div>
                  <span className={styles.statCardVal}>{metadata?.currentStreak || 0}</span>
                  <span className={styles.statCardLbl}>Ngày chuỗi</span>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statCardIcon}>
                    <NotebookIcon size={18} />
                  </div>
                  <span className={styles.statCardVal}>{metadata?.totalMistakes || 0}</span>
                  <span className={styles.statCardLbl}>Câu hỏi sai</span>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statCardIcon}>
                    <CardsIcon size={18} />
                  </div>
                  <span className={styles.statCardVal}>{metadata?.totalVocabMastered || 0}</span>
                  <span className={styles.statCardLbl}>Từ thuộc Hộp 5</span>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statCardIcon}>
                    <TargetIcon size={18} />
                  </div>
                  <span className={styles.statCardVal}>{metadata?.totalExamsTaken || 0}</span>
                  <span className={styles.statCardLbl}>Bài thi ETS</span>
                </div>
              </div>

              {/* Target score and exam date banner */}
              <div className={styles.targetInfoRow}>
                <div className={styles.targetInfoItem}>
                  <span className={styles.targetLabel}>Mục tiêu:</span>
                  <span className={styles.targetVal}>{metadata?.targetScore || '750+'}</span>
                </div>
                {metadata?.examDate && (
                  <div className={styles.targetInfoItem}>
                    <span className={styles.targetLabel}>Ngày thi:</span>
                    <span className={styles.targetVal}>
                      {new Date(metadata.examDate).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                )}
                <div className={styles.targetInfoItem}>
                  <span className={styles.targetLabel}>Định dạng:</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>
                    {metadata?.version || '2.0'}
                  </span>
                </div>
              </div>

              {/* Restore Mode Selection */}
              <div className={styles.modeSelectionSection}>
                <label className={styles.modeSelectionLabel}>Chọn phương thức khôi phục:</label>
                <div className={styles.modeCards}>
                  {/* Mode 1: Smart Merge */}
                  <div
                    id="mode-merge"
                    data-testid="mode-merge"
                    className={`${styles.modeCard} ${selectedMode === 'merge' ? styles.modeCardActive : ''}`}
                    onClick={() => setSelectedMode('merge')}
                  >
                    <div className={styles.radioCircle}>
                      {selectedMode === 'merge' && <div className={styles.radioDot} />}
                    </div>
                    <div className={styles.modeCardContent}>
                      <div className={styles.modeTitleRow}>
                        <h4 className={styles.modeTitle}>Gộp thông minh (Smart Merge)</h4>
                        <span className={styles.recommendedBadge}>Khuyên dùng</span>
                      </div>
                      <p className={styles.modeDesc}>
                        Hợp nhất với dữ liệu đang có trên máy này. Giữ chuỗi cao nhất, gộp toàn bộ câu hỏi sai và không làm mất tiến độ học gần đây.
                      </p>
                    </div>
                  </div>

                  {/* Mode 2: Clean Replace */}
                  <div
                    id="mode-replace"
                    data-testid="mode-replace"
                    className={`${styles.modeCard} ${selectedMode === 'replace' ? styles.modeCardActive : ''}`}
                    onClick={() => setSelectedMode('replace')}
                  >
                    <div className={styles.radioCircle}>
                      {selectedMode === 'replace' && <div className={styles.radioDot} />}
                    </div>
                    <div className={styles.modeCardContent}>
                      <div className={styles.modeTitleRow}>
                        <h4 className={styles.modeTitle}>Ghi đè hoàn toàn (Clean Replace)</h4>
                      </div>
                      <p className={styles.modeDesc}>
                        Xóa và thay thế toàn bộ dữ liệu trên máy này bằng bản sao lưu. Thích hợp khi chuyển sang thiết bị mới hoàn toàn.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className={styles.footer}>
          <button
            type="button"
            className="btn-secondary btn-sm"
            onClick={onClose}
            disabled={isProcessing || isSuccess}
          >
            Hủy bỏ
          </button>
          {isValid && !isSuccess && (
            <button
              type="button"
              className="btn-primary btn-sm"
              onClick={handleExecuteRestore}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <RotateCcwIcon size={16} />
                  Đang khôi phục...
                </>
              ) : (
                <>
                  <CheckIcon size={16} />
                  Xác nhận khôi phục
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
