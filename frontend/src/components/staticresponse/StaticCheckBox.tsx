import typeIcon from '../../assets/type.svg';
import checkIcon from '../../assets/check.svg';
import { ExtendedQuestionData } from '../../types/questionData';
import { getRoundedClass } from '../../utils/getRoundedClass';

interface StaticCheckBoxProps {
  question: ExtendedQuestionData;
  color: string;
  buttonStyle: 'angled' | 'smooth' | 'round';
  index: number;
}

function StaticCheckBox({ question, color, buttonStyle, index }: StaticCheckBoxProps) {
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
        {question.choices?.map((choice) => (
          <div key={choice.choiceId} className="relative flex items-center justify-center w-[37.5rem]">
            <div
              className={`flex justify-center items-center w-full h-full px-10 py-2 ${getRoundedClass(buttonStyle)}`}
              style={{
                backgroundColor: (question.objContent ?? []).includes(choice.choiceId) ? 'gray' : `${color}`,
                border: (question.objContent ?? []).includes(choice.choiceId) ? '0.125rem solid' : 'none',
              }}
            >
              <label
                htmlFor={`checkbox-${choice.choiceId}`}
                className={`absolute top-40% left-[0.625rem] w-5 h-5 flex justify-center items-center rounded-md ${
                  (question.objContent ?? []).includes(choice.choiceId) ? 'bg-blue-500' : 'bg-white'
                } `}
              >
                <input
                  type="checkbox"
                  id={`checkbox-${choice.choiceId}`}
                  className="absolute opacity-0"
                  checked={(question.objContent ?? []).includes(choice.choiceId)}
                />
                {(question.objContent ?? []).includes(choice.choiceId) && (
                  <img src={checkIcon} alt="Checked" className="w-4 h-4" />
                )}
              </label>
              <span className="text-center text-base break-words">{choice.option}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StaticCheckBox;
