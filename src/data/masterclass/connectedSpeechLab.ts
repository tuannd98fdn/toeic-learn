import { ConnectedSpeechLesson } from '@/schema/masterclass';

export const CONNECTED_SPEECH_LESSONS: ConnectedSpeechLesson[] = [
  {
    id: 'csl_1_british_glottal',
    title: 'Bẻ Khóa Giọng Anh (British): Âm Ngắt Họng (Glottal Stop) & Nuốt Âm /t/',
    accent: 'British',
    phoneticPhenomenon: 'Glottal Stop /ʔ/ và Vần câm Non-rhotic',
    writtenSentence: 'The quarterly report is certainly not written yet.',
    spokenTranscription: '/ðə ˈkwɔːtəli rɪˈpɔːt ɪz ˈsɜːʔnli nɒʔ ˈrɪʔn jɛt/',
    audioNormalUrl: '/audio/masterclass/csl_1_british_glottal_1x.mp3',
    audioSlowUrl: '/audio/masterclass/csl_1_british_glottal_075x.mp3',
    wordAlignments: [
      { word: 'The', ipa: '/ðə/' },
      {
        word: 'quarterly',
        ipa: '/ˈkwɔːtəli/',
        phenomenonNote: 'Non-rhotic British: âm /r/ cuối âm tiết không uốn lưỡi, kéo dài nguyên âm mở /ɔː/.'
      },
      {
        word: 'report',
        ipa: '/rɪˈpɔːt/',
        phenomenonNote: 'Non-rhotic British: âm /r/ cuối thành nguyên âm dài /ɔː/, không cuộn lưỡi.'
      },
      { word: 'is', ipa: '/ɪz/' },
      {
        word: 'certainly',
        ipa: '/ˈsɜːʔnli/',
        isKeyPhenomenon: true,
        phenomenonNote: 'Glottal Stop /ʔ/: âm /t/ bị chặn hơi tại thanh quản trước phụ âm mũi /n/, biến mất hoàn toàn.'
      },
      {
        word: 'not',
        ipa: '/nɒʔ/',
        isKeyPhenomenon: true,
        phenomenonNote: 'Glottal Stop /ʔ/: âm /t/ cuối từ bị ngắt dứt khoát tại cổ họng, không bật phụ âm cuối.'
      },
      {
        word: 'written',
        ipa: '/ˈrɪʔn/',
        isKeyPhenomenon: true,
        phenomenonNote: 'Glottal Stop /ʔ/: nuốt hoàn toàn âm /t/, tạo khoảng lặng thanh quản trước âm /n/.'
      },
      { word: 'yet', ipa: '/jɛt/' }
    ],
    explanation:
      'Trong đề thi ETS Listening (đặc biệt Part 2 & Part 3), người nói giọng Anh (British) thường không bật rõ âm /t/ ở giữa hoặc cuối từ ("certainly", "not", "written"), mà thay bằng âm ngắt luồng hơi ở thanh quản (Glottal Stop). Đồng thời, âm /r/ ở cuối âm tiết ("quarterly", "report") sẽ biến thành nguyên âm kéo dài thay vì uốn lưỡi như giọng Mỹ.',
    audioSimulatedText: 'The quarterly report is certainly not written yet.',
    drillQuestion: {
      question: 'Khi người nói giọng Anh phát âm "certainly not written", âm /t/ thường được xử lý như thế nào?',
      options: [
        'A) Bật mạnh hơi như chữ "th" trong tiếng Việt',
        'B) Bị chặn hơi ngắn tại cổ họng (glottal stop) và biến mất gần như hoàn toàn',
        'C) Biến thành âm /d/ mềm mại',
        'D) Đọc kéo dài nguyên âm đứng trước'
      ],
      correctIndex: 1,
      explanation: 'Chính xác! Giọng British trong ETS thường thay thế /t/ bằng glottal stop trước các phụ âm mũi hoặc cuối từ.'
    }
  },
  {
    id: 'csl_2_american_flapped_t',
    title: 'Bẻ Khóa Giọng Mỹ (American): Âm Vỗ Flapped /t/ & Nối Âm Nguyên Âm',
    accent: 'American',
    phoneticPhenomenon: 'Flapped /t/ -> [d] và Cụm Nối Âm Liền Khối',
    writtenSentence: 'Put it on the desk and meet us at eight.',
    spokenTranscription: '/pʊd-ɪd-ɑːn ðə dɛsk ənd miːd-əs əd-eɪt/',
    audioNormalUrl: '/audio/masterclass/csl_2_american_flapped_t_1x.mp3',
    audioSlowUrl: '/audio/masterclass/csl_2_american_flapped_t_075x.mp3',
    wordAlignments: [
      {
        word: 'Put',
        ipa: '/pʊd/',
        isKeyPhenomenon: true,
        phenomenonNote: 'Flapped T: âm /t/ đứng trước nguyên âm /ɪ/ của "it" biến thành âm vỗ [d].'
      },
      {
        word: 'it',
        ipa: '/ɪd/',
        isKeyPhenomenon: true,
        phenomenonNote: 'Flapped T: âm /t/ đứng trước nguyên âm /ɑː/ của "on" tiếp tục vỗ thành [d].'
      },
      { word: 'on', ipa: '/ɑːn/' },
      { word: 'the', ipa: '/ðə/' },
      { word: 'desk', ipa: '/dɛsk/' },
      { word: 'and', ipa: '/ənd/' },
      {
        word: 'meet',
        ipa: '/miːd/',
        isKeyPhenomenon: true,
        phenomenonNote: 'Flapped T: âm /t/ vỗ thành [d] nối liền với "us" tạo thành /miːd-əs/.'
      },
      { word: 'us', ipa: '/əs/' },
      {
        word: 'at',
        ipa: '/əd/',
        isKeyPhenomenon: true,
        phenomenonNote: 'Flapped T: âm /t/ của "at" nối với "eight" tạo thành /əd-eɪt/.'
      },
      { word: 'eight', ipa: '/eɪt/' }
    ],
    explanation:
      'Người Mỹ luôn biến âm /t/ hoặc /d/ đứng giữa 2 nguyên âm thành âm vỗ nhẹ [d] (Flapped T). Cụm "put it on" nghe thành một từ liền mạch "pud-id-on", và "meet us at eight" nghe như "mee-dus-ad-eight". Nếu chờ đợi nghe chữ "put" dừng lại rồi mới đến "it", bạn sẽ bị trôi mất toàn bộ câu hỏi Part 2.',
    audioSimulatedText: 'Put it on the desk and meet us at eight.',
    drillQuestion: {
      question: 'Trong câu "Put it on the desk", tai người học thường nghe thấy chuỗi âm thanh nào?',
      options: [
        'A) /pʊt/ ... /ɪt/ ... /ɒn/',
        'B) /pʊ-dɪ-dɑːn/ (âm t vỗ thành d và nối liền)',
        'C) /pʊt-tɪt-tɒn/',
        'D) /puːt iːt oʊn/'
      ],
      correctIndex: 1,
      explanation: 'Chính xác! Cụm 3 từ đơn biến thành một chuỗi âm thanh liên tục nhờ hiện tượng Flapped T và Linking Vowel.'
    }
  },
  {
    id: 'csl_3_australian_vowel_shift',
    title: 'Bẻ Khóa Giọng Úc (Australian): Dịch Chuyển Nguyên Âm /eɪ/ -> /aɪ/ & Elision',
    accent: 'Australian',
    phoneticPhenomenon: 'Vowel Shift /eɪ/ -> [aɪ] và Lên giọng cuối câu (HRT)',
    writtenSentence: 'The conference date has been changed to late May.',
    spokenTranscription: '/ðə ˈkɒnfərəns daɪt həz biːn tʃaɪndʒd tə laɪt maɪ/',
    audioNormalUrl: '/audio/masterclass/csl_3_australian_vowel_shift_1x.mp3',
    audioSlowUrl: '/audio/masterclass/csl_3_australian_vowel_shift_075x.mp3',
    wordAlignments: [
      { word: 'The', ipa: '/ðə/' },
      { word: 'conference', ipa: '/ˈkɒnfərəns/' },
      {
        word: 'date',
        ipa: '/daɪt/',
        isKeyPhenomenon: true,
        phenomenonNote: 'Australian Vowel Shift: nguyên âm /eɪ/ chuyển dịch về /aɪ/, nghe như "dight".'
      },
      { word: 'has', ipa: '/həz/' },
      { word: 'been', ipa: '/biːn/' },
      {
        word: 'changed',
        ipa: '/tʃaɪndʒd/',
        isKeyPhenomenon: true,
        phenomenonNote: 'Australian Vowel Shift: nguyên âm /eɪ/ chuyển dịch về /aɪ/, nghe như "chined".'
      },
      { word: 'to', ipa: '/tə/' },
      {
        word: 'late',
        ipa: '/laɪt/',
        isKeyPhenomenon: true,
        phenomenonNote: 'Australian Vowel Shift: nguyên âm /eɪ/ chuyển dịch về /aɪ/, nghe như "light".'
      },
      {
        word: 'May',
        ipa: '/maɪ/',
        isKeyPhenomenon: true,
        phenomenonNote: 'Australian Vowel Shift: "May" phát âm dịch chuyển nghe như "my".'
      }
    ],
    explanation:
      'Đề ETS sử dụng giọng Úc để phân loại điểm 800+ vì nguyên âm /eɪ/ (trong "date", "change", "late", "May") bị dịch chuyển sang gần giống /aɪ/ (nghe hơi giống "dight", "chined", "light", "my"). Thí sinh không quen sẽ tưởng người nói nhắc đến "night" hoặc "my", dẫn đến chọn sai phương án.',
    audioSimulatedText: 'The conference date has been changed to late May.',
    drillQuestion: {
      question: 'Khi giọng Úc đọc từ "late May", người nghe dễ nghe nhầm thành âm thanh nào?',
      options: [
        'A) "let me"',
        'B) "light my"',
        'C) "lot more"',
        'D) "lead may"'
      ],
      correctIndex: 1,
      explanation: 'Chính xác! Sự dịch chuyển nguyên âm /eɪ/ sang /aɪ/ là đặc trưng số 1 của giọng Úc trong bài thi TOEIC.'
    }
  },
  {
    id: 'csl_4_weak_forms_elision',
    title: 'Bẻ Khóa Tốc Độ Nhanh: Dạng Yếu Của Giới Từ & Nuốt Âm /h/ (Weak Forms)',
    accent: 'American',
    phoneticPhenomenon: 'Weak Forms of Auxiliaries & H-dropping',
    writtenSentence: 'He could have told her that we were going to arrive.',
    spokenTranscription: '/hi kəd-əv toʊld-ər ðət wɪ wər gənə əˈraɪv/',
    audioNormalUrl: '/audio/masterclass/csl_4_weak_forms_elision_1x.mp3',
    audioSlowUrl: '/audio/masterclass/csl_4_weak_forms_elision_075x.mp3',
    wordAlignments: [
      { word: 'He', ipa: '/hi/' },
      {
        word: 'could',
        ipa: '/kəd/',
        isKeyPhenomenon: true,
        phenomenonNote: 'Weak form: trợ động từ giảm âm về /kəd/.'
      },
      {
        word: 'have',
        ipa: '/əv/',
        isKeyPhenomenon: true,
        phenomenonNote: 'Weak form: "have" nuốt âm /h/ rút gọn chỉ còn /əv/, nối liền với could tạo thành /kəd-əv/.'
      },
      { word: 'told', ipa: '/toʊld/' },
      {
        word: 'her',
        ipa: '/ər/',
        isKeyPhenomenon: true,
        phenomenonNote: 'H-dropping: đại từ "her" nuốt âm /h/ thành /ər/, nối trực tiếp từ /d/ của told tạo thành /toʊld-ər/.'
      },
      { word: 'that', ipa: '/ðət/' },
      { word: 'we', ipa: '/wɪ/' },
      { word: 'were', ipa: '/wər/' },
      {
        word: 'going',
        ipa: '/gənə/',
        isKeyPhenomenon: true,
        phenomenonNote: 'Elision & Reduction: cụm "going to" rút gọn thành "gonna" /gənə/.'
      },
      { word: 'to', ipa: '/tə/' },
      { word: 'arrive', ipa: '/əˈraɪv/' }
    ],
    explanation:
      'Trong đàm thoại tự nhiên Part 3 & 4, các trợ động từ và giới từ không mang trọng âm: "could have" rút gọn thành "kood-uv" /kədəv/, "told her" nuốt âm /h/ thành "tol-der", "going to" thành "gonna". Bạn chỉ nghe thấy các từ khóa chính: HE - TOLD - ARRIVE.',
    audioSimulatedText: 'He could have told her that we were going to arrive.',
    drillQuestion: {
      question: 'Trong cụm "told her", âm /h/ của đại từ thường diễn ra hiện tượng gì?',
      options: [
        'A) Bị nuốt hoàn toàn, nối trực tiếp âm /d/ sang /ər/ tạo thành "tol-der"',
        'B) Bật mạnh hơn để nhấn mạnh đối tượng',
        'C) Biến thành âm /w/',
        'D) Đọc tách rời sau dấu ngắt giọng'
      ],
      correctIndex: 0,
      explanation: 'Chính xác! H-dropping là hiện tượng cực kỳ phổ biến khi các đại từ he/him/her đứng sau động từ.'
    }
  }
];
