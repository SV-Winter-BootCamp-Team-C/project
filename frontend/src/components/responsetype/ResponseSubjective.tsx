import { useState } from 'react';
import typeIcon from '../../assets/type.svg';
import { QuestionData } from '../../types/questionData';

interface ResponseSubjectiveProps {
  question: QuestionData;
  color: string;
  index: number;
  onSubChange: (response: string) => void;
  isViewPage?: boolean;
}

function ResponseSubjective({ question, color, index, onSubChange, isViewPage }: ResponseSubjectiveProps) {
  const [userResponse, setUserResponse] = useState<string>(''); // 주관식 응답을 저장할 상태

  const handleUserResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newResponse = e.target.value;
    setUserResponse(newResponse); // 상태 업데이트
    onSubChange(newResponse); // 콜백 함수 호출
  };

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
        {isViewPage ? (
          <textarea
            rows={4}
            readOnly
            placeholder="이 페이지에서는 입력할 수 없습니다."
            className="w-full p-2 rounded-md cursor-not-allowed focus:outline-none"
            style={{ overflowY: 'auto', resize: 'none', border: `0.0625rem solid ${color}` }}
          />
        ) : (
          <textarea
            value={userResponse}
            onChange={handleUserResponseChange}
            rows={4} // 원하는 행 수로 조절 가능
            placeholder="여기에 주관식 답변을 입력하세요."
            className="w-full p-2 rounded-md"
            style={{ overflowY: 'auto', resize: 'vertical', border: `0.0625rem solid ${color}` }} // 세로 스크롤바를 표시하고, 세로 크기 조절을 허용
          />
        )}
      </div>
    </div>
  );
}

export default ResponseSubjective;
