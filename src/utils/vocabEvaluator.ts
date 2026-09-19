import { VocabularyWord, TOEIC_TOPICS, ToeicTopic } from '@/data/vocabulary';

export interface TopicMasteryStat {
  topicId: string;
  nameEn: string;
  nameVi: string;
  description: string;
  icon: string;
  totalWords: number;
  masteredWords: number; // Box 4 & 5
  learningWords: number; // Box 1, 2, 3
  unstudiedWords: number; // Box 0
  masteryScore: number; // 0 - 100%
  status: 'strong' | 'moderate' | 'weak';
}

export interface VocabEvaluationResult {
  totalWords: number;
  totalMastered: number;
  totalLearning: number;
  totalUnstudied: number;
  overallMasteryScore: number; // 0 - 100%
  estimatedActiveVocab: number; // Estimated functional words for TOEIC
  targetBandRecommendation: string;
  strongestTopic: TopicMasteryStat | null;
  weakestTopic: TopicMasteryStat | null;
  topics: TopicMasteryStat[];
}

/**
 * Calculates vocabulary mastery breakdown across 12 canonical TOEIC topics
 * based on Leitner Spaced Repetition progress.
 */
export function evaluateVocabMastery(
  words: VocabularyWord[],
  progress: Record<string, { box: number }> = {}
): VocabEvaluationResult {
  const totalWords = words.length || 1;
  let totalMastered = 0;
  let totalLearning = 0;
  let totalUnstudied = 0;

  const topics: TopicMasteryStat[] = TOEIC_TOPICS.map(topic => {
    // Find all words matching this topic
    const topicWords = words.filter(w => 
      w.topicId === topic.id || 
      w.category === topic.nameEn ||
      (topic.id === 'collocations_paraphrase' && (w.category === 'Reading Collocations' || w.category === 'ETS Paraphrasing Pairs' || !!w.readingType))
    );

    const topicTotal = topicWords.length;
    let mastered = 0;
    let learning = 0;
    let unstudied = 0;

    topicWords.forEach(w => {
      const record = progress[w.id];
      const box = record?.box ?? 0;
      if (box >= 4) {
        mastered++;
        totalMastered++;
      } else if (box >= 1) {
        learning++;
        totalLearning++;
      } else {
        unstudied++;
        totalUnstudied++;
      }
    });

    const weightedScore = topicTotal > 0
      ? Math.min(100, Math.round(((mastered * 1.0 + learning * 0.4) / topicTotal) * 100))
      : 0;

    let status: 'strong' | 'moderate' | 'weak' = 'weak';
    if (weightedScore >= 70) status = 'strong';
    else if (weightedScore >= 35) status = 'moderate';

    return {
      topicId: topic.id,
      nameEn: topic.nameEn,
      nameVi: topic.nameVi,
      description: topic.description,
      icon: topic.icon,
      totalWords: topicTotal,
      masteredWords: mastered,
      learningWords: learning,
      unstudiedWords: unstudied,
      masteryScore: weightedScore,
      status,
    };
  });

  const overallMasteryScore = Math.min(
    100,
    Math.round(((totalMastered * 1.0 + totalLearning * 0.4) / totalWords) * 100)
  );

  // Estimate functional vocabulary size (baseline 400 + mastered * multiplier)
  const estimatedActiveVocab = Math.min(
    3000,
    Math.max(150, Math.round(totalMastered * 4.5 + totalLearning * 2.0 + 350))
  );

  // Band recommendation based on overall score
  let targetBandRecommendation = 'Cần củng cố Band 450+';
  if (overallMasteryScore >= 75) targetBandRecommendation = 'Sẵn sàng chinh phục Band 800+';
  else if (overallMasteryScore >= 45) targetBandRecommendation = 'Vững vàng Band 650+';
  else if (overallMasteryScore >= 20) targetBandRecommendation = 'Đạt ngưỡng Band 450+';

  // Find strongest and weakest topics (only consider topics with > 5 words)
  const populatedTopics = topics.filter(t => t.totalWords > 0);
  const sortedByMastery = [...populatedTopics].sort((a, b) => b.masteryScore - a.masteryScore);

  const strongestTopic = sortedByMastery.length > 0 && sortedByMastery[0].masteryScore > 0
    ? sortedByMastery[0]
    : null;

  // Weakest topic: lowest score with remaining unmastered words
  const sortedByWeakness = [...populatedTopics].sort((a, b) => a.masteryScore - b.masteryScore);
  const weakestTopic = sortedByWeakness.length > 0 ? sortedByWeakness[0] : null;

  return {
    totalWords,
    totalMastered,
    totalLearning,
    totalUnstudied,
    overallMasteryScore,
    estimatedActiveVocab,
    targetBandRecommendation,
    strongestTopic,
    weakestTopic,
    topics,
  };
}
