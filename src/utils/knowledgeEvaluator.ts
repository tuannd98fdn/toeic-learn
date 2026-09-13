import { storage } from './storage';
import { getPredictiveScore } from './scorePredictor';

export interface KnowledgePillarStats {
  score: number; // 0 - 100%
  masteredCount: number;
  totalTargetCount: number;
  label: string;
  status: 'strong' | 'moderate' | 'weak';
}

export interface KnowledgeEvaluationResult {
  knowledgeCeilingScore: number;
  targetCoveragePercent: number;
  examScore: number;
  executionGap: number;
  gapType: 'KNOWLEDGE_DEFICIT' | 'EXECUTION_DEFICIT' | 'BALANCED_GROWTH';
  diagnosisTitle: string;
  diagnosisAdvice: string;
  primaryRecommendation: {
    title: string;
    description: string;
    actionLabel: string;
    actionLink: string;
  };
  pillars: {
    vocabulary: KnowledgePillarStats;
    grammar: KnowledgePillarStats;
    listening: KnowledgePillarStats;
    reading: KnowledgePillarStats;
  };
}

/**
 * Evaluates the learner's knowledge base across Vocabulary, Grammar, Listening, and Reading.
 * Determines the "Knowledge Ceiling" (Upper Bound Score) and compares it with Exam Execution Score.
 */
