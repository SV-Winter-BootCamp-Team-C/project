import { useState } from 'react';
import typeIcon from '@/assets/type.svg';
import checkIcon from '@/assets/check.svg';
import { QuestionData } from '@/types/questionData';

interface ResponseCheckBoxProps {
  question: QuestionData;
}

function ResponseCheckBox({ question }: ResponseCheckBoxProps) {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]); // 선택된 옵션을 배열로 관리

  const handleOptionSelect = (choiceId: number) => {
    // 선택한 옵션이 이미 선택되었는지 확인
    if (selectedOptions.includes(choiceId)) {
      // 이미 선택되었으면 선택 해제
      setSelectedOptions((prevSelectedOptions) => prevSelectedOptions.filter((id) => id !== choiceId));
    } else {
      // 선택되지 않았으면 선택 추가
      setSelectedOptions((prevSelectedOptions) => [...prevSelectedOptions, choiceId]);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center rounded-[1.25rem] bg-white border border-purple"
      style={{ boxShadow: '0 0 0.25rem 0.25rem rgba(145,141,202,0.25)' }}
    >
      <div className="flex justify-start w-full mt-4">
        <div className="flex items-center ml-4">
          <img src={typeIcon} alt="Type" className="w-5 h-5" />
          <span className="ml-2 font-medium text-left text-darkGray">체크박스</span>
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

      <div className="mt-4">
        {question.choices?.map((choice) => (
          <div key={choice.choicesId} className="flex items-center justify-center w-full mb-2">
            <div className="relative flex justify-center items-center w-[25rem] h-10 bg-lightGray rounded-[1.25rem]">
              <label
                htmlFor={`checkbox-${choice.choicesId}`}
                className={`absolute top-[0.625rem] left-[0.625rem] w-5 h-5 flex justify-center items-center rounded-md ${
                  selectedOptions.includes(choice.choicesId) ? 'bg-blue-500' : 'bg-white'
                } border border-gray-300`}
              >
                <input
                  type="checkbox"
                  id={`checkbox-${choice.choicesId}`}
                  className="absolute opacity-0"
                  checked={selectedOptions.includes(choice.choicesId)}
                  onChange={() => handleOptionSelect(choice.choicesId)}
                />
                {selectedOptions.includes(choice.choicesId) && (
                  <img src={checkIcon} alt="Checked" className="w-4 h-4" />
                )}
              </label>
              <span className="w-60 text-[1rem] text-base text-center text-black">{choice.option}</span>
            </div>
          </div>
        ))}
      </div>
      {selectedOptions.length > 0 && (
        <div className="flex justify-center mb-4">
          <p>You selected:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {selectedOptions.map((selectedChoiceId) => {
              const selectedChoice = question.choices?.find((choice) => choice.choicesId === selectedChoiceId);
              return (
                <span key={selectedChoiceId} style={{ marginLeft: '0.25rem' }}>
                  {selectedChoice?.option}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ResponseCheckBox;
