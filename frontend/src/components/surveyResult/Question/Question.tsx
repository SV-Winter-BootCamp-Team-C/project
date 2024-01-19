import { QuestionData } from '../../../types/questionData';
import PieChart from './PieChart';
import SubjectQuestion from './SubjectQuestion';

interface QuestionProps {
  questions: QuestionData[];
}

function Question({ questions }: QuestionProps) {
  return (
    <div className="grid gap-6">
      {questions?.map((question, index) => {
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