export function evaluateLearnerKnowledge(): KnowledgeEvaluationResult {
  const predictiveData = getPredictiveScore();
  const examScore = predictiveData.predictedMid;
  const targetScoreNum = predictiveData.targetScoreNum || 750;

  // 1. Evaluate Pillar: Vocabulary (from Leitner SRS)
  const leitnerProgress = storage.get<Record<string, { box: number }>>('leitner_progress', {});
  const leitnerEntries = Object.values(leitnerProgress);
  
  let masteredVocab = 0; // Box 4 & 5
  let learningVocab = 0; // Box 1, 2, 3
  
  leitnerEntries.forEach((entry) => {
    if (entry && typeof entry.box === 'number') {
      if (entry.box >= 4) masteredVocab++;
      else if (entry.box >= 1) learningVocab++;
    }
  });

  // Target vocabulary requirement based on target score band
  let targetVocabRequirement = 250;
  if (targetScoreNum <= 500) targetVocabRequirement = 100;
  else if (targetScoreNum <= 650) targetVocabRequirement = 200;
  else if (targetScoreNum <= 800) targetVocabRequirement = 320;
  else targetVocabRequirement = 420;

  const weightedVocabAcquired = masteredVocab * 1.0 + learningVocab * 0.4;
  const vocabScorePct = Math.min(100, Math.round((weightedVocabAcquired / targetVocabRequirement) * 100));

  // 2. Evaluate Pillar: Grammar (from Mistakes & Practice)
  const mistakes = storage.get<Record<string, any>>('mistake_notebook', {});
  const mistakeEntries = Object.values(mistakes);
  let grammarMistakesCount = 0;
  
  mistakeEntries.forEach((m: any) => {
    if (m && m.type === 'exam' && m.subCategory) {
      grammarMistakesCount += (m.wrongCount || 1);
    }
  });

  // Base grammar confidence: higher if few unresolved mistakes, lower if many mistakes
  let grammarScorePct = 60; // baseline moderate
  if (predictiveData.hasCalibratedData) {
    // If calibrated from exam, reading score reflects grammar
    const readingRatio = predictiveData.readingScore / 495;
    grammarScorePct = Math.round(readingRatio * 100);
  }
  // Adjust with mistake density
  if (grammarMistakesCount > 15) {
    grammarScorePct = Math.max(25, grammarScorePct - 20);
  } else if (grammarMistakesCount > 5) {
    grammarScorePct = Math.max(35, grammarScorePct - 10);
  } else if (predictiveData.hasCalibratedData && grammarMistakesCount === 0) {
    grammarScorePct = Math.min(100, grammarScorePct + 10);
  }

  // 3. Evaluate Pillar: Listening (Decoding & Pacing)
  let listeningScorePct = 50;
  if (predictiveData.hasCalibratedData) {
    listeningScorePct = Math.min(100, Math.round((predictiveData.listeningScore / 495) * 100));
  } else {
    listeningScorePct = Math.min(100, Math.round(((targetScoreNum * 0.52) / 495) * 75));
  }

  // 4. Evaluate Pillar: Reading Comprehension & Paraphrase
  let readingScorePct = 50;
  if (predictiveData.hasCalibratedData) {
    readingScorePct = Math.min(100, Math.round((predictiveData.readingScore / 495) * 100));
  } else {
    readingScorePct = Math.min(100, Math.round(((targetScoreNum * 0.48) / 495) * 75));
  }

  // Calculate Weighted Knowledge Index (0.0 to 1.0)
  // Weighting: Vocabulary 30%, Grammar 25%, Listening 25%, Reading 20%
  const weightedKnowledgeIndex = (
    vocabScorePct * 0.30 +
    grammarScorePct * 0.25 +
    listeningScorePct * 0.25 +
    readingScorePct * 0.20
  ) / 100;

  // Calculate Knowledge Ceiling Score (10 - 990)
  // Theoretical maximum score attainable given current knowledge foundation
  const baseFloor = 250;
  const targetScale = Math.min(990, targetScoreNum + 80);
  let rawCeiling = baseFloor + (targetScale - baseFloor) * weightedKnowledgeIndex;
  
  // Knowledge ceiling is at least as high as demonstrated exam performance
  rawCeiling = Math.max(rawCeiling, examScore);
  // Round to ETS standard increment (multiples of 5)
  const knowledgeCeilingScore = Math.min(990, Math.max(10, Math.round(rawCeiling / 5) * 5));

  // Target Knowledge Coverage %
  const targetCoveragePercent = Math.min(100, Math.max(15, Math.round((knowledgeCeilingScore / targetScoreNum) * 100)));

  // Execution Gap = Ceiling - Actual Exam Score
  const executionGap = knowledgeCeilingScore - examScore;

  // Diagnosis & Strategic Guidance
  let gapType: 'KNOWLEDGE_DEFICIT' | 'EXECUTION_DEFICIT' | 'BALANCED_GROWTH' = 'BALANCED_GROWTH';
  let diagnosisTitle = 'Nền Tảng Tri Thức & Thực Chiến Đồng Pha';
  let diagnosisAdvice = 'Vốn kiến thức nền tảng và tốc độ giải đề của bạn đang phát triển cân bằng. Tiếp tục duy trì chu trình học tập để bứt phá mục tiêu!';
  let primaryRecommendation = {
    title: 'Luyện tập chuyên sâu theo đề thi',
    description: 'Rèn luyện phản xạ với bài thi thử Mini-test hoặc Full Test ETS.',
    actionLabel: 'LÀM MINI TEST',
    actionLink: '/mini-test',
  };

  if (executionGap >= 60) {
    gapType = 'EXECUTION_DEFICIT';
    diagnosisTitle = 'Nghẽn Tốc Độ & Phản Xạ Thực Chiến';
    diagnosisAdvice = `Vốn tri thức của bạn (từ vựng và cấu trúc) đã đủ khả năng đạt trần ${knowledgeCeilingScore} điểm, nhưng điểm thi thực tế (${examScore}) đang bị hụt ${executionGap} điểm do áp lực thời gian hoặc phản xạ nghe chưa tự động hóa.`;
    primaryRecommendation = {
      title: 'Luyện Nghe Chép Chính Tả & Nhịp Độ',
      description: 'Luyện Dictation Part 1-4 để bắt nối âm và rèn Pacing Part 6-7 tránh cháy giờ.',
      actionLabel: 'LUYỆN CHÉP CHÍNH TẢ',
      actionLink: '/part2',
    };
  } else if (executionGap <= -35 || (vocabScorePct < 40 && examScore >= 500)) {
    gapType = 'KNOWLEDGE_DEFICIT';
    diagnosisTitle = 'Hổng Nền Tảng Tri Thức Cốt Lõi';
    diagnosisAdvice = `Điểm thi thực chiến (${examScore}) đang chạm sát trần tri thức (${knowledgeCeilingScore}). Bạn sẽ sớm gặp ngưỡng chững điểm nếu không nạp thêm vốn từ vựng band ${targetScoreNum}+ và lấp lỗ hổng ngữ pháp.`;
    primaryRecommendation = {
      title: 'Học Từ Vựng Spaced Repetition (SRS)',
      description: 'Nạp thêm từ vựng cốt lõi vào Hộp 4 - 5 để nâng trần điểm số.',
      actionLabel: 'HỌC TỪ VỰNG NGAY',
      actionLink: '/study',
    };
  }

  // Pillar helper
  const getPillarStatus = (score: number): 'strong' | 'moderate' | 'weak' => {
    if (score >= 75) return 'strong';
    if (score >= 50) return 'moderate';
    return 'weak';
  };

  return {
    knowledgeCeilingScore,
    targetCoveragePercent,
    examScore,
    executionGap,
    gapType,
    diagnosisTitle,
    diagnosisAdvice,
    primaryRecommendation,
    pillars: {
      vocabulary: {
        score: vocabScorePct,
        masteredCount: masteredVocab,
        totalTargetCount: targetVocabRequirement,
        label: 'Vốn từ vựng (SRS)',
        status: getPillarStatus(vocabScorePct),
      },
      grammar: {
        score: grammarScorePct,
        masteredCount: Math.round((grammarScorePct / 100) * 7),
        totalTargetCount: 7,
        label: 'Ngữ pháp (7 chuyên đề)',
        status: getPillarStatus(grammarScorePct),
      },
      listening: {
        score: listeningScorePct,
        masteredCount: predictiveData.listeningScore,
        totalTargetCount: 495,
        label: 'Giải mã âm thanh (LC)',
        status: getPillarStatus(listeningScorePct),
      },
      reading: {
        score: readingScorePct,
        masteredCount: predictiveData.readingScore,
        totalTargetCount: 495,
        label: 'Đọc hiểu & Paraphrase (RC)',
        status: getPillarStatus(readingScorePct),
      },
    },
  };
}
