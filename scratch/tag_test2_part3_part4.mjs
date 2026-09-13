import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();

function tagTest2Part3() {
  const filePath = path.join(ROOT_DIR, 'public/data/ets2022/test2/part3.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const typeMap = {
    32: 'Detail',
    33: 'Detail',
    34: 'Offer',
    35: 'Topic / Main Idea',
    36: 'Detail',
    37: 'Next Action',
    38: 'Detail',
    39: 'Detail',
    40: 'Next Action',
    41: 'Detail',
    42: 'Detail',
    43: 'Next Action',
    44: 'Speaker / Listener',
    45: 'Next Action',
    46: 'Detail',
    47: 'Topic / Main Idea',
    48: 'Recommendation',
    49: 'Next Action',
    50: 'Speaker / Listener',
    51: 'Topic / Main Idea',
    52: 'Detail',
    53: 'Detail',
    54: 'Detail',
    55: 'Detail',
    56: 'Topic / Main Idea',
    57: 'Detail',
    58: 'Next Action',
    59: 'Detail',
    60: 'Inference',
    61: 'Next Action',
    62: 'Detail',
    63: 'Detail',
    64: 'Detail',
    65: 'Topic / Main Idea',
    66: 'Graphic / Map',
    67: 'Next Action',
    68: 'Detail',
    69: 'Detail',
    70: 'Next Action',
  };

  data.forEach(set => {
    set.questions.forEach(q => {
      const t = typeMap[q.number] || 'Detail';
      q.questionType = t;
      q.subCategory = t;
    });
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log('✅ Tagged Test 2 Part 3 (39 questions)');
}

function tagTest2Part4() {
  const filePath = path.join(ROOT_DIR, 'public/data/ets2022/test2/part4.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const typeMap = {
    71: 'Speaker / Listener',
    72: 'Purpose',
    73: 'Request',
    74: 'Detail',
    75: 'Detail',
    76: 'Detail',
    77: 'Purpose',
    78: 'Detail',
    79: 'Detail',
    80: 'Topic / Main Idea',
    81: 'Detail',
    82: 'Detail',
    83: 'Topic / Main Idea',
    84: 'Detail',
    85: 'Next Action',
    86: 'Detail',
    87: 'Recommendation',
    88: 'Detail',
    89: 'Detail',
    90: 'Detail',
    91: 'Detail',
    92: 'Speaker / Listener',
    93: 'Topic / Main Idea',
    94: 'Request',
    95: 'Detail',
    96: 'Graphic / Map',
    97: 'Inference',
    98: 'Topic / Main Idea',
    99: 'Graphic / Map',
    100: 'Detail',
  };

  data.forEach(set => {
    set.questions.forEach(q => {
      const t = typeMap[q.number] || 'Detail';
      q.questionType = t;
      q.subCategory = t;
    });
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log('✅ Tagged Test 2 Part 4 (30 questions)');
}

tagTest2Part3();
tagTest2Part4();
