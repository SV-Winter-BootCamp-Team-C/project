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
    content: '인사말을 입력해주세요.',
    image_url: '',
    answers: [
      { answer_id: 1, content: '안녕' },
      { answer_id: 2, content: '안녕' },
      { answer_id: 3, content: '안녕' },
      { answer_id: 4, content: '안녕' },
      { answer_id: 5, content: '안녕' },
      { answer_id: 6, content: '안녕' },
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
