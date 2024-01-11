import { useState } from 'react';
import typeIcon from '@/assets/type.svg';

interface Choice {
  choice_id: number;
  option: string;
}

interface Question {
  question_id: number;
  content: string;
  choices?: Choice[]; // choices가 선택적 속성임을 의미
  image_url: string;
}

interface ResponseDropDownProps {
  question: Question;
}

function ResponseDropDown({ question }: ResponseDropDownProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(Number(event.target.value));
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

      <div className="flex justify-center items-center w-full">
        <span className="text-[2rem] font-semibold text-center text-black -translate-y-4">
          Q{question.question_id}.
        </span>
      </div>

      <span className="max-w-[37.5rem] text-[1rem] mt-[0.5rem] mb-6 text-center text-black">{question.content}</span>

      {question.image_url && (
        <img
          src={question.image_url}
          alt="Question"
          className="rounded-[0.625rem] border-2 border-solid border-gray max-w-[45rem] max-h-[45rem]"
        />
      )}

      <div className="my-4">
        <select
          value={selectedOption ?? ''}
          onChange={handleOptionSelect}
          className="rounded-md border border-gray-300"
          style={{ width: '20rem', height: '2rem' }}
        >
          <option value="">선택...</option>
          {question.choices?.map((choice) => (
            <option key={choice.choice_id} value={choice.choice_id}>
              {choice.option}
            </option>
          ))}
        </select>
      </div>
      {selectedOption !== null && (
        <div className="mb-4">
          <p>You selected: {question.choices?.find((choice) => choice.choice_id === selectedOption)?.option}</p>
        </div>
      )}
    </div>
  );
}

export default ResponseDropDown;
