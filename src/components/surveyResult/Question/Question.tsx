import { QuestionData } from '@/types/questionData';
import PieChart from './PieChart';
import SubjectQuestion from './SubjectQuestion';

// 테스트 데이터
const surveyData: QuestionData[] = [
  {
    questionId: 4,
    type: 'CHECKBOX',
    content: '당신의 성별은 무엇인가요?',
    imageUrl: '',
    choices: [
      { choiceId: 1, option: '남성', count: 1 },
      { choiceId: 2, option: '여성', count: 2 },
      { choiceId: 3, option: '선택안함', count: 3 },
    ],
  },
  {
    questionId: 5,
    type: 'SUBJECTIVE_QUESTION',
    content: '싸이월드감성의 노래는?',
    imageUrl: '',
    answers: [
      { answerId: 1, content: '전화번호 - 지누션' },
      { answerId: 2, content: '외톨이 - 아웃사이더' },
      { answerId: 3, content: '꺼져 줄게 잘 살아 - 지나' },
      { answerId: 4, content: '미친거니 - 송지은' },
      { answerId: 5, content: 'Y - 프리스타일' },
      { answerId: 6, content: '헤어지지 못하는 여자, 떠나가지 못하는 남자 - 리쌍' },
      { answerId: 7, content: '그땐 그땐 그땐 - 슈프림팀, 영준' },
      { answerId: 8, content: '오리 날다 - 체리필터' },
      { answerId: 9, content: '하늘을 달리다 - 이적' },
      { answerId: 10, content: '비밀번호 486 - 윤하' },
      { answerId: 11, content: '잔소리 - 아이유 (With 2AM 슬옹)' },
      { answerId: 12, content: '애인만들기 - SS501' },
      { answerId: 13, content: '백지영 - 총맞은것처럼' },
    ],
  },
  {
    questionId: 6,
    type: 'SUBJECTIVE_QUESTION',
    content: '2024 기대되는 걸그룹은?',
    imageUrl: '',
    answers: [
      { answerId: 1, content: 'NewJeans' },
      { answerId: 2, content: 'IVE' },
      { answerId: 3, content: 'LE SSERAFIM' },
      { answerId: 4, content: 'BABYMONSTER' },
      { answerId: 5, content: 'STACY' },
      { answerId: 6, content: 'aespa' },
      { answerId: 7, content: 'KISSOFLIFE' },
      { answerId: 8, content: 'Kep1er' },
      { answerId: 9, content: 'NMIXX' },
      { answerId: 10, content: 'Billlie' },
      { answerId: 11, content: 'FIFTY FIFTY' },
      { answerId: 12, content: 'fromis_9' },
      { answerId: 13, content: '(G)I-DLE' },
    ],
  },
];

function Question() {
  return (
    <div className="grid gap-6">
      {surveyData.map((question, index) => {
        // 주관식일 경우
        if (question.type === 'SUBJECTIVE_QUESTION') {
          return <SubjectQuestion key={question.questionId} index={index + 1} question={question} />;
        }
        // 객관식, 체크박스, 드롭다운일 경우
        return <PieChart key={question.questionId} index={index + 1} question={question} />;
      })}
    </div>
  );
}

export default Question;
