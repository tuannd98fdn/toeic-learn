'use client';

import { useState, useEffect, useRef, FormEvent, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { storage } from '@/utils/storage';
import { useAIHistory } from '@/hooks/useAIHistory';
import {
  ZapIcon,
  ClockIcon,
  HeadphonesIcon,
  FileTextIcon,
  ArrowRightIcon,
  TargetIcon,
  CheckCircleIcon,
  MessageSquareIcon,
  NotebookIcon,
  CloseIcon,
  UsersIcon,
} from '@/components/icons/AppIcons';
import styles from './AITutorDrawer.module.css';

export interface QuestionContext {
  partTitle: string;
  number?: number;
  text: string;
  options: Record<string, string>;
  correctAnswer: string;
  userAnswer?: string;
  transcript?: string;
  passageText?: string;
  explanation?: string;
  audioUrl?: string;
  subCategory?: string;
  grammarTag?: string;
  questionId?: string;
  testId?: string;
}

interface AITutorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  questionContext: QuestionContext;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const DAILY_LIMIT = 15;

let currentSessionId: string | null = null;

function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}

export default function AITutorDrawer({
  isOpen,
  onClose,
  questionContext,
}: AITutorDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [remainingQuota, setRemainingQuota] = useState(DAILY_LIMIT);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'community' | 'note'>('chat');
  const [noteContent, setNoteContent] = useState('');
  const [communityDiscussions, setCommunityDiscussions] = useState<any[]>([]);
  const [loadingCommunity, setLoadingCommunity] = useState(false);

  const { saveSession, sessions, mounted: historyMounted } = useAIHistory();

  const messagesListRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  
  // Trạng thái kiểm soát việc tự động cuộn
  const [userScrolledUp, setUserScrolledUp] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (activeTab === 'community' && questionContext.testId && questionContext.questionId) {
      setLoadingCommunity(true);
      fetch(`/api/community/question?testId=${questionContext.testId}&questionId=${questionContext.questionId}`)
        .then(res => res.json())
        .then(data => {
          setCommunityDiscussions(Array.isArray(data) ? data : []);
        })
        .catch(err => console.error(err))
        .finally(() => setLoadingCommunity(false));
    }
  }, [activeTab, questionContext.testId, questionContext.questionId]);

  // Load remaining quota
  useEffect(() => {
    const today = getTodayStr();
    const quotaData = storage.get<{ date: string; used: number }>('toeic_tutor_daily_quota', {
      date: today,
      used: 0,
    });

    if (quotaData.date !== today) {
      storage.set('toeic_tutor_daily_quota', { date: today, used: 0 });
      setRemainingQuota(DAILY_LIMIT);
    } else {
      setRemainingQuota(Math.max(0, DAILY_LIMIT - quotaData.used));
    }
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Load session or create new one when drawer is opened
  useEffect(() => {
    if (!isOpen || !historyMounted) return;

    if (!currentSessionId) {
      currentSessionId = `session_${Date.now()}`;
    }

    const currentSession = sessions[currentSessionId];

    if (currentSession) {
      setNoteContent(currentSession.note || '');
      if (currentSession.chatLog && currentSession.chatLog.length > 0) {
        setMessages(currentSession.chatLog);
      }
    } else {
      const initialGreeting: Message = {
        id: 'msg_welcome',
        role: 'assistant',
        content: `Chào em! Thầy là **Gia Sư TOEIC 990** của TOEIC Master.\n\nThầy đã sẵn sàng đồng hành cùng em trong buổi học này.\n\nHãy bấm vào các nút gợi ý nhanh bên dưới hoặc nhắn trực tiếp cho thầy bất kỳ điều gì em còn phân vân nhé!`,
      };
      setMessages([initialGreeting]);
      setNoteContent('');
      
      saveSession(currentSessionId, 'Phiên học TOEIC - ' + questionContext.partTitle, [initialGreeting], '');
    }
  }, [isOpen, historyMounted]);

  // Sync messages to cache
  useEffect(() => {
    if (messages.length > 0 && isOpen && currentSessionId) {
      saveSession(currentSessionId, 'Phiên học TOEIC - ' + questionContext.partTitle, messages, noteContent);
    }
  }, [messages, isOpen]);

  // Smart Scroll logic
  useEffect(() => {
    if (!messagesListRef.current) return;
    
    // Nếu người dùng không cố tình cuộn lên, ta mới tự động cuộn
    if (!userScrolledUp) {
      // Thay vì cuộn tuột xuống đáy (làm khuất phần đầu của câu trả lời dài),
      // ta chỉ cuộn mượt xuống đáy nếu tin nhắn ngắn.
      // Tuy nhiên, đối với tin nhắn siêu dài (như cache), cuộn xuống đáy là UX tồi.
      // Giải pháp: Không force cuộn tuột xuống đáy nếu đó là câu trả lời đã xong (không stream).
      if (isStreaming) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Khi không stream (hoặc vừa nhận cache tức thì), ta scroll sao cho
        // tin nhắn cuối cùng (hoặc câu hỏi của user) nằm trong tầm nhìn mà không bị trôi tuột.
        // Bằng cách cuộn đến EndRef nhưng dùng block: 'nearest' để giữ phần đầu.
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto', block: 'nearest' });
      }
    }
  }, [messages, isStreaming, userScrolledUp]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    // Nếu cuộn lên cách đáy > 50px thì đánh dấu là user đang xem nội dung cũ
    if (scrollHeight - scrollTop - clientHeight > 50) {
      setUserScrolledUp(true);
    } else {
      setUserScrolledUp(false);
    }
  };

  // Set global CSS variable for drawer width to squeeze content
  useEffect(() => {
    if (isOpen) {
      document.body.style.setProperty('--ai-drawer-width', window.innerWidth > 640 ? '540px' : '0px');
    } else {
      document.body.style.setProperty('--ai-drawer-width', '0px');
    }
    return () => {
      document.body.style.setProperty('--ai-drawer-width', '0px');
    };
  }, [isOpen]);

  // Nhóm các tin nhắn theo câu hỏi để hiển thị UI accordion (collapsible)
  const groupedMessages = useMemo(() => {
    const groups: { id: string; title: string; messages: Message[] }[] = [];
    let currentGroup = { id: 'welcome', title: 'Lời chào', messages: [] as Message[] };

    messages.forEach((msg) => {
      if (msg.role === 'user') {
        // Tách `**[Câu 101]**` ra khỏi tin nhắn nếu có
        const match = msg.content.match(/^\*\*\[(.*?)\]\*\*\s*(.*)/);
        if (match) {
          const title = match[1];
          const contentWithoutPrefix = match[2];

          if (currentGroup.title !== title) {
            if (currentGroup.messages.length > 0) {
              groups.push(currentGroup);
            }
            currentGroup = {
              id: `group_${Date.now()}_${title}`,
              title,
              messages: [{ ...msg, content: contentWithoutPrefix }],
            };
          } else {
            currentGroup.messages.push({ ...msg, content: contentWithoutPrefix });
          }
        } else {
          currentGroup.messages.push(msg);
        }
      } else {
        currentGroup.messages.push(msg);
      }
    });

    if (currentGroup.messages.length > 0) {
      groups.push(currentGroup);
    }
    return groups;
  }, [messages]);

  if (!isOpen) return null;

  const renderMessage = (msg: Message) => (
    <div key={msg.id} className={`${styles.msgRow} ${msg.role === 'user' ? styles.userRow : styles.tutorRow}`}>
      {msg.role === 'user' ? (
        <div className={styles.userBubble}>{msg.content}</div>
      ) : (
        <div className={styles.tutorBubbleWrapper}>
          <div className={styles.tutorHeaderMini}>
            <span className={styles.tutorName}>
              <span className={styles.tutorIcon}><TargetIcon size={14} /></span> Gia Sư 990
            </span>
            {msg.content && (
              <button
                type="button"
                onClick={() => handleCopy(msg.content, msg.id)}
                className={styles.copyBtn}
                title="Sao chép lời giải"
              >
                {copiedId === msg.id ? (
                  <>
                    <CheckCircleIcon size={12} /> Đã chép
                  </>
                ) : (
                  'Sao chép'
                )}
              </button>
            )}
          </div>
          <div className={styles.tutorBubble}>
            {msg.content ? (
              <div className={styles.markdownBody}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => <h3 className={styles.mdHeading}>{children}</h3>,
                    h2: ({ children }) => <h3 className={styles.mdHeading}>{children}</h3>,
                    h3: ({ children }) => <h3 className={styles.mdHeading}>{children}</h3>,
                    p: ({ children }) => <p className={styles.mdParagraph}>{children}</p>,
                    ul: ({ children }) => <ul className={styles.mdUl}>{children}</ul>,
                    ol: ({ children }) => <ol className={styles.mdOl}>{children}</ol>,
                    li: ({ children }) => <li className={styles.mdLi}>{children}</li>,
                    strong: ({ children }) => <strong className={styles.mdStrong}>{children}</strong>,
                    em: ({ children }) => <em className={styles.mdEm}>{children}</em>,
                    blockquote: ({ children }) => <blockquote className={styles.mdBlockquote}>{children}</blockquote>,
                    hr: () => <hr className={styles.mdHr} />,
                    code: ({ children }) => <code className={styles.mdCode}>{children}</code>,
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
                {isStreaming && msg.id === messages[messages.length - 1]?.id && (
                  <span className={styles.streamingCursor}>▌</span>
                )}
              </div>
            ) : (
              <div className={styles.typingIndicator}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderTypingIndicator = () => (
    <div className={`${styles.msgRow} ${styles.tutorRow}`}>
      <div className={styles.tutorBubbleWrapper}>
        <div className={styles.tutorHeaderMini}>
          <span className={styles.tutorName}>
            <span className={styles.tutorIcon}><TargetIcon size={14} /></span> Gia Sư 990
          </span>
        </div>
        <div className={styles.typingIndicator}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
      </div>
    </div>
  );

  const isListeningPart =
    !!questionContext.audioUrl ||
    ['part 1', 'part 2', 'part 3', 'part 4'].some((p) =>
      questionContext.partTitle.toLowerCase().includes(p)
    );

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isStreaming) return;

    // Decrement quota
    const today = getTodayStr();
    const quotaData = storage.get<{ date: string; used: number }>('toeic_tutor_daily_quota', {
      date: today,
      used: 0,
    });
    const newUsed = (quotaData.date === today ? quotaData.used : 0) + 1;
    storage.set('toeic_tutor_daily_quota', { date: today, used: newUsed });
    setRemainingQuota(Math.max(0, DAILY_LIMIT - newUsed));

    const contextPrefix = questionContext.number ? `**[Câu ${questionContext.number}]** ` : '';
    const displayUserContent = `${contextPrefix}${textToSend}`;

    const userMsg: Message = {
      id: `msg_user_${Date.now()}`,
      role: 'user',
      content: displayUserContent,
    };

    const assistantMsgId = `msg_asst_${Date.now()}`;
    const initialAssistantMsg: Message = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
    };

    const newMessages = [...messages, userMsg];
    setMessages([...newMessages, initialAssistantMsg]);
    setInputValue('');
    setIsStreaming(true);
    setUserScrolledUp(false); // Reset trạng thái cuộn khi người dùng gửi tin mới

    try {
      const response = await fetch('/api/tutor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Chỉ lấy content thực tế gửi lên API, hoặc lấy lịch sử hiện tại
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          questionContext,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || `Lỗi máy chủ (${response.status})`);
      }

      if (!response.body) throw new Error('Không thể khởi tạo luồng dữ liệu.');

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let accumulated = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId ? { ...msg, content: accumulated } : msg
          )
        );
      }
    } catch (err: any) {
      console.error('Streaming error:', err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? {
                ...msg,
                content: `Lỗi kết nối: ${err.message || 'Vui lòng thử lại sau vài giây.'}`,
              }
            : msg
        )
      );
    } finally {
      setIsStreaming(false);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setNoteContent(val);
    if (currentSessionId) {
      saveSession(currentSessionId, 'Phiên học TOEIC - ' + questionContext.partTitle, messages, val);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Quick Action Prompts
  const triggerPrompt = (type: 'trap' | 'hack' | 'translate' | 'audio' | 'drill') => {
    if (type === 'trap') {
      const wrongChoice = questionContext.userAnswer
        ? `của em chọn (${questionContext.userAnswer})`
        : 'thường gặp';
      handleSendMessage(
        `Thầy phân tích giúp em bẫy ETS ở câu này là gì và tại sao đáp án ${wrongChoice} lại sai, còn đáp án (${questionContext.correctAnswer}) mới đúng ạ?`
      );
    } else if (type === 'hack') {
      handleSendMessage('Thầy cho em xin mẹo giải nhanh câu này dưới 15 giây với ạ!');
    } else if (type === 'translate') {
      handleSendMessage('Thầy dịch nghĩa toàn bộ câu này sang tiếng Việt và chỉ ra các từ vựng/cụm từ ăn điểm cần học thuộc nhé!');
    } else if (type === 'audio') {
      handleSendMessage(
        'Thầy bóc tách giúp em các từ khóa nghe và hiện tượng nối âm, nuốt âm quan trọng trong câu này nhé!'
      );
    } else if (type === 'drill') {
      handleSendMessage(
        'Thầy tạo giúp em 2 câu hỏi mới có dạng bẫy tương tự để em làm thử củng cố phản xạ ngay nhé!'
      );
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label="Gia Sư TOEIC 990">
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <div className={styles.tutorAvatarWrapper}>
              <div className={styles.tutorAvatar}>990</div>
              <span className={styles.onlineBadge} title="AI Trực tuyến 24/7" />
            </div>
            <div>
              <div className={styles.titleRow}>
                <h2 className={styles.titleText}>Gia Sư TOEIC 990</h2>
                <span className={styles.aiBadge}>AI COACH</span>
                {questionContext.subCategory && (
                  <span className={styles.subCategoryBadge}>
                    {questionContext.subCategory}
                  </span>
                )}
              </div>
              <p className={styles.subTitleText}>Huấn luyện viên bẻ khóa bẫy ETS & Mẹo 15s</p>
            </div>
          </div>

          <div className={styles.headerActions}>
            <button onClick={onClose} className={styles.closeBtn} title="Đóng (Esc)" aria-label="Đóng">
              <CloseIcon size={16} />
            </button>
          </div>
        </header>

        <div className={styles.tabContainer}>
          <button 
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'chat' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <MessageSquareIcon size={14} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} /> Chat
          </button>
          <button 
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'community' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('community')}
          >
            <UsersIcon size={14} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} /> Cộng đồng
          </button>
          <button 
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'note' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('note')}
          >
            <NotebookIcon size={14} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} /> Ghi chú
          </button>
        </div>

        {activeTab === 'chat' ? (
          <>
            {/* Messages Chat List */}
            <div className={styles.messagesList} ref={messagesListRef} onScroll={handleScroll}>
              {groupedMessages.map((group, index) => {
                const isLastGroup = index === groupedMessages.length - 1;

                if (group.title === 'Lời chào') {
                  return group.messages.map((msg) => renderMessage(msg));
                }

                const isCurrentQuestion = questionContext.number && group.title === `Câu ${questionContext.number}`;
                const defaultExpanded = isLastGroup || isCurrentQuestion;

                return (
                  <details key={group.id} className={styles.groupDetails} open={defaultExpanded || undefined}>
                    <summary className={styles.groupSummary}>
                      <span className={styles.groupTitle}><MessageSquareIcon size={14}/> {group.title}</span>
                      <span className={styles.groupMsgCount}>{group.messages.length}</span>
                    </summary>
                    <div className={styles.groupContent}>
                      {group.messages.map((msg) => renderMessage(msg))}
                      {isStreaming && isLastGroup && messages[messages.length - 1]?.role === 'user' && renderTypingIndicator()}
                    </div>
                  </details>
                );
              })}
              
              {isStreaming && groupedMessages[groupedMessages.length - 1]?.title === 'Lời chào' && messages[messages.length - 1]?.role === 'user' && renderTypingIndicator()}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Prompt Chips (Moved down) */}
            {!isStreaming && (
              <div className={styles.quickActionsArea}>
                <div className={styles.chipsList}>
                  <button
                    type="button"
                    onClick={() => triggerPrompt('trap')}
                    disabled={isStreaming}
                    className={styles.chipBtn}
                  >
                    <ZapIcon size={13} /> Bẫy ETS & Vì sao sai?
                  </button>

                  <button
                    type="button"
                    onClick={() => triggerPrompt('hack')}
                    disabled={isStreaming}
                    className={styles.chipBtn}
                  >
                    <ClockIcon size={13} /> Mẹo giải nhanh 15s
                  </button>

                  <button
                    type="button"
                    onClick={() => triggerPrompt('translate')}
                    disabled={isStreaming}
                    className={styles.chipBtn}
                  >
                    <FileTextIcon size={13} /> Dịch nghĩa & Từ vựng
                  </button>

                  {isListeningPart && (
                    <button
                      type="button"
                      onClick={() => triggerPrompt('audio')}
                      disabled={isStreaming}
                      className={styles.chipBtn}
                    >
                      <HeadphonesIcon size={13} /> Bóc tách nối âm bài nghe
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => triggerPrompt('drill')}
                    disabled={isStreaming}
                    className={styles.chipBtn}
                  >
                    <TargetIcon size={13} /> Tạo 2 câu luyện phản xạ
                  </button>
                </div>
              </div>
            )}

            {/* Input Bar */}
            <div className={styles.inputArea}>
              <form onSubmit={handleFormSubmit} className={styles.inputForm}>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Hỏi gia sư bất kỳ điều gì... (Nhấn Enter để gửi)"
                  className={styles.chatInput}
                  disabled={isStreaming}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isStreaming}
                  className={styles.sendBtn}
                  title="Gửi câu hỏi (Enter)"
                >
                  <ArrowRightIcon size={16} />
                </button>
              </form>
            </div>
          </>
        ) : activeTab === 'note' ? (
          <div className={styles.noteArea}>
            <textarea
              className={styles.noteTextarea}
              placeholder="Ghi chú lại những kiến thức hay mà bạn vừa học được tại đây..."
              value={noteContent}
              onChange={handleNoteChange}
            />
            <div className={styles.noteHint}>
              Tự động lưu lại trên máy của bạn
            </div>
          </div>
        ) : activeTab === 'community' ? (
          <div className={styles.noteArea} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
            {loadingCommunity ? (
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Đang tải...</p>
            ) : communityDiscussions.length === 0 ? (
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <UsersIcon size={48} style={{ color: 'var(--border-color)', margin: '0 auto 1rem' }} />
                <h3 style={{ marginBottom: '0.5rem' }}>Cộng đồng hỏi đáp</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Chưa có thảo luận nào cho câu hỏi này. Bạn hãy là người đầu tiên đặt câu hỏi cho Gia Sư AI nhé!</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                    <UsersIcon size={20} style={{ color: 'var(--primary)' }} /> Thảo luận từ học viên khác
                  </h3>
                </div>
                {communityDiscussions.map((disc, idx) => (
                  <div key={idx} style={{ background: 'var(--background-secondary)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: 'bold' }}>
                        {disc.user?.name ? disc.user.name.charAt(0).toUpperCase() : 'H'}
                      </div>
                      <strong style={{ fontSize: '0.9rem' }}>{disc.user?.name || 'Học viên'}</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: 'auto' }}>
                        {new Date(disc.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                      Q: {disc.query}
                    </div>
                    <div className={styles.markdownBody} style={{ fontSize: '0.9rem', color: 'var(--text-primary)', borderLeft: '3px solid var(--primary)', paddingLeft: '0.75rem', marginLeft: '0.25rem' }}>
                      <ReactMarkdown>{disc.response}</ReactMarkdown>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
