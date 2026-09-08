import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useAIHistory, AISession } from '@/hooks/useAIHistory';
import { NotebookIcon, BotIcon, UserIcon, SparklesIcon } from '@/components/icons/AppIcons';
import styles from './SessionHistoryList.module.css';

export default function SessionHistoryList() {
  const { mounted, getAllSessions, updateSummary, deleteSession } = useAIHistory();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState<Record<string, boolean>>({});

  if (!mounted) return null;

  const sessions = getAllSessions();

  if (sessions.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}><NotebookIcon size={48} /></div>
        <h2>Chưa có phiên học nào</h2>
        <p>Lịch sử các phiên học và trò chuyện cùng Gia Sư AI sẽ hiển thị ở đây.</p>
      </div>
    );
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleGenerateSummary = async (session: AISession) => {
    if (isGeneratingSummary[session.id]) return;

    setIsGeneratingSummary((prev) => ({ ...prev, [session.id]: true }));
    try {
      const response = await fetch('/api/tutor/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatLog: session.chatLog,
          note: session.note,
        }),
      });

      if (!response.ok) throw new Error('Không thể tạo tổng hợp');
      if (!response.body) throw new Error('Không có dữ liệu trả về');

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let accumulated = '';

      // Tạm thời lưu vào state component để thấy stream real-time, hoặc update liên tục vào context
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        // Update to global store as we stream
        updateSummary(session.id, accumulated);
      }
    } catch (err) {
      console.error(err);
      alert('Có lỗi xảy ra khi tạo bản tóm tắt.');
    } finally {
      setIsGeneratingSummary((prev) => ({ ...prev, [session.id]: false }));
    }
  };

  return (
    <div className={styles.container}>
      {sessions.map((session) => (
        <div key={session.id} className={`${styles.sessionCard} card-minimal`}>
          <div className={styles.sessionHeader} onClick={() => toggleExpand(session.id)}>
            <div className={styles.sessionInfo}>
              <h3 className={styles.sessionTitle}>{session.title}</h3>
              <span className={styles.sessionDate}>
                {new Date(session.timestamp).toLocaleString('vi-VN')}
              </span>
            </div>
            <div className={styles.sessionActions}>
              <span className={styles.msgCount}>
                {session.chatLog.filter((m) => m.role === 'user').length} câu hỏi AI
              </span>
              <button className={styles.expandBtn}>
                {expandedId === session.id ? 'Thu gọn' : 'Xem chi tiết'}
              </button>
            </div>
          </div>

          {expandedId === session.id && (
            <div className={styles.sessionContent}>
              <div className={styles.sectionHeader}>
                <h4>Lịch sử Trò chuyện</h4>
                <button
                  className={styles.deleteBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('Bạn có chắc muốn xoá lịch sử phiên học này?')) {
                      deleteSession(session.id);
                    }
                  }}
                >
                  Xoá phiên học
                </button>
              </div>
              
              <div className={styles.chatLog}>
                {session.chatLog.map((msg, i) => (
                  <div key={i} className={`${styles.msgRow} ${msg.role === 'user' ? styles.userRow : styles.aiRow}`}>
                    <div className={styles.msgAvatar}>
                      {msg.role === 'user' ? <UserIcon size={18} /> : <BotIcon size={18} />}
                    </div>
                    <div className={`${styles.msgBubble} ${msg.role === 'user' ? styles.userMsg : styles.aiMsg}`}>
                      <strong>{msg.role === 'user' ? 'Học viên' : 'Gia Sư 990'}</strong>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                ))}
              </div>

              {session.note && (
                <div className={styles.noteSection}>
                  <h4>Ghi chú của bạn</h4>
                  <div className={styles.noteBox}>{session.note}</div>
                </div>
              )}

              <div className={styles.summarySection}>
                <h4>Bản Tổng Hợp Cốt Lõi (AI Summary)</h4>
                {session.summary ? (
                  <div className={styles.summaryBox}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {session.summary}
                    </ReactMarkdown>
                    {isGeneratingSummary[session.id] && <span className={styles.streamingCursor}>▌</span>}
                  </div>
                ) : (
                  <div className={styles.summaryEmpty}>
                    <p>Chưa có bản tổng hợp cho phiên học này.</p>
                    <button
                      className={`${styles.primaryBtn} btn-accent`}
                      onClick={() => handleGenerateSummary(session)}
                      disabled={isGeneratingSummary[session.id]}
                    >
                      {isGeneratingSummary[session.id] ? 'Đang tổng hợp...' : <><SparklesIcon size={16} style={{marginRight: '6px'}} /> Yêu cầu AI Tổng Hợp</>}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
