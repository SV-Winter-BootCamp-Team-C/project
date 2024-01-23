import { useState } from 'react';
import chat from '../../assets/chat.svg';
import search from '../../assets/search.svg';
import plus from '../../assets/plus.svg';
import dropIcon from '../../assets/drop.svg';
import { EditableObjectiveQuestion } from '../../types/editableSurvey';

interface ChatButtonProps {
  onAddData: (chatData: EditableObjectiveQuestion) => void; // Data 타입을 사용
}

function ChatButton({ onAddData }: ChatButtonProps) {
  const [isInputVisible, setInputVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<'MULTIPLE_CHOICE' | 'CHECKBOX' | 'DROPDOWN' | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState<EditableObjectiveQuestion | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const testChoices = [{ option: '사탕1' }, { option: '사탕2' }, { option: '사탕3' }];

  const toggleInput = () => {
    setInputVisible(!isInputVisible);
    setSelectedType(null);

    if (isInputVisible) {
      setData(null);
      setInputValue('');
      setErrorMessage('');
    }
  };

  const handleTypeSelect = (type: 'MULTIPLE_CHOICE' | 'CHECKBOX' | 'DROPDOWN') => {
    setSelectedType(type);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedType) {
      const chatData: EditableObjectiveQuestion = {
        type: selectedType,
        content: inputValue,
        imageUrl: '',
        choices: testChoices,
      };
      setData(chatData);
    }
  };

  const handleSearch = () => {
    setErrorMessage('');
    if (!inputValue.trim()) {
      // 입력값이 없는 경우에만 에러 메시지를 설정합니다.
      setErrorMessage('질문을 입력해 주세요.');
      return;
    }
    handleSubmit();
  };

  const handleAddClick = () => {
    if (data) {
      onAddData(data);
      setData(null);
      setInputValue('');
      setSelectedType(null);
      setInputVisible(!isInputVisible);
    }
  };

  return (
    <div className="flex flex-col items-end">
      <button
        type="button"
        onClick={toggleInput}
        className="w-10 h-10 rounded-full bg-green flex items-center justify-center"
      >
        <img src={chat} alt="chat" className="w-6 h-6" />
      </button>

      {isInputVisible && (
        <div className="flex flex-col bg-white border-2 border-solid border-green rounded-3xl p-4 my-2 shadow-lg min-w-[10rem] max-w-full">
          {!selectedType ? (
            <div className="flex justify-around flex-wrap">
              <button
                type="button"
                onClick={() => handleTypeSelect('MULTIPLE_CHOICE')}
                className="bg-white border border-solid border-darkGray px-4 py-2 mx-2 rounded-xl hover:border-2 hover:border-green"
              >
                객관식
              </button>
              <button
                type="button"
                onClick={() => handleTypeSelect('CHECKBOX')}
                className="bg-white border border-solid border-darkGray px-4 py-2 mx-2 rounded-xl hover:border-2 hover:border-green"
              >
                체크박스
              </button>
              <button
                type="button"
                onClick={() => handleTypeSelect('DROPDOWN')}
                className="bg-white border border-solid border-darkGray px-4 py-2 mx-2 rounded-xl hover:border-2 hover:border-green"
              >
                드롭다운
              </button>
            </div>
          ) : (
            <div className="flex justify-end">
              <div className="flex flex-rows items-center">
                <input
                  type="text"
                  placeholder={`질문을 입력해주세요. (${selectedType})`}
                  value={inputValue}
                  onChange={handleInputChange}
                  className="block w-[24rem] h-10 bg-white border border-solid border-darkGray focus:outline-none rounded-xl px-2"
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  className="flex items-center justify-center bg-white w-8 h-10 ml-2 rounded-xl"
                >
                  <img src={search} alt="search" className="w-5 h-5" />
                </button>
              </div>
              {errorMessage && <p className="pt-1 text-xs text-red-500">{errorMessage}</p>}
            </div>
          )}
          {data && (
            <div className="mt-4 p-4 bg-white shadow rounded-xl flex flex-col items-center border border-solid border-green">
              <div className="flex items-center justify-center border border-solid border-darkGray rounded-xl w-full max-w-[45rem] h-10 mb-2 mx-2">
                <p className="text-center text-[1rem]">{data.content}</p>
              </div>
              {selectedType === 'MULTIPLE_CHOICE' &&
                data.choices.map((choice, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center bg-lightGray rounded-xl mt-2 mx-2 w-full max-w-[45rem] h-10"
                  >
                    <p>{choice.option}</p>
                  </div>
                ))}
              {selectedType === 'CHECKBOX' &&
                data.choices.map((choice, index) => (
                  <div
                    key={index}
                    className="relative flex items-center justify-center bg-lightGray rounded-xl mt-2 mx-2 w-full max-w-[45rem] h-10"
                  >
                    <div className="absolute top-[0.625rem] left-[0.625rem] w-5 h-5 flex justify-center items-center rounded-md  bg-white" />
                    <p>{choice.option}</p>
                  </div>
                ))}

              {selectedType === 'DROPDOWN' && data && (
                <div className="flex flex-col items-center justify-center w-full max-w-[45rem]">
                  <div className="relative flex items-center w-full h-8 border bg-lightGray rounded-t-[0.625rem] border-solid border-gray">
                    <p className="ml-2 text-darkGray">드롭다운 선택지</p>
                    <div className="absolute flex justify-center items-center w-[1.25rem] h-[1.25rem] bg-ligthGray top-[0.375rem] right-[0.625rem]">
                      <img src={dropIcon} alt="Drop" className="w-[0.75rem] h-[0.5rem]" />
                    </div>
                  </div>
                  {data.choices.map((choice, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center text-center mx-2 w-full h-8 border border-solid border-gray"
                    >
                      <p>{choice.option}</p>
                    </div>
                  ))}
                  <div className="w-full h-8 border rounded-b-[0.625rem] border-solid border-gray" />
                </div>
              )}
              <div className="flex items-center justify-center w-full mt-4">
                <button
                  type="button"
                  className="w-[6.25rem] h-9 bg-green rounded-[0.625rem] text-white focus:outline-none hover:bg-darkGreen transition duration-300 ease-in-out"
                  onClick={handleAddClick}
                >
                  <div className="flex items-center justify-center gap-2">
                    <img src={plus} alt="plus" className="w-4 h-4 my-auto" />
                    <p className="text-base leading-4">추가</p>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ChatButton;
