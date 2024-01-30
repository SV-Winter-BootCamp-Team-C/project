import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import typeIcon from '../../assets/type.svg';
import checkIcon from '../../assets/check.svg';
import { QuestionData } from '../../types/questionData';
import { getRoundedClass } from '../../utils/getRoundedClass';

interface ResponseCheckBoxProps {
  question: QuestionData;
  color: string;
  buttonStyle: 'angled' | 'smooth' | 'round';
  index: number;
  onOptionSelect: (newSelectedOptions: number[]) => void;
  isViewPage?: boolean;
}

function ResponseCheckBox({ question, color, buttonStyle, index, onOptionSelect, isViewPage }: ResponseCheckBoxProps) {
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

    const newSelectedOptions = selectedOptions.includes(choiceId)
      ? selectedOptions.filter((id) => id !== choiceId)
      : [...selectedOptions, choiceId];

    // 상태 업데이트
    setSelectedOptions(newSelectedOptions);

    // 콜백 함수에 새로운 선택된 옵션 배열 전달
    onOptionSelect(newSelectedOptions);
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
          <span className="ml-2 font-medium text-left text-darkGray">체크박스</span>
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

      <div className="flex flex-col my-4 space-y-2">
        {question.choices?.map((choice) =>
          isViewPage ? (
            <Tooltip key={choice.choiceId} title="이 페이지에서는 선택할 수 없습니다." arrow>
              <div className="flex items-center justify-center w-[37.5rem]">
                <div
                  className={`relative flex items-center justify-center cursor-pointer w-full h-full px-10 py-2 ${getRoundedClass(buttonStyle)}`}
                  style={{
                    backgroundColor: `${color}`,
                  }}
                >
                  <label
                    htmlFor={`checkbox-${choice.choiceId}`}
                    className="absolute top-[0.625rem] left-[0.625rem] w-5 h-5 flex justify-center items-center rounded-md bg-white
                    border border-gray-300"
                  />
                  <span className="text-center text-base break-words">{choice.option}</span>
                </div>
              </div>
            </Tooltip>
          ) : (
            <div key={choice.choiceId} className="flex items-center justify-center w-[37.5rem]">
              <div
                className={`relative flex items-center justify-center cursor-pointer w-full h-full px-10 py-2 ${getRoundedClass(buttonStyle)}`}
                style={{
                  backgroundColor: selectedOptions.includes(choice.choiceId) ? `gray` : `${color}`,
                }}
                onClick={() => handleOptionSelect(choice.choiceId)}
              >
                <label
                  htmlFor={`checkbox-${choice.choiceId}`}
                  className={`absolute top-40% left-[0.625rem] w-5 h-5 flex justify-center items-center rounded-md ${
                    selectedOptions.includes(choice.choiceId) ? 'bg-blue-500' : 'bg-white'
                  } border border-gray-300`}
                >
                  <input
                    type="checkbox"
                    id={`checkbox-${choice.choiceId}`}
                    className="absolute opacity-0"
                    checked={selectedOptions.includes(choice.choiceId)}
                    onChange={() => handleOptionSelect(choice.choiceId)}
                  />
                  {selectedOptions.includes(choice.choiceId) && (
                    <img src={checkIcon} alt="Checked" className="w-4 h-4" />
                  )}
                </label>
                <span className="text-center text-base break-words">{choice.option}</span>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default ResponseCheckBox;
