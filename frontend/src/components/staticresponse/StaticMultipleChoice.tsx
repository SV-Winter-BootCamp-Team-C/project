import typeIcon from '../../assets/type.svg';
import { ExtendedQuestionData } from '../../types/questionData';
import { getRoundedClass } from '../../utils/getRoundedClass';

interface StiticMultipleChoiceProps {
  question: ExtendedQuestionData;
  color: string;
  buttonStyle: 'angled' | 'smooth' | 'round';
  index: number;
}

function StiticMultipleChoice({ question, color, buttonStyle, index }: StiticMultipleChoiceProps) {
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

      <span className="max-w-[37.5rem] text-[1rem] mt-[0.5rem] mb-6 text-center text-black">{question.content}</span>

      {question.imageUrl && (
        <img
          src={question.imageUrl}
          alt="Question"
          className="rounded-[0.625rem] max-w-[30rem] max-h-[36rem]"
          style={{ border: `0.125rem solid ${color}` }}
        />
      )}

      <div className="flex flex-col my-4 space-y-2 choices-container ">
        {question.choices?.map((choice) => (
          <button
            type="button"
            key={choice.choiceId}
            className={`w-[25rem] h-[2.5rem] choice-item p-2 ${getRoundedClass(buttonStyle)}`}
            style={{
              backgroundColor: (question.objContent ?? []).includes(choice.choiceId) ? 'gray' : `${color}`,
              border: (question.objContent ?? []).includes(choice.choiceId) ? '0.125rem solid' : 'none',
            }}
          >
            {choice.option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default StiticMultipleChoice;
