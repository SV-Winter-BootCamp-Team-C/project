import { useState } from 'react';
import typeIcon from '@/assets/type.svg';
import { QuestionData } from '@/types/questionData'; // questionData.ts에서 타입 가져오기

interface ResponseMultipleChoiceProps {
  question: QuestionData; // 수정된 QuestionData 타입 사용
}

function ResponseMultipleChoice({ question }: ResponseMultipleChoiceProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionSelect = (choiceId: number) => {
    setSelectedOption(choiceId);
  };

  return (
    <div
      className="flex flex-col items-center justify-center rounded-[1.25rem] bg-white border border-purple"
      style={{ boxShadow: '0 0 0.25rem 0.25rem rgba(145,141,202,0.25)' }}
    >
      <div className="flex justify-start w-full mt-4">
        <div className="flex items-center ml-4">
          <img src={typeIcon} alt="Type" className="w-5 h-5" />
          <span className="ml-2 font-medium text-left text-darkGray">객관식</span>
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

      <div className="flex flex-col mb-4 space-y-2 choices-container ">
        {question.choices?.map((choice) => (
          <button
            type="button"
            key={choice.choiceId}
            className={`w-[25rem] h-[2.5rem] choice-item p-2 rounded-[1.25rem] ${
              selectedOption === choice.choiceId ? 'bg-gray' : 'bg-lightGray'
            } ${selectedOption === choice.choiceId ? 'selected' : ''}`}
            onClick={() => handleOptionSelect(choice.choiceId)}
          >
            {choice.option}
          </button>
        ))}
      </div>
      {selectedOption !== null && (
        <div className="mb-4">
          <p>You selected: {question.choices?.find((choice) => choice.choiceId === selectedOption)?.option}</p>
        </div>
      )}
    </div>
  );
}

export default ResponseMultipleChoice;
