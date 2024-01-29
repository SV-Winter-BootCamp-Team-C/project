import React, { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { AddButton, TextButton } from '../components/common/Button';
import MultipleChoice from '../components/surveytype/MultipleChoice';
import Checkbox from '../components/surveytype/CheckBox';
import DropDown from '../components/surveytype/DropDown';
import Subjective from '../components/surveytype/Subjective';
import CreateQuestionMenu from '../components/createSurvey/CreateQuestionMenu';
import { createSurveyAPI } from '../api/survey';
import { useAuthStore } from '../store/AuthStore';
import { ButtonItem, FontItem, OptionItem } from '../types/create';
import {
  EditableObjectiveQuestion,
  EditableQuestions,
  EditableSubjectiveQuestion,
  EditableSurvey,
} from '../types/editableSurvey';
import { getRoundedClass } from '../utils/getRoundedClass';
import Alert from '../components/common/Alert';
import { useNavbarStore } from '../store/NavbarStore';
import deleteIcon from '../assets/delete.svg';
import privateIcon from '../assets/privateIcon.svg';
import publicIcon from '../assets/publicIcon.svg';
import insertImage from '../assets/insertImage.svg';
import { uploadS3 } from '../utils/s3ImgUpload';
import ImageSearchModal from '../components/common/ImageSearchModal';
import pexelIcon from '../assets/pexel.svg';
import { getClient } from '../queryClient';
import { responseformAPI } from '../api/responseform';
import { editSurveyAPI } from '../api/editSurvey';
import { formatDeadlineDate } from '../utils/formatDeadlineDate';
import ChatButton from '../components/common/ChatButton';
import ResultTypeSwitch from '../components/common/ResultTypeSwitch';
import { ApiResponseError } from '../types/apiResponseError';

const BUTTON_ITEMS: ButtonItem[] = [
  { id: 'angled', label: '각지게' },
  { id: 'smooth', label: '부드럽게' },
  { id: 'round', label: '둥글게' },
];

const COROL_ITEMS: string[][] = [
  ['#918DCA', '#A3C9F0', '#66C03B', '#E4E91D'],
  ['#8E8E8E', '#B4B4B4', '#E90D0D', '#FF9C06'],
];

const FONT_ITEMS: FontItem[] = [
  { id: 'pretendard', fontClass: 'font-pretendardFont', text: '프리텐다드' },
  { id: 'tmoney', fontClass: 'font-tMoney', text: '티머니 둥근바람' },
  { id: 'nps', fontClass: 'font-npsFont', text: '국민연금체' },
  { id: 'omyu', fontClass: 'font-omyuFont', text: '오뮤 다예쁨체' },
  { id: 'seolleim', fontClass: 'font-seolleimFont', text: '시원한 설레임체' },
];

const OPTION_ITEMS: OptionItem[] = [
  { id: 'public', icon: 'publicIcon', text: '공개' },
  { id: 'private', icon: 'privateIcon', text: '비공개' },
];

function Create() {
  const userId = useAuthStore((state) => state.userId);
  const activeItem = useNavbarStore((state) => state.activeItem);
  const queryClient = getClient;
  const navigate = useNavigate();
  const location = useLocation();
  const [activePage, setActivePage] = useState<'style' | 'problem'>('style');
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [customColor, setCustomColor] = useState<string>('#640FF2');
  const [mainImg, setMainImg] = useState<string | null>(null);
  const [addQuestionDropdown, setAddQuestionDropdown] = useState<boolean>(false);
  const [isImageSearchModalVisible, setImageSearchModalVisible] = useState(false);
  const [createErrorMessage, setCreateErrorMessage] = useState<string>();
  const [editErrorMessage, setEditErrorMessage] = useState<string>();

  // 설문 수정 시 사용할 설문 ID
  const editId = Number(new URLSearchParams(location.search).get('id'));
  const isEditMode = editId !== null && !Number.isNaN(editId) && location.pathname.includes('/edit'); // 편집 모드인지 확인

  const { data: editSurveyData } = useQuery({
    queryKey: ['editSurvey', editId],
    queryFn: () => responseformAPI(editId as number),
    enabled: isEditMode && !!editId,
  });

  const { mutate: editMutate, isSuccess: editSuccess } = useMutation({
    mutationFn: editSurveyAPI,
    onError: (error) => {
      const err = error as AxiosError<ApiResponseError>;
      setEditErrorMessage(err.response?.data.message || '설문 수정에 실패했습니다.');
    },
  });

  const [createSurvey, setCreateSurvey] = useState<EditableSurvey>({
    userId: userId as number,
    title: '',
    description: '',
    open: true,
    buttonStyle: 'angled',
    color: '#918DCA',
    font: 'pretendard',
    mainImageUrl: '',
    deadline: '',
    questions: [],
  });

  useEffect(() => {
    if (editSurveyData) {
      setCreateSurvey(editSurveyData);
    }
  }, [editSurveyData]);

  // 설문 생성
  const { mutate, isSuccess } = useMutation({
    mutationFn: createSurveyAPI,
    onSuccess: () => {
      if (createSurvey.open) {
        queryClient.invalidateQueries({ queryKey: ['allForm'] });
        queryClient.refetchQueries({ queryKey: ['allForm'] });
      }
      queryClient.invalidateQueries({ queryKey: ['myForm', userId] });
      queryClient.refetchQueries({ queryKey: ['myForm', userId] });
    },
    onError: (error) => {
      const err = error as AxiosError<ApiResponseError>;
      setCreateErrorMessage(err.response?.data.message || '설문 생성에 실패했습니다.');
    },
  });

  const handlePageClick = () => {
    setActivePage((prev) => (prev === 'style' ? 'problem' : 'style'));
  };

  const changeButtonStyle = (style: 'angled' | 'smooth' | 'round') => {
    setCreateSurvey({ ...createSurvey, buttonStyle: style });
  };

  const handleCustomColorChange = (selectedColor: { hex: string }) => {
    setCustomColor(selectedColor.hex);
    setCreateSurvey({ ...createSurvey, color: selectedColor.hex });
  };

  const toggleColorPicker = () => {
    setShowPicker(!showPicker);
  };

  const handleOptionClick = (optionId: string) => {
    const isOpen = optionId === 'public';
    setCreateSurvey({ ...createSurvey, open: isOpen });
  };

  const handleImageSearchClick = () => {
    setImageSearchModalVisible(true);
  };

  const handleSelectImage = (imageUrl: string) => {
    setMainImg(imageUrl);
    setCreateSurvey((prev) => ({ ...prev, mainImageUrl: imageUrl }));
    setImageSearchModalVisible(false); // 이미지 검색 모달을 닫음
  };

  const handleMainImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setMainImg(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // S3에 이미지 업로드
      try {
        const uploadedUrl = await uploadS3(file);
        setCreateSurvey((prev) => ({ ...prev, mainImageUrl: uploadedUrl }));
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
      }
    }
  };

  // 이미지 삭제
  const handleDeleteImage = () => {
    setMainImg(null);
  };

  const handleAddQuestion = () => {
    setAddQuestionDropdown((prev) => !prev);
  };

  const addQuestion = (type: 'MULTIPLE_CHOICE' | 'SUBJECTIVE_QUESTION' | 'CHECKBOX' | 'DROPDOWN') => {
    let newQuestion: EditableQuestions;
    if (type === 'SUBJECTIVE_QUESTION') {
      newQuestion = {
        type,
        content: '',
        imageUrl: '',
      };
    } else {
      newQuestion = {
        type,
        content: '',
        imageUrl: '',
        choices: [{ option: '' }],
      };
    }
    setCreateSurvey((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
    setAddQuestionDropdown(false);
  };

  const addChatQuestion = (chatData: EditableObjectiveQuestion) => {
    const newChatQuestion: EditableObjectiveQuestion = {
      type: chatData.type,
      content: chatData.content,
      imageUrl: chatData.imageUrl,
      choices: chatData.choices,
    };
    setCreateSurvey((prev) => ({
      ...prev,
      questions: [...prev.questions, newChatQuestion],
    }));
    setAddQuestionDropdown(false);
  };

  // 문항 내용 업데이트
  const updateQuestion = (questionId: number, updatedData: EditableQuestions) => {
    const updatedQuestions = createSurvey.questions.map((question, index) =>
      index === questionId ? { ...question, ...updatedData } : question,
    );
    setCreateSurvey({ ...createSurvey, questions: updatedQuestions });
  };

  // 문항 복제
  const copyQuestion = (index: number) => {
    const questionToCopy = JSON.parse(JSON.stringify(createSurvey.questions[index]));

    // 문항 목록에 복사된 문항 삽입
    const newQuestions = [
      ...createSurvey.questions.slice(0, index),
      questionToCopy,
      ...createSurvey.questions.slice(index),
    ];

    setCreateSurvey({ ...createSurvey, questions: newQuestions });
  };

  // 문항 삭제
  const deleteQuestion = (index: number) => {
    const newQuestions = createSurvey.questions.filter((_, i) => i !== index);
    setCreateSurvey({ ...createSurvey, questions: newQuestions });
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = async (
    idx: number,
    data: EditableQuestions,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    const { files } = event.target;
    if (files && files[0]) {
      const file = files[0];

      // S3에 이미지 업로드
      try {
        const uploadedUrl = await uploadS3(file);
        updateQuestion(idx, { ...data, imageUrl: uploadedUrl });
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
      }
    }
  };

  const renderQuestionComponent = (
    type: 'MULTIPLE_CHOICE' | 'SUBJECTIVE_QUESTION' | 'CHECKBOX' | 'DROPDOWN',
    idx: number,
    data: EditableQuestions,
  ) => {
    switch (type) {
      case 'MULTIPLE_CHOICE': // 객관식 문항
        return (
          <MultipleChoice
            idx={idx}
            data={data as EditableObjectiveQuestion}
            handleImageUpload={handleImageUpload}
            updateQuestion={updateQuestion}
            copyQuestion={copyQuestion}
            deleteQuestion={deleteQuestion}
          />
        );
      case 'CHECKBOX': // 체크박스 문항
        return (
          <Checkbox
            idx={idx}
            data={data as EditableObjectiveQuestion}
            handleImageUpload={handleImageUpload}
            updateQuestion={updateQuestion}
            copyQuestion={copyQuestion}
            deleteQuestion={deleteQuestion}
          />
        );
      case 'DROPDOWN': // 드롭다운 문항
        return (
          <DropDown
            idx={idx}
            data={data as EditableObjectiveQuestion}
            handleImageUpload={handleImageUpload}
            updateQuestion={updateQuestion}
            copyQuestion={copyQuestion}
            deleteQuestion={deleteQuestion}
          />
        );
      case 'SUBJECTIVE_QUESTION': // 주관식 문항
        return (
          <Subjective
            idx={idx}
            data={data as EditableSubjectiveQuestion}
            handleImageUpload={handleImageUpload}
            updateQuestion={updateQuestion}
            copyQuestion={copyQuestion}
            deleteQuestion={deleteQuestion}
          />
        );
      default:
        return null;
    }
  };

  // 설문 수정
  const handleEditSubmit = () => {
    if (userId === null) return;

    const surveyDataWithUserId = {
      ...createSurvey,
      userId,
    };

    editMutate({ surveyId: editId, editSurveyData: surveyDataWithUserId });
  };

  // 설문 생성
  const handleSubmit = () => {
    mutate(createSurvey);
  };

  return (
    <div className="pt-9">
      <div className="flex items-center justify-center">
        <ResultTypeSwitch
          switchType={['style', 'problem']}
          currentState={activePage}
          labels={['스타일', '문항']}
          onChange={handlePageClick}
        />
      </div>

      {/* 스타일 선택 */}
      {activePage === 'style' ? (
        <Scrollbars style={{ position: 'absolute', top: '7rem', right: '0.1rem', width: 1200, height: 750 }}>
          <div className="flex flex-col px-[6rem]">
            <div className="flex items-center">
              <div className="flex">
                <span className="text-[2rem] font-semibold">제목</span>
              </div>
              <div className="flex items-center w-[16.25rem] h-[3.125rem] rounded-[0.625rem] ml-[0.63rem] border-solid border-[0.00625rem] border-[#B4B4B4] hover:border-[0.125rem] hover:border-darkGray">
                <input
                  name="title"
                  type="text"
                  value={createSurvey.title}
                  onChange={(e) => setCreateSurvey({ ...createSurvey, title: e.target.value })}
                  required
                  placeholder="제목을 입력해주세요."
                  className="w-full h-[3.75rem] text-[1.25rem] text-black pl-[0.63rem] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col mt-[2.63rem]">
              <div className="flex w-[7.625rem] h-[2.0315rem] items-center">
                <span className="text-[2rem] font-semibold">설명</span>
              </div>
              <div className="flex items-start justify-center w-[25rem] h-[6.25rem] rounded-[0.625rem] mt-[1.22rem] border-solid border-[0.00625rem] border-[#B4B4B4] hover:border-[0.125rem] hover:border-darkGray">
                <textarea
                  name="description"
                  value={createSurvey.description}
                  onChange={(e) => setCreateSurvey({ ...createSurvey, description: e.target.value })}
                  required
                  placeholder="내용을 입력해주세요."
                  className="flex w-[24rem] h-[6rem] text-[1.25rem] rounded-[0.625rem] text-black px-1 py-[0.63rem] border-none resize-none focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col mt-[2.63rem]">
              <div className="flex w-[5.625rem] h-[2.0315rem] mb-[1.01rem]">
                <span className="text-[2rem] font-semibold">버튼</span>
              </div>
              <div className="flex flex-row gap-3">
                {BUTTON_ITEMS.map((item) => (
                  <div key={item.id} className="flex flex-col items-center" onClick={() => changeButtonStyle(item.id)}>
                    <div
                      className={`flex justify-center items-center w-[10.5rem] h-[5.5rem] rounded-[1.5rem] border-solid border-[0.188rem] ${
                        createSurvey.buttonStyle === item.id ? `border-purple` : 'border-white'
                      }`}
                    >
                      <div className="flex justify-center items-center w-40 h-20 rounded-[1.25rem] border-solid border-[0.06rem] gap-2 border-[#B4B4B4]">
                        <div
                          className={`flex flex-shrink-0 w-[6.25rem] h-[1.875rem] bg-[#918DCA] ${getRoundedClass(
                            item.id,
                          )}`}
                        />
                      </div>
                    </div>
                    <div className="flex w-[4rem] h-5 justify-center items-center mt-[0.63rem]">
                      <span
                        className={`text-[1rem] font-medium ${
                          createSurvey.buttonStyle === item.id ? 'text-black' : 'text-[#B4B4B4]'
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col mt-[2.63rem]">
              <div className="flex w-[5.625rem] h-[2.0315rem] mb-[1.01rem]">
                <span className="text-[2rem] font-semibold">테마</span>
              </div>
              <div className="flex flex-row items-start">
                <div className="flex flex-col w-[9.75rem] h-[4.5rem] ">
                  <div className="flex flex-shrink-0 flex-row items-center w-[9.75rem] h-[1.875rem] gap-3">
                    {COROL_ITEMS[0].map((item) => {
                      return (
                        <button
                          key={item}
                          aria-label={`Select color ${item}`}
                          type="button"
                          className={`w-8 h-8 rounded-full ${
                            createSurvey.color === item ? 'ring-2 ring-offset-2 ring-purple' : ''
                          }}`}
                          style={{ backgroundColor: item }}
                          onClick={() => setCreateSurvey({ ...createSurvey, color: item })}
                        />
                      );
                    })}
                  </div>
                  <div className="flex flex-shrink-0 flex-row items-center w-[9.75rem] h-[1.875rem] mt-3 gap-3">
                    {COROL_ITEMS[1].map((item) => {
                      return (
                        <button
                          key={item}
                          aria-label={`Select color ${item}`}
                          type="button"
                          className={`w-8 h-8 rounded-full ${
                            createSurvey.color === item ? 'ring-2 ring-offset-2 ring-purple' : ''
                          }}`}
                          style={{ backgroundColor: item }}
                          onClick={() => setCreateSurvey({ ...createSurvey, color: item })}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* 커스텀 컬러 선택 */}
                {/* TODO: 투명도 변경 X */}
                <div
                  className={`relative flex w-10 h-10 rounded-[0.625rem] cursor-pointer items-center mt-4 ml-[1.56rem] ${
                    createSurvey.color === customColor ? 'ring-2 ring-offset-2 ring-purple' : ''
                  }`}
                  style={{ backgroundColor: customColor }}
                  onClick={toggleColorPicker}
                />
                <div className="absolute bottom-[5%] left-1/4 z-10 flex flex-row place-items-start mt-4 ml-4">
                  {showPicker && <SketchPicker color={customColor} onChange={handleCustomColorChange} />}
                </div>
              </div>
            </div>

            <div className="flex flex-col mt-[2.63rem]">
              <div className="flex w-[5.625rem] h-[2.0315rem] mb-[1.01rem]">
                <span className="text-[2rem] font-semibold">글꼴</span>
              </div>
              <div className="flex flex-row items-center gap-3">
                {FONT_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => setCreateSurvey({ ...createSurvey, font: item.id })}
                  >
                    <div
                      className={`flex justify-center items-center w-[10.5rem] h-[5.5rem] rounded-[1.5rem] border-solid border-[0.188rem] ${
                        createSurvey.font === item.id ? 'border-purple' : 'border-white'
                      }`}
                    >
                      <div className="flex justify-center items-center w-40 h-20 rounded-[1.25rem] border-solid border-[0.06rem] border-[#B4B4B4]">
                        <span className={`text-xl ${item.fontClass}`}>{item.text}</span>
                      </div>
                    </div>
                    <div className="flex w-[7.875rem] h-4 justify-center items-center mt-[0.63rem]">
                      <span
                        className={`text-[1rem] font-medium ${item.fontClass} ${
                          createSurvey.font === item.id ? 'text-black' : 'text-[#B4B4B4]'
                        }`}
                      >
                        {item.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 이미지 업로드 */}
            <div className="flex flex-col mt-[2.63rem]">
              <div className="flex flex-row items-end  w-[20rem] h-[2.0315rem] gap-x-4 mb-[1.01rem]">
                <span className="text-[2rem] font-semibold">커버 이미지</span>
                <button
                  type="button"
                  className="flex items-center justify-start focus:outline-none "
                  onClick={handleImageSearchClick}
                >
                  <img src={pexelIcon} alt="pexel" className="flex w-8 h-8 ml-6" />
                </button>
                {isImageSearchModalVisible && (
                  <ImageSearchModal
                    isVisible={isImageSearchModalVisible}
                    onClose={() => setImageSearchModalVisible(false)}
                    onSelectImage={handleSelectImage}
                  />
                )}
              </div>
              {mainImg && ( // mainImg 상태가 있을 때만 삭제 버튼을 표시
                <button
                  type="button"
                  className="flex items-start justify-start w-6 h-6 focus:outline-none"
                  onClick={handleDeleteImage} // 이미지 삭제
                >
                  <img src={deleteIcon} alt="Delete" className="w-full h-full rounded-[0.625rem]" />
                </button>
              )}
              <div
                className="flex justify-center items-center w-[21.5rem] h-[12.5rem] cursor-pointer border-dashed border-[0.06rem] border-[#b4b4b4]"
                onClick={() => document.getElementById('imageInput')?.click()}
              >
                {mainImg ? (
                  <img src={mainImg} alt="Uploaded Cover" className="w-full h-full" />
                ) : (
                  <img src={insertImage} alt="insertImage" className="w-full h-full" />
                )}
                <input
                  id="imageInput"
                  type="file"
                  onChange={handleMainImageChange}
                  style={{ display: 'none' }}
                  accept="image/jpg, image/png, image/jpeg"
                />
              </div>
            </div>

            {/* 마감일 설정 */}
            <div className="flex flex-row items-center mt-[2.63rem]">
              <div className="flex w-[6rem] h-[2.0315rem]  ">
                <span className="text-[2rem] font-semibold">마감일</span>
              </div>
              <div className="flex w-[10rem] h-[3.125rem] justify-center ml-5 rounded-[0.625rem] border-solid border-[0.06rem] border-[#b4b4b4]">
                <input
                  name="date"
                  type="date"
                  value={formatDeadlineDate(createSurvey.deadline)}
                  onChange={(e) => setCreateSurvey({ ...createSurvey, deadline: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="flex flex-row mt-[2.63rem] mb-[2.38rem]">
              <div className="flex flex-col">
                <div className="flex w-[14rem] h-[2.0315rem] mb-[1.01rem]">
                  <span className="text-[2rem] font-semibold">설문 공개 여부</span>
                </div>
                <div className="flex flex-row items-center gap-3">
                  {OPTION_ITEMS.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col items-center cursor-pointer"
                      onClick={() => handleOptionClick(item.id)}
                    >
                      <div
                        className={`flex justify-center items-center w-[10.5rem] h-[5.5rem] rounded-[1.5rem] border-solid border-[0.188rem] ${
                          (createSurvey.open && item.id === 'public') || (!createSurvey.open && item.id === 'private')
                            ? 'border-[#918DCA]'
                            : 'border-white'
                        }`}
                      >
                        <div className="flex flex-col justify-center items-center w-40 h-20 rounded-[1.25rem] border-solid border-[0.06rem] border-[#B4B4B4]">
                          <img
                            src={item.id === 'public' ? publicIcon : privateIcon}
                            alt={`${item.id}Icon`}
                            className="mb-2"
                          />
                          <span
                            className={`text-base font-normal ${
                              (createSurvey.open && item.id === 'public') ||
                              (!createSurvey.open && item.id === 'private')
                                ? 'text-black'
                                : 'text-[#b4b4b4]'
                            }`}
                          >
                            {item.text}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-col ml-10 tracking-widest font-normal text-[1rem] text-[#8E8E8E]">
                    <span className="mb-1">공개: 누구나 설문에 참여 가능하고, 설문 데이터 열람이 가능합니다.</span>
                    <span>비공개: 링크를 통해서만 참여 가능하고, 설문 데이터 열람이 불가능합니다.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Scrollbars>
      ) : (
        // 문제 생성
        <div className="relative flex items-center justify-between px-52">
          <div className="flex items-center justify-center gap-6 mt-6">
            <p className="text-[2rem] font-semibold text-black">문항</p>
            <AddButton text="추가" onClick={handleAddQuestion} />
            {addQuestionDropdown && (
              <CreateQuestionMenu
                onSelect={addQuestion}
                isOpen={addQuestionDropdown}
                onClose={() => setAddQuestionDropdown(false)} // onClose prop을 추가합니다.
              />
            )}
          </div>
          <div className="absolute right-52 top-[1.375rem] z-50">
            <ChatButton title={createSurvey.title} description={createSurvey.description} onAddData={addChatQuestion} />
          </div>
          <Scrollbars style={{ position: 'absolute', top: '5rem', right: '0.1rem', width: 1200, height: 660 }}>
            <div className="flex flex-col items-center justify-center pt-4">
              {createSurvey.questions.length === 0 ? (
                <p className="text-gray">설문 문항을 등록하세요.</p>
              ) : (
                createSurvey.questions.map((item, index) => {
                  return (
                    <div key={index} className="pb-6">
                      {renderQuestionComponent(item.type, index, createSurvey.questions[index])}
                    </div>
                  );
                })
              )}
            </div>
          </Scrollbars>

          {createErrorMessage && (
            <Alert
              type="error"
              message="설문 생성에 실패했습니다."
              buttonText="확인"
              buttonClick={() => setCreateErrorMessage('')}
            />
          )}
          {isSuccess && (
            <Alert
              type="success"
              message="설문이 생성되었습니다."
              buttonText="확인"
              buttonClick={() => navigate(activeItem === 'all' ? '/all' : '/myform')}
            />
          )}
          {editErrorMessage && (
            <Alert
              type="error"
              message="설문 수정에 실패했습니다."
              buttonText="확인"
              buttonClick={() => setEditErrorMessage('')}
            />
          )}
          {editSuccess && (
            <Alert
              type="success"
              message="설문이 수정되었습니다."
              buttonText="확인"
              buttonClick={() => navigate('/myform')}
            />
          )}
        </div>
      )}
      {activePage === 'problem' && createSurvey.questions.length > 0 && (
        <div className="absolute flex items-end justify-center left-[55%] bottom-4">
          {isEditMode ? (
            <TextButton text="수정하기" onClick={handleEditSubmit} />
          ) : (
            <TextButton text="저장하기" onClick={handleSubmit} />
          )}
        </div>
      )}
    </div>
  );
}

export default Create;
