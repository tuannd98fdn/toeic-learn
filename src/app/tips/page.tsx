'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HomeIcon, LightbulbIcon, SearchIcon } from '@/components/icons/AppIcons';
import { TOEIC_TIPS, ToeicTip } from '@/data/strategies';
import styles from './page.module.css';

export default function TipsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'strategy' | 'grammar'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTips = TOEIC_TIPS.filter((tip) => {
    const matchesTab = activeTab === 'all' || tip.type === activeTab;
    const matchesSearch = tip.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tip.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/" className="btn-secondary btn-sm" style={{ padding: '0.4rem' }}>
            <HomeIcon size={20} />
          </Link>
          <h1>Kiến thức & Mẹo thi TOEIC</h1>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.searchBar}>
          <SearchIcon size={20} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Tìm kiếm mẹo, ngữ pháp..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'all' ? styles.active : ''}`}
            onClick={() => setActiveTab('all')}
          >
            Tất cả
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'strategy' ? styles.active : ''}`}
            onClick={() => setActiveTab('strategy')}
          >
            Chiến thuật & Mẹo
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'grammar' ? styles.active : ''}`}
            onClick={() => setActiveTab('grammar')}
          >
            Ngữ pháp trọng tâm
          </button>
        </div>

        <div className={styles.tipsList}>
          {filteredTips.length === 0 ? (
            <div className={styles.emptyState}>
              <LightbulbIcon size={48} style={{ color: 'var(--text-tertiary)', marginBottom: '1rem' }} />
              <p>Không tìm thấy kết quả phù hợp</p>
            </div>
          ) : (
            filteredTips.map((tip) => (
              <div key={tip.id} className={styles.tipCard}>
                <div className={styles.tipHeader}>
                  <span className={styles.tipBadge}>{tip.part}</span>
                  <h3 className={styles.tipTitle}>{tip.title}</h3>
                </div>
                <div className={styles.tipContent}>{tip.content}</div>
                {tip.examples && tip.examples.length > 0 && (
                  <div className={styles.tipExamples}>
                    <strong>Ví dụ:</strong>
                    <ul>
                      {tip.examples.map((ex, idx) => (
                        <li key={idx}>{ex}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
