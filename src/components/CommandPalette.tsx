'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  SearchIcon,
  HeadphonesIcon,
  ReadingIcon,
  ExamIcon,
  ZapIcon,
  CardsIcon,
  QuizIcon,
  BookIcon,
  NotebookIcon,
  LightbulbIcon,
  TargetIcon,
  CompassIcon,
  HomeIcon,
  StatsIcon,
} from '@/components/icons/AppIcons';
import styles from './CommandPalette.module.css';

interface CommandItem {
  id: string;
  title: string;
  desc: string;
  category: string;
  tag?: string;
  link: string;
  icon: React.ReactNode;
}

const COMMANDS: CommandItem[] = [
  // Chuyên đề ngữ pháp & kỹ năng
  {
    id: 'sub-word-form',
    title: 'Luyện Part 5: Từ loại (Word Form)',
    desc: 'Nhận diện danh từ, động từ, tính từ, trạng từ',
    category: 'Chuyên đề ngữ pháp',
    tag: 'Word Form',
    link: '/part5?subCategory=Word%20Form',
    icon: <ReadingIcon size={18} />,
  },
  {
    id: 'sub-verb-tense',
    title: 'Luyện Part 5: Thì & Thể động từ (Verb Tense)',
    desc: 'Chủ động, bị động, hòa hợp chủ vị',
    category: 'Chuyên đề ngữ pháp',
    tag: 'Verb Tense',
    link: '/part5?subCategory=Verb%20Tense',
    icon: <ReadingIcon size={18} />,
  },
  {
    id: 'sub-prep-conj',
    title: 'Luyện Part 5: Giới từ & Liên từ',
    desc: 'Phân biệt liên từ phụ thuộc và giới từ',
    category: 'Chuyên đề ngữ pháp',
    tag: 'Prep & Conj',
    link: '/part5?subCategory=Preposition%20%26%20Conjunction',
    icon: <ReadingIcon size={18} />,
  },
  {
    id: 'sub-relative',
    title: 'Luyện Part 5: Mệnh đề quan hệ',
    desc: 'Who, Whom, Which, That, Whose và rút gọn',
    category: 'Chuyên đề ngữ pháp',
    tag: 'Relative',
    link: '/part5?subCategory=Relative%20Clauses',
    icon: <ReadingIcon size={18} />,
  },
  {
    id: 'sub-vocab-biz',
    title: 'Luyện Part 5: Từ vựng công sở',
    desc: 'Từ vựng thương mại và ngữ cảnh doanh nghiệp',
    category: 'Chuyên đề ngữ pháp',
    tag: 'Business',
    link: '/part5?subCategory=Business%20Vocabulary',
    icon: <ReadingIcon size={18} />,
  },
  {
    id: 'sub-p7-inference',
    title: 'Luyện Part 7: Suy luận (Inference & Suggestion)',
    desc: 'Chiến thuật tìm ý ẩn trong đoạn văn',
    category: 'Chuyên đề đọc hiểu',
    tag: 'Part 7',
    link: '/part7?questionType=Inference',
    icon: <ReadingIcon size={18} />,
  },
  {
    id: 'sub-p7-main-idea',
    title: 'Luyện Part 7: Ý chính & Mục đích bài đọc',
    desc: 'Main Idea & Purpose questions',
    category: 'Chuyên đề đọc hiểu',
    tag: 'Part 7',
    link: '/part7?questionType=Main%20Idea',
    icon: <ReadingIcon size={18} />,
  },

  // Đề thi & Trạm luyện tập
  {
    id: 'nav-exam',
    title: 'Đấu Trường Thi Thử (Full Test 200 câu)',
    desc: '120 phút mô phỏng áp lực phòng thi thật',
    category: 'Luyện thi & Đánh giá',
    tag: 'ETS Test',
    link: '/exam',
    icon: <ExamIcon size={18} />,
  },
  {
    id: 'nav-mini-test',
    title: 'Trạm Nhanh Mini-test (20 câu)',
    desc: '15 phút kiểm tra nhanh phản xạ Nghe & Ngữ pháp',
    category: 'Luyện thi & Đánh giá',
    tag: '15 Phút',
    link: '/mini-test',
    icon: <ZapIcon size={18} />,
  },
  {
    id: 'nav-part1',
    title: 'Trạm Nghe Part 1: Mô tả tranh',
    desc: 'Luyện nghe tranh và chép chính tả Dictation',
    category: 'Luyện thi & Đánh giá',
    tag: 'Listening',
    link: '/part1',
    icon: <HeadphonesIcon size={18} />,
  },
  {
    id: 'nav-part2',
    title: 'Trạm Nghe Part 2: Hỏi - Đáp',
    desc: 'Luyện phản xạ câu hỏi ngắn chuẩn ETS',
    category: 'Luyện thi & Đánh giá',
    tag: 'Listening',
    link: '/part2',
    icon: <HeadphonesIcon size={18} />,
  },
  {
    id: 'nav-part3',
    title: 'Trạm Nghe Part 3: Hội thoại',
    desc: 'Đối thoại 2-3 người kèm Interactive Transcript',
    category: 'Luyện thi & Đánh giá',
    tag: 'Listening',
    link: '/part3',
    icon: <HeadphonesIcon size={18} />,
  },
  {
    id: 'nav-part4',
    title: 'Trạm Nghe Part 4: Bài nói ngắn',
    desc: 'Độc thoại thông báo, quảng cáo, tin nhắn thoại',
    category: 'Luyện thi & Đánh giá',
    tag: 'Listening',
    link: '/part4',
    icon: <HeadphonesIcon size={18} />,
  },
  {
    id: 'nav-part5',
    title: 'Trạm Đọc Part 5: Hoàn thành câu',
    desc: 'Ngân hàng câu hỏi ngữ pháp & từ vựng ETS',
    category: 'Luyện thi & Đánh giá',
    tag: 'Reading',
    link: '/part5',
    icon: <ReadingIcon size={18} />,
  },
  {
    id: 'nav-part6',
    title: 'Trạm Đọc Part 6: Điền đoạn văn',
    desc: 'Điền từ và câu vào thư từ, email thương mại',
    category: 'Luyện thi & Đánh giá',
    tag: 'Reading',
    link: '/part6',
    icon: <ReadingIcon size={18} />,
  },
  {
    id: 'nav-part7',
    title: 'Trạm Đọc Part 7: Đọc hiểu văn bản',
    desc: 'Luyện đọc đoạn đơn, đoạn đôi, đoạn ba theo pacing',
    category: 'Luyện thi & Đánh giá',
    tag: 'Reading',
    link: '/part7',
    icon: <ReadingIcon size={18} />,
  },

  // Công cụ học tập & Tiện ích
  {
    id: 'tool-notebook',
    title: 'Sổ tay câu hỏi sai & Lỗ hổng kiến thức',
    desc: 'Ôn tập câu hỏi sai kèm nhãn nguyên nhân gốc',
    category: 'Công cụ học tập',
    tag: 'Notebook',
    link: '/notebook',
    icon: <NotebookIcon size={18} />,
  },
  {
    id: 'tool-tips',
    title: 'Kho Chiến thuật & Bẫy đề thi ETS (30 Chuyên đề)',
    desc: 'Chiến thuật phòng thi, bẫy thường gặp và quy tắc vàng',
    category: 'Công cụ học tập',
    tag: 'Tips & Traps',
    link: '/tips',
    icon: <LightbulbIcon size={18} />,
  },
  {
    id: 'tool-vocab',
    title: 'Kho Từ Vựng 400+ Từ & Spaced Repetition',
    desc: 'Học lặp lại ngắt quãng theo 5 hộp Leitner',
    category: 'Công cụ học tập',
    tag: 'Vocab',
    link: '/vocabulary',
    icon: <BookIcon size={18} />,
  },
  {
    id: 'tool-flashcards',
    title: 'Flashcards 3D Từ Vựng',
    desc: 'Lật thẻ kiểm tra nghĩa, phát âm và ví dụ',
    category: 'Công cụ học tập',
    tag: 'Flashcards',
    link: '/study',
    icon: <CardsIcon size={18} />,
  },
  {
    id: 'tool-quiz',
    title: 'Làm Quiz Kiểm Tra Trí Nhớ',
    desc: 'Trắc nghiệm phản xạ từ vựng nhanh',
    category: 'Công cụ học tập',
    tag: 'Quiz',
    link: '/quiz',
    icon: <QuizIcon size={18} />,
  },
  {
    id: 'tool-plan',
    title: 'Lộ Trình Học Thích Ứng (Study Plan)',
    desc: 'Xem tiến độ học tập 30 ngày và nhiệm vụ tiếp theo',
    category: 'Công cụ học tập',
    tag: 'Plan',
    link: '/study-plan',
    icon: <CompassIcon size={18} />,
  },
  {
    id: 'tool-stats',
    title: 'Báo Cáo Thống Kê & Radar Lỗ Hổng',
    desc: 'Biểu đồ radar phân tích điểm mạnh và điểm yếu',
    category: 'Công cụ học tập',
    tag: 'Stats',
    link: '/stats',
    icon: <StatsIcon size={18} />,
  },
  {
    id: 'tool-diagnostic',
    title: 'Bài Test Chẩn Đoán Ban Đầu',
    desc: 'Xác định band điểm hiện tại và thiết kế lộ trình',
    category: 'Công cụ học tập',
    tag: 'Diagnostic',
    link: '/diagnostic',
    icon: <TargetIcon size={18} />,
  },
  {
    id: 'tool-home',
    title: 'Trang Chủ Dashboard',
    desc: 'Mục tiêu hôm nay, trạm đề thi và chuỗi học tập',
    category: 'Điều hướng',
    tag: 'Home',
    link: '/',
    icon: <HomeIcon size={18} />,
  },
];

