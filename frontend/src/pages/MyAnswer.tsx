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
import Loading from '../components/common/Loading';
import { formatDeadlineDate } from '../utils/formatDeadlineDate';
import Alert from '../components/common/Alert';

function MyAnswer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = Number(searchParams.get('userId'));
  const surveyId = Number(searchParams.get('surveyId'));

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
    isError,
  } = useQuery<QuestionDataForm, AxiosError>({
    queryKey: ['surveyData', surveyId],
    queryFn: () => myAnswerAPI(userId, surveyId),
  });

  if (isLoading) {
    return <Loading />;
  }

  // 에러 발생 시 처리
  if (isError) {
    return (
      <Alert
        type="error"
        message="설문 데이터를 불러오는데 실패했습니다."
        buttonText="확인"
        buttonClick={() => navigate('/myresponses')}
      />
    );
  }

  return (
    <div className="relative flex mt-[2.25rem]">
      <Scrollbars style={{ position: 'absolute', right: '0.1rem', width: 1200, height: 820 }}>
        {surveyData ? (
          <div className={`flex flex-col px-[12.5rem] ${fontClasses[surveyData?.font] || fontClasses.pretendard}`}>
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
                  생성일 : {formatDeadlineDate(surveyData?.createdAt as string)}
                  <br />
                  마감일 : {formatDeadlineDate(surveyData?.deadline as string)}
                </div>
              </div>
            </div>

            {surveyData?.questions.map((question, index) => {
              switch (question.type) {
                case 'MULTIPLE_CHOICE':
                  return (
                    <div className="mb-6" key={question.questionId}>
                      <StaticMultipleChoice
                        index={index + 1}
                        question={question}
                        color={surveyData.color}
                        buttonStyle={surveyData.buttonStyle}
                      />
                    </div>
                  );
                case 'SUBJECTIVE_QUESTION':
                  return (
                    <div className="mb-6" key={question.questionId}>
                      <StaticSubjective index={index + 1} question={question} color={surveyData.color} />
                    </div>
                  );
                case 'CHECKBOX':
                  return (
                    <div className="mb-6" key={question.questionId}>
                      <StaticCheckBox
                        index={index + 1}
                        question={question}
                        color={surveyData.color}
                        buttonStyle={surveyData.buttonStyle}
                      />
                    </div>
                  );
                case 'DROPDOWN':
                  return (
                    <div className="mb-6" key={question.questionId}>
                      <StaticDropDown index={index + 1} question={question} color={surveyData.color} />
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
        ) : (
          <Alert
            type="error"
            message="설문 데이터를 불러오는데 실패했습니다."
            buttonText="확인"
            buttonClick={() => navigate('/myresponses')}
          />
        )}
      </Scrollbars>
    </div>
  );
}

export default MyAnswer;
