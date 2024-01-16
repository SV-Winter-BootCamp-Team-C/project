import { useQuery, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import Alert from '@/components/common/Alert';
import { Scrollbars } from 'react-custom-scrollbars-2';
import ResponseMultipleChoice from '@/components/responsetype/ResponseMultipleChoice';
import ResponseSubjective from '@/components/responsetype/ResponseSubjective';
import ResponseCheckBox from '@/components/responsetype/ResponseCheckBox';
import ResponseDropDown from '@/components/responsetype/ResponseDropDown';
import { TextButton } from '@/components/common/Button';
import { QuestionDataForm, ResponseSubmit } from '@/types/questionData';
import { responseformAPI, responseSubmitAPI } from '@/api/responseform';
import { useAuthStore } from '@/store/AuthStore';
import Loading from '@/components/common/Loading';

function ResponseForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const surveyId = id ? parseInt(id, 10) : 0; // id가 없는 경우 0으로 초기화;
  const myId = useAuthStore((state) => state.userId);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [responseSubmit, setResponseSubmit] = useState<ResponseSubmit>({
    userId: 0,
    questions: [],
  });

  const {
    data: surveyData,
    isLoading,
    isError,
  } = useQuery<QuestionDataForm, AxiosError>({
    queryKey: ['surveyData', surveyId],
    queryFn: () => responseformAPI(surveyId),
  });

  useEffect(() => {
    if (surveyData) {
      const initialQuestions = surveyData.questions.map((question) => ({
        questionId: question.questionId,
        objContent: [],
        subContent: '',
      }));
      setResponseSubmit((prevState) => ({
        ...prevState,
        questions: initialQuestions,
      }));
    }
  }, [surveyData]);

  const mutationOptions: UseMutationOptions<ResponseSubmit, Error, ResponseSubmit> = {
    mutationFn: (newResponseSubmit) => responseSubmitAPI(surveyId, newResponseSubmit),
    onSuccess: () => setShowSuccess(true),
    onError: () => {
      setShowError(true);
    },
  };

  // useMutation을 사용하여 mutation 함수 생성
  const mutation = useMutation(mutationOptions);

  const handleSubmit = async () => {
    const isEveryQuestionAnswered = responseSubmit.questions.every((question) => {
      const hasObjContent = Array.isArray(question.objContent) && question.objContent.length > 0;
      const hasSubContent = question.subContent && question.subContent.trim() !== '';
      return hasObjContent || hasSubContent;
    });

    if (isEveryQuestionAnswered) {
      // 모든 질문이 적절히 답변되었을 경우
      await mutation.mutateAsync(responseSubmit);
      console.log(responseSubmit);
    } else {
      // 하나라도 답변되지 않은 질문이 있을 경우
      setShowError(true);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !surveyData) {
    return (
      <Alert
        type="error"
        message="설문지를 불러오지 못하였습니다."
        buttonText="확인"
        buttonClick={() => navigate('/all')}
      />
    );
  }

  if (showSuccess) {
    return (
      <Alert type="success" message="제출에 성공하였습니다." buttonText="확인" buttonClick={() => navigate('/all')} />
    );
  }

  if (showError) {
    return (
      <Alert
        type="error"
        message="제출에 실패하였습니다. 다시 시도해주세요."
        buttonText="확인"
        buttonClick={() => window.location.reload()}
      />
    );
  }

  // 객관식, 드롭다운 응답 시 데이터 저장
  const handleOptionSelect = (choiceId: number, questionId: number) => {
    const updatedQuestions = responseSubmit.questions.map((question) => {
      if (question.questionId === questionId) {
        return { ...question, objContent: [choiceId] };
      }
      return question;
    });
    setResponseSubmit({
      userId: myId ?? 0,
      questions: updatedQuestions,
    });
  };

  // CheckBox 응답 시 데이터 저장
  const handleCheckBoxSelect = (newSelectedOptions: number[], questionId: number) => {
    const updatedQuestions = responseSubmit.questions.map((question) => {
      if (question.questionId === questionId) {
        return { ...question, objContent: newSelectedOptions };
      }
      return question;
    });
    setResponseSubmit({
      userId: myId ?? 0,
      questions: updatedQuestions,
    });
  };

  // 주관식 응답 시 데이터 저장
  const handleSubChange = (userResponse: string, questionId: number) => {
    const updatedQuestions = responseSubmit.questions.map((question) => {
      if (question.questionId === questionId) {
        return { ...question, subContent: userResponse }; // subContent를 업데이트
      }
      return question;
    });
    setResponseSubmit({
      userId: myId ?? 0,
      questions: updatedQuestions,
    });
  };

  return (
    <div
      className="relative flex mt-[2.25rem] ml-[0.1rem]"
      style={{
        fontFamily: `${surveyData.font}`,
      }}
    >
      <Scrollbars style={{ position: 'absolute', right: '0.1rem', width: 1080, height: 820 }}>
        <div className="flex flex-col px-[8.75rem]">
          {surveyData.mainImageUrl && (
            <img
              src={surveyData.mainImageUrl}
              alt="Preview"
              className="rounded-[1.25rem] max-w-[50rem] my-6"
              style={{
                boxShadow: `0 0 0.25rem 0.25rem ${surveyData.color}40`,
              }}
            />
          )}
          <div
            className="flex flex-col mb-6 rounded-[1.25rem] bg-white"
            style={{ boxShadow: `0 0 0.25rem 0.25rem ${surveyData.color}40` }}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-[50rem] h-4 rounded-t-[1.25rem]" style={{ background: `${surveyData.color}` }} />
              <h1 className="text-[2rem] font-semibold text-center text-black mt-4">{surveyData.title}</h1>
            </div>
            <div className="flex flex-col mb-6">
              <h2 className="text-[1rem] test-start text-black ml-8 mb-6 mt-6">{surveyData.description}</h2>
              <div className="text-[1rem] test-start text-darkGray ml-8 whitespace-pre-line">
                생성자 : {surveyData.userName}
                <br />
                생성일 : {surveyData.createdAt}
                <br />
                마감일 : {surveyData.deadline}
              </div>
            </div>
          </div>

          {surveyData.questions.map((question, index) => {
            switch (question.type) {
              case 'MULTIPLE_CHOICE':
                return (
                  <div className="mb-6">
                    <ResponseMultipleChoice
                      key={question.questionId}
                      index={index + 1}
                      question={question} // Question 객체 전체를 question prop으로 전달
                      color={surveyData.color}
                      buttonStyle={surveyData.buttonStyle}
                      onOptionSelect={(choiceId) => handleOptionSelect(choiceId, question.questionId)}
                    />
                  </div>
                );
              case 'SUBJECTIVE_QUESTION':
                return (
                  <div className="mb-6">
                    <ResponseSubjective
                      key={question.questionId}
                      index={index + 1}
                      question={question}
                      color={surveyData.color}
                      onSubChange={(response) => handleSubChange(response, question.questionId)}
                    />
                  </div>
                );
              case 'CHECKBOX':
                return (
                  <div className="mb-6">
                    <ResponseCheckBox
                      key={question.questionId}
                      index={index + 1}
                      question={question}
                      color={surveyData.color}
                      buttonStyle={surveyData.buttonStyle}
                      onOptionSelect={(newSelectedOptions) =>
                        handleCheckBoxSelect(newSelectedOptions, question.questionId)
                      }
                    />
                  </div>
                );
              case 'DROPDOWN':
                return (
                  <div className="mb-6">
                    <ResponseDropDown
                      key={question.questionId}
                      index={index + 1}
                      question={question}
                      color={surveyData.color}
                      onOptionSelect={(choiceId) => handleOptionSelect(choiceId, question.questionId)}
                    />
                  </div>
                );
              default:
                return null;
            }
          })}
          <div className="flex items-center justify-center gap-3 mt-3 mb-9">
            <TextButton text="제출하기" onClick={handleSubmit} />
            <TextButton text="나가기" onClick={() => navigate('/all')} />
          </div>
        </div>
      </Scrollbars>
    </div>
  );
}

export default ResponseForm;
