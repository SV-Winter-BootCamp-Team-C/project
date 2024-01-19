import typeIcon from '../../assets/type.svg';
import { ExtendedQuestionData } from '../../types/questionData';

interface StaticSubjectiveProps {
  question: ExtendedQuestionData;
  color: string;
  index: number;
}

function StaticSubjective({ question, color, index }: StaticSubjectiveProps) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-[1.25rem] bg-white"
      style={{
        boxShadow: `0 0 0.25rem 0.25rem ${color}40`,
      }}
    >
      <div className="flex justify-start w-full mt-4">
        <div className="flex items-center ml-4">
          <img src={typeIcon} alt="Type" className="w-5 h-5" />
          <span className="ml-2 font-medium text-left text-darkGray">주관식</span>
        </div>
      </div>

      <div className="flex items-center justify-center w-full">
        <span className="text-[2rem] font-semibold text-center text-black -translate-y-4">Q{index}.</span>
      </div>

      <span className="max-w-[37.5rem] text-[1rem] mt-[0.5rem] mb-6 text-center text-black">{question.content}</span>

      {question.imageUrl && (
        <img
          src={question.imageUrl}
          alt="Question"
          className="rounded-[0.625rem] max-w-[30rem] max-h-[36rem]"
          style={{ border: `0.125rem solid ${color}` }}
        />
      )}
      <div className="w-[25rem] my-4">
        <textarea
          value={question.subContent}
          readOnly // 읽기 전용으로 설정
          rows={4}
          className="w-full p-2 border rounded-md focus:outline-none"
          style={{ overflowY: 'auto', resize: 'vertical', border: `0.0625rem solid ${color}` }}
        />
      </div>
    </div>
  );
}

export default StaticSubjective;
