'use client';

import { useState } from 'react';
import html2canvas from 'html2canvas';
import { ShareIcon } from '@/components/icons/AppIcons'; // Make sure this icon exists or create it

interface ShareButtonProps {
  elementId: string;
  title?: string;
  text?: string;
  className?: string;
}

export default function ShareButton({ 
  elementId, 
  title = 'Thành tích TOEIC của tôi', 
  text = 'Mình vừa đạt kỷ lục mới trên TOEIC Master VN! Cùng học với mình nhé!',
  className = 'btn-primary'
}: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
      setIsSharing(true);
      
      // We need to add a temporary class to the element if we want it to look specific for sharing
      // But html2canvas captures it as is.
      const canvas = await html2canvas(element, {
        scale: 2, // High resolution
        useCORS: true,
        backgroundColor: '#ffffff',
      });
      
      canvas.toBlob(async (blob) => {
        if (!blob) {
          setIsSharing(false);
          return;
        }
        
        const file = new File([blob], 'toeic-achievement.png', { type: 'image/png' });
        
        // Try to use Web Share API if supported and can share files
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title,
              text,
              files: [file],
            });
          } catch (err) {
            console.log('User cancelled share or share failed', err);
            // Fallback to download
            downloadImage(canvas.toDataURL('image/png'));
          }
        } else {
          // Fallback: Download the image directly
          downloadImage(canvas.toDataURL('image/png'));
          alert('Đã tải ảnh về máy! Bạn có thể chia sẻ nó lên Facebook/Zalo nhé.');
        }
        setIsSharing(false);
      });
      
    } catch (err) {
      console.error('Lỗi khi tạo ảnh chia sẻ:', err);
      setIsSharing(false);
    }
  };

  const downloadImage = (dataUrl: string) => {
    const link = document.createElement('a');
    link.download = 'toeic-achievement.png';
    link.href = dataUrl;
    link.click();
  };

  return (
    <button 
      className={className} 
      onClick={handleShare}
      disabled={isSharing}
      style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}
    >
      <ShareIcon size={18} />
      {isSharing ? 'Đang tạo ảnh...' : 'Khoe Thành Tích'}
    </button>
  );
}