function removeVietnameseTones(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setActiveIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Filter commands
  const filteredCommands = useMemo(() => {
    if (!search.trim()) return COMMANDS;
    const query = removeVietnameseTones(search.trim());
    return COMMANDS.filter((cmd) => {
      const target = removeVietnameseTones(`${cmd.title} ${cmd.desc} ${cmd.category} ${cmd.tag || ''}`);
      return target.includes(query);
    });
  }, [search]);

  // Handle keyboard navigation within the list
  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (filteredCommands.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = filteredCommands[activeIndex];
      if (selected) {
        setIsOpen(false);
        router.push(selected.link);
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector(`[data-index="${activeIndex}"]`) as HTMLElement | null;
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
    >
      <div className={styles.modal} role="dialog" aria-modal="true">
        <div className={styles.searchHeader}>
          <div className={styles.searchIcon}>
            <SearchIcon size={20} />
          </div>
          <input
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            placeholder="Tìm chuyên đề, bài thi, từ vựng hoặc công cụ..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleListKeyDown}
          />
          <span className={styles.escBadge}>ESC</span>
        </div>

        <div ref={listRef} className={styles.resultsList}>
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={cmd.id}
                  data-index={idx}
                  className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
                  onClick={() => {
                    setIsOpen(false);
                    router.push(cmd.link);
                  }}
                  onMouseEnter={() => setActiveIndex(idx)}
                >
                  <div className={styles.itemLeft}>
                    <div className={styles.itemIcon}>{cmd.icon}</div>
                    <div className={styles.itemText}>
                      <span className={styles.itemTitle}>{cmd.title}</span>
                      <span className={styles.itemDesc}>{cmd.desc}</span>
                    </div>
                  </div>
                  {cmd.tag && <span className={styles.itemTag}>{cmd.tag}</span>}
                </div>
              );
            })
          ) : (
            <div className={styles.emptyState}>
              Không tìm thấy lệnh hoặc chuyên đề phù hợp với &quot;{search}&quot;.
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.footerHints}>
            <span className={styles.hintItem}>
              <kbd className={styles.hintKey}>↑</kbd>
              <kbd className={styles.hintKey}>↓</kbd> di chuyển
            </span>
            <span className={styles.hintItem}>
              <kbd className={styles.hintKey}>↵</kbd> chọn
            </span>
            <span className={styles.hintItem}>
              <kbd className={styles.hintKey}>ESC</kbd> đóng
            </span>
          </div>
          <span>Thanh Lệnh Đa Năng</span>
        </div>
      </div>
    </div>
  );
}
