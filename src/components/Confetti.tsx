'use client';

import React, { useEffect } from 'react';

interface ConfettiProps {
  show: boolean;
  onComplete?: () => void;
  duration?: number;
}

export default function Confetti({ show, onComplete }: ConfettiProps) {
  useEffect(() => {
    if (show) {
      // Đã loại bỏ hiệu ứng Confetti lòe loẹt theo yêu cầu để người học tập trung hơn.
      // Vẫn giữ logic gọi onComplete để không làm hỏng luồng của các component khác.
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return null;
}
