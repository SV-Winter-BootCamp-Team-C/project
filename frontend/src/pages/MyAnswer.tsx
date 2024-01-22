import { Scrollbars } from 'react-custom-scrollbars-2';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import StaticCheckBox from '../components/staticresponse/StaticCheckBox';
import StaticMultipleChoice from '../components/staticresponse/StaticMultipleChoice';
import { TextButton } from '../components/common/Button';
import StaticSubjective from '../components/staticresponse/StaticSubjective';
import StaticDropDown from '../components/staticresponse/StaticDropDown';
import { QuestionDataForm } from '../types/questionData';
import { myAnswerAPI } from '../api/myanswer';
// import { useAuthStore } from '../store/AuthStore';
import Loading from '../components/common/Loading';
// import Alert from '../components/common/Alert';

function MyAnswer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = Number(searchParams.get('userId'));
  const surveyId = Number(searchParams.get('surveyId'));
  // const myId = useAuthStore((state) => state.userId);

  const fontClasses: { [key: string]: string } = {
    pretendard: 'font-pretendardFont',
    tmoney: 'font-tMoney',
    nps: 'font-npsFont',
    omyu: 'font-omyuFont',
    seolleim: 'font-seolleimFont',
  };

  // 데이터 로딩 및 에러 상태 처리
  const {
    data: surveyData,
    isLoading,
    // isError,
  } = useQuery<QuestionDataForm, AxiosError>({
    queryKey: ['surveyData', surveyId],
    queryFn: () => myAnswerAPI(userId, surveyId),
  });

  // 데이터 로딩 중인 경우
  if (isLoading) {
    return <Loading />;
  }

  // 에러 발생 시 처리
  // if (isError || !surveyData) {
  //   return (
  //     <Alert
  //       type="error"
  //       message="설문 데이터를 불러오는데 실패했습니다."
  //       buttonText="확인"
  //       buttonClick={() => navigate('/myresponses')}
  //     />
  //   );
  // }

  // // 현재 사용자의 ID와 가져온 데이터의 ID가 일치하는지 확인
  // if (userId !== myId) {
  //   // ID가 다른 경우, 사용자에게 메시지를 보여주거나 다른 페이지로 리디렉션
  //   return (
  //     <Alert
  //       type="error"
  //       message="이 응답에 대한 접근 권한이 없습니다."
  //       buttonText="확인"
  //       buttonClick={() => navigate('/myresponses')}
  //     />
  //   );
  // }

  return (
    <div className={`${fontClasses[surveyData.font] || fontClasses.pretendard} relative flex mt-[2.25rem] ml-[0.1rem]`}>
      <Scrollbars style={{ position: 'absolute', right: '0.1rem', width: 1080, height: 820 }}>
        <div className="flex flex-col px-[8.75rem]">
          {surveyData?.mainImageUrl && (
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
            style={{ boxShadow: `0 0 0.25rem 0.25rem ${surveyData?.color}40` }}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-[50rem] h-4 rounded-t-[1.25rem]" style={{ background: `${surveyData?.color}` }} />
              <h1 className="text-[2rem] font-semibold text-center text-black mt-4">{surveyData?.title}</h1>
            </div>
            <div className="flex flex-col mb-6">
              <h2 className="text-[1rem] test-start text-black ml-8 mb-6 mt-6">{surveyData?.description}</h2>
              <div className="text-[1rem] test-start text-darkGray ml-8 whitespace-pre-line">
                생성자 : {surveyData?.userName}
                <br />
                생성일 : {surveyData?.createdAt}
                <br />
                마감일 : {surveyData?.deadline}
              </div>
            </div>
          </div>

          {surveyData?.questions.map((question, index) => {
            switch (question.type) {
              case 'MULTIPLE_CHOICE':
                return (
                  <div className="mb-6">
                    <StaticMultipleChoice
                      key={question.questionId}
                      index={index + 1}
                      question={question}
                      color={surveyData.color}
                      buttonStyle={surveyData.buttonStyle}
                    />
                  </div>
                );
              case 'SUBJECTIVE_QUESTION':
                return (
                  <div className="mb-6">
                    <StaticSubjective
                      key={question.questionId}
                      index={index + 1}
                      question={question}
                      color={surveyData.color}
                    />
                  </div>
                );
              case 'CHECKBOX':
                return (
                  <div className="mb-6">
                    <StaticCheckBox
                      key={question.questionId}
                      index={index + 1}
                      question={question}
                      color={surveyData.color}
                      buttonStyle={surveyData.buttonStyle}
                    />
                  </div>
                );
              case 'DROPDOWN':
                return (
                  <div className="mb-6">
                    <StaticDropDown
                      key={question.questionId}
                      index={index + 1}
                      question={question}
                      color={surveyData.color}
                    />
                  </div>
                );
              default:
                return null;
            }
          })}

          <div className="flex items-center justify-center gap-3 mt-3 mb-9">
            <TextButton text="나가기" onClick={() => navigate('/myresponses')} />
          </div>
        </div>
      </Scrollbars>
    </div>
  );
}

export default MyAnswer;
