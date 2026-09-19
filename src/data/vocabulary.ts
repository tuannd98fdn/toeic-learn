import { VOCAB_450 } from './vocab/vocab_450';
import { VOCAB_650 } from './vocab/vocab_650';
import { VOCAB_800 } from './vocab/vocab_800';
import { VOCAB_READING_SPECIALIZED } from './vocab/vocab_reading_specialized';

export type TargetBand = '450+' | '650+' | '800+' | 'Reading Part 6 & 7';

export interface ParaphrasePair {
  passageText: string;
  optionText: string;
  explanation?: string;
}

export interface VocabularyWord {
  id: string;
  word: string;
  ipa: string;
  vietnamese: string;
  partOfSpeech: string;
  category: string;
  topicId?: string;
  examples: string[];
  mnemonicTip: string;
  emoji: string;
  targetBand?: TargetBand;
  source?: 'system' | 'user';
  readingType?: 'collocation' | 'paraphrase';
  paraphrasePair?: ParaphrasePair;
}

export interface ToeicTopic {
  id: string;
  nameEn: string;
  nameVi: string;
  description: string;
  icon: string;
}

export const TOEIC_TOPICS: ToeicTopic[] = [
  { id: 'contracts', nameEn: 'Contracts & Legal', nameVi: 'Hợp đồng & Pháp lý', description: 'Điều khoản, thỏa thuận, bảo hành, cam kết tuân thủ', icon: 'FileTextIcon' },
  { id: 'corporate', nameEn: 'Corporate & Management', nameVi: 'Doanh nghiệp & Quản lý', description: 'Chiến lược, tái cấu trúc, điều hành, ban giám đốc', icon: 'BriefcaseIcon' },
  { id: 'personnel', nameEn: 'Personnel & HR', nameVi: 'Nhân sự & Tuyển dụng', description: 'Tuyển dụng, phỏng vấn, lương thưởng, thăng chức, hưu trí', icon: 'UsersIcon' },
  { id: 'finance', nameEn: 'Finance & Accounting', nameVi: 'Tài chính & Kế toán', description: 'Ngân sách, hóa đơn, doanh thu, kiểm toán, hoàn thuế', icon: 'DollarSignIcon' },
  { id: 'marketing', nameEn: 'Marketing & Sales', nameVi: 'Tiếp thị & Bán hàng', description: 'Chiến dịch quảng bá, khảo sát thị trường, giảm giá', icon: 'TrendingUpIcon' },
  { id: 'office', nameEn: 'Office & Administration', nameVi: 'Văn phòng & Hành chính', description: 'Cuộc họp, biên bản, thiết bị, quy trình văn thư', icon: 'LayersIcon' },
  { id: 'logistics', nameEn: 'Purchasing & Logistics', nameVi: 'Mua sắm & Chuỗi cung ứng', description: 'Đơn hàng, giao nhận, tồn kho, bưu kiện, vận chuyển', icon: 'TruckIcon' },
  { id: 'manufacturing', nameEn: 'Manufacturing & Quality', nameVi: 'Sản xuất & Chất lượng', description: 'Dây chuyền nhà máy, bảo trì máy móc, an toàn lao động', icon: 'WrenchIcon' },
  { id: 'travel', nameEn: 'Travel & Hospitality', nameVi: 'Du lịch & Công tác', description: 'Vé máy bay, khách sạn, đặt phòng, đón tiễn sân bay', icon: 'CompassIcon' },
  { id: 'real_estate', nameEn: 'Real Estate & Facilities', nameVi: 'Bất động sản & Cơ sở vật chất', description: 'Thuê mặt bằng, tân trang tòa nhà, tiện ích văn phòng', icon: 'HomeIcon' },
  { id: 'customer_service', nameEn: 'Customer Relations', nameVi: 'Chăm sóc Khách hàng', description: 'Phản hồi, giải quyết khiếu nại, khách hàng thân thiết', icon: 'MessageSquareIcon' },
  { id: 'collocations_paraphrase', nameEn: 'Collocations & Paraphrase', nameVi: 'Cụm từ & Paraphrase Đọc hiểu', description: 'Cụm từ cố định Part 5-6 và cặp từ đồng nghĩa Part 7', icon: 'BookOpenIcon' },
];

export const VOCABULARY_DATA: VocabularyWord[] = [
  ...VOCAB_450,
  ...VOCAB_650,
  ...VOCAB_800,
  ...VOCAB_READING_SPECIALIZED
];

export const getWordsByCategory = (category: string) => {
  if (category === "All" || !category) return VOCABULARY_DATA;
  return VOCABULARY_DATA.filter(w => w.category === category || w.topicId === category);
};

export const getReadingCollocations = () => {
  return VOCABULARY_DATA.filter(w => w.readingType === 'collocation');
};

export const getParaphrasingPairs = () => {
  return VOCABULARY_DATA.filter(w => w.readingType === 'paraphrase' && !!w.paraphrasePair);
};

export const getRandomWords = (n: number, excludeIds: string[] = []) => {
  const available = VOCABULARY_DATA.filter(w => !excludeIds.includes(w.id));
  const shuffled = [...available].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

export const getTopicById = (id: string): ToeicTopic | undefined => {
  return TOEIC_TOPICS.find(t => t.id === id);
};

export const getTopicByName = (name: string): ToeicTopic | undefined => {
  return TOEIC_TOPICS.find(t => t.nameEn === name || t.nameVi === name || t.id === name);
};
