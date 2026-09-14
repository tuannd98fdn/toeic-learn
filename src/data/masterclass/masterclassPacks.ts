import { MasterclassDayPack } from '@/schema/masterclass';
import { CONNECTED_SPEECH_LESSONS } from './connectedSpeechLab';
import { BUSINESS_SCENARIOS } from './businessScenarios';
import { HIGH_SCORE_CHALLENGES } from './advancedGrammarInversions';

export const MASTERCLASS_DAY_PACKS: MasterclassDayPack[] = [
  {
    dayNumber: 1,
    theme: 'Logistics Toàn Cầu & Bẻ Khóa Âm Anh (British Glottal Stop)',
    description:
      'Làm chủ hiện tượng nuốt âm /t/ giọng British trong Listening Part 2 & 3, phân tích ma trận Paraphrase trong báo cáo vận tải biển Apex Maritime, và chinh phục 5 câu bẫy đảo ngữ Part 5.',
    targetScore: '800 - 990',
    speechLesson: CONNECTED_SPEECH_LESSONS[0],
    businessScenario: BUSINESS_SCENARIOS[0],
    challengeQuestions: HIGH_SCORE_CHALLENGES.slice(0, 3),
    retentionVocab: [
      {
        word: 'demurrage fees',
        ipa: '/dɪˈmɜːrɪdʒ fiːz/',
        meaning: 'phí phạt lưu container tại cảng',
        collocation: 'incur demurrage fees'
      },
      {
        word: 'contingency protocol',
        ipa: '/kənˈtɪndʒənsi ˈproʊtəkɔːl/',
        meaning: 'quy trình xử lý tình huống khẩn cấp',
        collocation: 'implement contingency protocols'
      },
      {
        word: 'expedient measure',
        ipa: '/ɪkˈspiːdiənt ˈmɛʒər/',
        meaning: 'biện pháp đối phó cấp bách',
        collocation: 'adopt expedient measures'
      },
      {
        word: 'breach-of-contract',
        ipa: '/briːtʃ əv ˈkɑːntrækt/',
        meaning: 'vi phạm hợp đồng thỏa thuận',
        collocation: 'avoid breach-of-contract liabilities'
      },
      {
        word: 'notwithstanding',
        ipa: '/ˌnɑːtwɪθˈstændɪŋ/',
        meaning: 'mặc dù, bất kể (giới từ trang trọng)',
        collocation: 'notwithstanding market volatility'
      }
    ]
  },
  {
    dayNumber: 2,
    theme: 'Thẩm Định M&A, Pháp Lý & Bẻ Khóa Âm Mỹ (Flapped /t/)',
    description:
      'Làm chủ hiện tượng nối âm vỗ Flapped /t/ của người Mỹ trong Part 3 & 4, đọc hiểu hồ sơ thẩm định M&A Sterling BioTech, và giải mã thể giả định subjunctive cùng đảo ngữ loại 3.',
    targetScore: '850 - 990',
    speechLesson: CONNECTED_SPEECH_LESSONS[1],
    businessScenario: BUSINESS_SCENARIOS[1],
    challengeQuestions: HIGH_SCORE_CHALLENGES.slice(2, 5),
    retentionVocab: [
      {
        word: 'antitrust scrutiny',
        ipa: '/ˌæntiˈtrʌst ˈskruːtəni/',
        meaning: 'sự giám sát chống độc quyền',
        collocation: 'face antitrust scrutiny'
      },
      {
        word: 'unconditional clearance',
        ipa: '/ˌʌnkənˈdɪʃənl ˈklɪrəns/',
        meaning: 'sự phê duyệt không điều kiện ràng buộc',
        collocation: 'grant unconditional clearance'
      },
      {
        word: 'forensic auditor',
        ipa: '/fəˈrɛnsɪk ˈɔːdɪtər/',
        meaning: 'kiểm toán viên điều tra pháp lý',
        collocation: 'independent forensic auditor'
      },
      {
        word: 'syndicated credit facility',
        ipa: '/ˈsɪndɪkeɪtɪd ˈkrɛdɪt fəˈsɪləti/',
        meaning: 'khoản vay hợp vốn ngân hàng',
        collocation: 'secure a syndicated facility'
      },
      {
        word: 'ratify',
        ipa: '/ˈrætɪfaɪ/',
        meaning: 'phê chuẩn, thông qua chính thức',
        collocation: 'ratify the merger deed'
      }
    ]
  }
];

export function getMasterclassPack(dayNumber: number): MasterclassDayPack {
  const pack = MASTERCLASS_DAY_PACKS.find((p) => p.dayNumber === dayNumber);
  return pack || MASTERCLASS_DAY_PACKS[0];
}
