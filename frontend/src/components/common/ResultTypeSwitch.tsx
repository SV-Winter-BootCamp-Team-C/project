interface ResultTypeSwitchProps {
  curretState: 'answer' | 'question';
  onChange: () => void;
}

function ResultTypeSwitch({ curretState, onChange }: ResultTypeSwitchProps) {
  return (
    <div
      onClick={onChange}
      className="relative w-[11.125rem] h-[2.625rem] flex items-center bg-darkPurple rounded-[1.875rem] p-1 cursor-pointer"
    >
      <div
        className={`w-[5.25rem] h-[2.125rem] rounded-[1.875rem] bg-white shadow-md transform duration-300 ease-in-out 
                   ${curretState === 'answer' ? 'translate-x-[5.375rem]' : 'translate-x-0'}`}
      />
      <p
        className={`absolute leading-4 left-[1.375rem] text-base ${
          curretState === 'question' ? 'text-black' : 'text-white'
        }`}
      >
        질문별
      </p>
      <p
        className={`absolute leading-4 right-[1.375rem] text-base ${
          curretState === 'answer' ? 'text-black' : 'text-white'
        }`}
      >
        응답별
      </p>
    </div>
  );
}

export default ResultTypeSwitch;
