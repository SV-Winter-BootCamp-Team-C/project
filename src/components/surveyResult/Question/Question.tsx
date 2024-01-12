import { QuestionData } from '@/types/questionData';
import PieChart from './PieChart';
import SubjectQuestion from './SubjectQuestion';

// 테스트 데이터
const surveyData: QuestionData[] = [
  {
    question_id: 4,
    type: 'CHECKBOX',
    content: '당신의 성별은 무엇인가요?',
    image_url: '',
    choices: [
      { choices_id: 1, option: '남성', count: 1 },
      { choices_id: 2, option: '여성', count: 2 },
      { choices_id: 3, option: '선택안함', count: 3 },
    ],
  },
  {
    question_id: 5,
    type: 'SUBJECTIVE_QUESTION',
    content: '싸이월드감성의 노래는?',
    image_url: '',
    answers: [
      { answer_id: 1, content: '전화번호 - 지누션' },
      { answer_id: 2, content: '외톨이 - 아웃사이더' },
      { answer_id: 3, content: '꺼져 줄게 잘 살아 - 지나' },
      { answer_id: 4, content: '미친거니 - 송지은' },
      { answer_id: 5, content: 'Y - 프리스타일' },
      { answer_id: 6, content: '헤어지지 못하는 여자, 떠나가지 못하는 남자 - 리쌍' },
      { answer_id: 7, content: '그땐 그땐 그땐 - 슈프림팀, 영준' },
      { answer_id: 8, content: '오리 날다 - 체리필터' },
      { answer_id: 9, content: '하늘을 달리다 - 이적' },
      { answer_id: 10, content: '비밀번호 486 - 윤하' },
      { answer_id: 11, content: '잔소리 - 아이유 (With 2AM 슬옹)' },
      { answer_id: 12, content: '애인만들기 - SS501' },
      { answer_id: 13, content: '백지영 - 총맞은것처럼' },
    ],
  },
  {
    question_id: 6,
    type: 'SUBJECTIVE_QUESTION',
    content: '2024 기대되는 걸그룹은?',
    image_url: '',
    answers: [
      { answer_id: 1, content: 'NewJeans' },
      { answer_id: 2, content: 'IVE' },
      { answer_id: 3, content: 'LE SSERAFIM' },
      { answer_id: 4, content: 'BABYMONSTER' },
      { answer_id: 5, content: 'STACY' },
      { answer_id: 6, content: 'aespa' },
      { answer_id: 7, content: 'KISSOFLIFE' },
      { answer_id: 8, content: 'Kep1er' },
      { answer_id: 9, content: 'NMIXX' },
      { answer_id: 10, content: 'Billlie' },
      { answer_id: 11, content: 'FIFTY FIFTY' },
      { answer_id: 12, content: 'fromis_9' },
      { answer_id: 13, content: '(G)I-DLE' },
    ],
  },
];

function Question() {
  return (
    <div className="grid gap-6">
      {surveyData.map((question, index) => {
        // 주관식일 경우
        if (question.type === 'SUBJECTIVE_QUESTION') {
          return <SubjectQuestion key={question.question_id} index={index + 1} question={question} />;
        }
        // 객관식, 체크박스, 드롭다운일 경우
        return <PieChart key={question.question_id} index={index + 1} question={question} />;
      })}
    </div>
  );
}

export default Question;
