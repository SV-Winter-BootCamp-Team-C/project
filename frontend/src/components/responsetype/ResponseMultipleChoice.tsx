import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import typeIcon from '../../assets/type.svg';
import { QuestionData } from '../../types/questionData';
import { getRoundedClass } from '../../utils/getRoundedClass';

interface ResponseMultipleChoiceProps {
  question: QuestionData; // 수정된 QuestionData 타입 사용
  color: string;
  buttonStyle: 'angled' | 'smooth' | 'round';
  index: number;
  onOptionSelect: (choiceId: number) => void;
  isViewPage?: boolean;
}

function ResponseMultipleChoice({
  question,
  color,
  buttonStyle,
  index,
  onOptionSelect,
  isViewPage,
}: ResponseMultipleChoiceProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionSelect = (choiceId: number) => {
    setSelectedOption(choiceId);
    onOptionSelect(choiceId); // 선택한 옵션을 콜백으로 전달
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
          <span className="ml-2 font-medium text-left text-darkGray">객관식</span>
        </div>
      </div>

      <div className="flex items-center justify-center w-full">
        <span className="text-[2rem] font-semibold text-center text-black -translate-y-4">Q{index}.</span>
      </div>

      <span className="max-w-[37.5rem] text-[1rem] my-2 text-base text-center text-black break-words">
        {question.content}
      </span>

      {question.imageUrl && (
        <img
          src={question.imageUrl}
          alt="Question"
          className="rounded-[0.625rem] max-w-[30rem] max-h-[36rem]"
          style={{ border: `0.125rem solid ${color}` }}
        />
      )}

      <div className="flex flex-col my-4 space-y-2 choices-container">
        {question.choices?.map((choice) =>
          isViewPage ? (
            <Tooltip key={choice.choiceId} title="이 페이지에서는 선택할 수 없습니다." arrow>
              <button
                type="button"
                className={`w-[37.5rem] choice-item px-10 py-2 ${getRoundedClass(buttonStyle)} cursor-not-allowed`}
                style={{
                  backgroundColor: `${color}`,
                }}
              >
                <span className="text-base break-words">{choice.option}</span>
              </button>
            </Tooltip>
          ) : (
            <button
              type="button"
              key={choice.choiceId}
              className={`w-[37.5rem] choice-item px-10 py-2 ${getRoundedClass(buttonStyle)}`}
              style={{
                backgroundColor: selectedOption === choice.choiceId ? `gray` : `${color}`,
              }}
              onClick={() => handleOptionSelect(choice.choiceId)}
            >
              <span className="text-base break-words">{choice.option}</span>
            </button>
          ),
        )}
      </div>
    </div>
  );
}

export default ResponseMultipleChoice;
