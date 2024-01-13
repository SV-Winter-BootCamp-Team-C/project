import { useState } from 'react';
import typeIcon from '@/assets/type.svg';
import { QuestionData } from '@/types/questionData';

interface ResponseSubjectiveProps {
  question: QuestionData;
}

function ResponseSubjective({ question }: ResponseSubjectiveProps) {
  const [userResponse, setUserResponse] = useState<string>(''); // 주관식 응답을 저장할 상태

  const handleUserResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserResponse(e.target.value); // 입력 내용을 상태에 업데이트
  };

  return (
    <div
      className="flex flex-col items-center justify-center rounded-[1.25rem] bg-white border border-purple"
      style={{ boxShadow: '0 0 0.25rem 0.25rem rgba(145,141,202,0.25)' }}
    >
      <div className="flex justify-start w-full mt-4">
        <div className="flex items-center ml-4">
          <img src={typeIcon} alt="Type" className="w-5 h-5" />
          <span className="ml-2 font-medium text-left text-darkGray">주관식</span>
        </div>
      </div>

      <div className="flex items-center justify-center w-full">
        <span className="text-[2rem] font-semibold text-center text-black -translate-y-4">Q{question.questionId}.</span>
      </div>

      <span className="max-w-[37.5rem] text-[1rem] mt-[0.5rem] mb-6 text-center text-black">{question.content}</span>

      {question.imageUrl && (
        <img
          src={question.imageUrl}
          alt="Question"
          className="rounded-[0.625rem] border-2 border-solid border-gray max-w-[45rem] max-h-[45rem]"
        />
      )}
      <div className="w-[25rem] my-4">
        <textarea
          value={userResponse}
          onChange={handleUserResponseChange}
          rows={4} // 원하는 행 수로 조절 가능
          placeholder="여기에 주관식 답변을 입력하세요."
          className="w-full p-2 border rounded-md border-gray"
          style={{ overflowY: 'auto', resize: 'vertical' }} // 세로 스크롤바를 표시하고, 세로 크기 조절을 허용
        />
      </div>
    </div>
  );
}

export default ResponseSubjective;
