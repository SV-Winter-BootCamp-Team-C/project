import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import chat from '../../assets/chat.svg';
import search from '../../assets/search.svg';
import plus from '../../assets/plus.svg';
import dropIcon from '../../assets/drop.svg';
import { EditableObjectiveQuestion } from '../../types/editableSurvey';
import { GptRequest, GptResponse } from '../../types/gptData';
import { addGptResponseAPI } from '../../api/addGptResponse';
import Loading from './Loading';
import Alert from './Alert';

interface ChatButtonProps {
  title: string;
  description: string;
  onAddData: (chatData: EditableObjectiveQuestion) => void; // Data 타입을 사용
}

type QuestionType = 'MULTIPLE_CHOICE' | 'CHECKBOX' | 'DROPDOWN';

const SELECTED_TYPE: { type: QuestionType; label: string }[] = [
  { type: 'MULTIPLE_CHOICE', label: '객관식' },
  { type: 'CHECKBOX', label: '체크박스' },
  { type: 'DROPDOWN', label: '드롭다운' },
];

function ChatButton({ title, description, onAddData }: ChatButtonProps) {
  const [isInputVisible, setInputVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [gptRequest, setGptRequest] = useState<GptRequest>({
    title,
    description,
    content: '',
    type: null,
  });

  const { data, isError, isLoading, refetch } = useQuery<GptResponse, AxiosError>({
    queryKey: ['gptResponse', gptRequest.content],
    queryFn: () => addGptResponseAPI(gptRequest),
    enabled: false,
    retry: 10,
  });

  const toggleInput = () => {
    setInputVisible(!isInputVisible);
    setGptRequest({ ...gptRequest, type: null });

    if (isInputVisible) {
      setErrorMessage('');
    }
  };

  const handleTypeSelect = (type: QuestionType) => {
    setGptRequest({ ...gptRequest, type });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGptRequest({ ...gptRequest, content: event.target.value });
  };

  // gpt 요청
  const handleSubmitGptResponse = (e: React.FormEvent) => {
    e.preventDefault();
    // 입력값이 없는 경우
    if (gptRequest.content === '') {
      setErrorMessage('질문을 입력해 주세요.');
      return;
    }
    setErrorMessage('');
    refetch();
  };

  // 생성된 내용 사용하기
  const handleAddClick = () => {
    if (data) {
      onAddData({
        type: gptRequest.type as QuestionType,
        content: data.content,
        imageUrl: '',
        choices: data.choices,
      });
      setGptRequest({ ...gptRequest, content: '', type: null });
      setInputVisible(!isInputVisible);
    }
  };

  return (
    <div className="flex flex-col items-end">
      <button
        type="button"
        onClick={toggleInput}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-green"
      >
        <img src={chat} alt="chat" className="w-6 h-6" />
      </button>

      {isInputVisible && (
        <div className="flex flex-col bg-white border-2 border-solid border-green rounded-3xl p-4 my-2 shadow-lg min-w-[10rem] max-w-full">
          {gptRequest.type === null ? (
            <div className="flex flex-wrap justify-around">
              {SELECTED_TYPE.map(({ type, label }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleTypeSelect(type)}
                  className="px-4 py-2 mx-2 bg-white border border-solid border-darkGray rounded-xl hover:border-2 hover:border-green"
                >
                  {label}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-start">
              <div className="flex items-center justify-center ">
                <form onSubmit={handleSubmitGptResponse} className="flex items-center">
                  <input
                    type="text"
                    placeholder={`질문을 입력해주세요. (${gptRequest.type})`}
                    value={gptRequest.content}
                    onChange={handleInputChange}
                    className="block w-[24rem] h-10 bg-white border border-solid border-darkGray focus:outline-none rounded-xl px-2"
                  />
                  <button type="submit" className="flex items-center justify-center w-8 h-10 ml-2 bg-white rounded-xl">
                    <img src={search} alt="search" className="w-5 h-5" />
                  </button>
                </form>
              </div>
              {errorMessage && !gptRequest.content && <p className="pt-2 pl-1 text-xs text-red-500">{errorMessage}</p>}
            </div>
          )}

          {isLoading ? <Loading /> : ''}

          {data && (
            <div className="flex flex-col items-center p-4 mt-4 bg-white border border-solid shadow rounded-xl border-green">
              <div className="flex items-center justify-center border border-solid border-darkGray rounded-xl w-full max-w-[45rem] h-10 mb-2 mx-2">
                <p className="text-center text-[1rem]">{data.content}</p>
              </div>
              {gptRequest.type === 'MULTIPLE_CHOICE' &&
                data.choices.map((choice, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center bg-lightGray rounded-xl mt-2 mx-2 w-full max-w-[45rem] h-10"
                  >
                    <p>{choice.option}</p>
                  </div>
                ))}
              {gptRequest.type === 'CHECKBOX' &&
                data.choices.map((choice, index) => (
                  <div
                    key={index}
                    className="relative flex items-center justify-center bg-lightGray rounded-xl mt-2 mx-2 w-full max-w-[45rem] h-10"
                  >
                    <div className="absolute top-[0.625rem] left-[0.625rem] w-5 h-5 flex justify-center items-center rounded-md  bg-white" />
                    <p>{choice.option}</p>
                  </div>
                ))}

              {gptRequest.type === 'DROPDOWN' && data && (
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
                      className="flex items-center justify-center w-full h-8 mx-2 text-center border border-solid border-gray"
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
          {isError && <Alert type="error" message="요청에 실패했습니다." buttonText="확인" />}
        </div>
      )}
    </div>
  );
}

export default ChatButton;
