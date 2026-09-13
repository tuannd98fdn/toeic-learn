import { storage } from './storage';

export interface PredictiveScoreData {
  predictedMin: number;
  predictedMax: number;
  predictedMid: number;
  listeningScore: number;
  readingScore: number;
  targetScoreNum: number;
  distanceToTarget: number;
  confidenceLevel: 'high' | 'medium' | 'initial';
  sourceLabel: string;
  hasCalibratedData: boolean;
}

export function getPredictiveScore(): PredictiveScoreData {
  if (typeof window === 'undefined') {
    return {
      predictedMin: 450,
      predictedMax: 550,
      predictedMid: 500,
      listeningScore: 250,
      readingScore: 250,
      targetScoreNum: 750,
      distanceToTarget: 250,
      confidenceLevel: 'initial',
      sourceLabel: 'Chưa hiệu chuẩn',
      hasCalibratedData: false,
    };
  }

  // 1. Get Target Score
  const rawTarget = storage.get<string>('toeic_target_score', '750+');
  const targetScoreNum = parseInt(rawTarget.replace(/\D/g, ''), 10) || 750;

  // 2. Check full exam history
  const examHistory = storage.get<any[]>('toeic_exam_history', []);
  const latestExam = examHistory.length > 0 ? examHistory[0] : null;

  if (latestExam && latestExam.totalScore) {
    const total = Number(latestExam.totalScore);
    const listeningScore = Number(latestExam.listeningScore) || Math.round(total * 0.52);
    const readingScore = Number(latestExam.readingScore) || (total - listeningScore);
    const predictedMin = Math.max(10, Math.floor((total - 25) / 10) * 10);
    const predictedMax = Math.min(990, Math.ceil((total + 25) / 10) * 10);
    const predictedMid = Math.round((predictedMin + predictedMax) / 2);

    return {
      predictedMin,
      predictedMax,
      predictedMid,
      listeningScore,
      readingScore,
      targetScoreNum,
      distanceToTarget: targetScoreNum - predictedMid,
      confidenceLevel: 'high',
      sourceLabel: 'Hiệu chuẩn qua bài thi thử ETS',
      hasCalibratedData: true,
    };
  }

  // 3. Check diagnostic test result
  const diagResult = storage.get<any>('toeic_diagnostic_result', null);
  if (diagResult && diagResult.estimatedScore) {
    const total = Number(diagResult.estimatedScore);
    const listeningScore = Number(diagResult.listeningScore) || Math.round(total * 0.5);
    const readingScore = Number(diagResult.readingScore) || (total - listeningScore);
    const predictedMin = Math.max(10, Math.floor((total - 40) / 10) * 10);
    const predictedMax = Math.min(990, Math.ceil((total + 40) / 10) * 10);
    const predictedMid = Math.round((predictedMin + predictedMax) / 2);

    return {
      predictedMin,
      predictedMax,
      predictedMid,
      listeningScore,
      readingScore,
      targetScoreNum,
      distanceToTarget: targetScoreNum - predictedMid,
      confidenceLevel: 'medium',
      sourceLabel: 'Hiệu chuẩn qua Test Chẩn Đoán',
      hasCalibratedData: true,
    };
  }

  // 4. Fallback if no test taken yet
  const initialBase = Math.max(350, targetScoreNum - 250);
  const predictedMin = initialBase;
  const predictedMax = initialBase + 100;
  const predictedMid = Math.round((predictedMin + predictedMax) / 2);

  return {
    predictedMin,
    predictedMax,
    predictedMid,
    listeningScore: Math.round(predictedMid / 2),
    readingScore: Math.round(predictedMid / 2),
    targetScoreNum,
    distanceToTarget: targetScoreNum - predictedMid,
    confidenceLevel: 'initial',
    sourceLabel: 'Ước lượng ban đầu • Làm test để hiệu chuẩn',
    hasCalibratedData: false,
  };
}
