import { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import ResultTypeSwitch from '@/components/common/ResultTypeSwitch';
import Question from '@/components/surveyResult/Question/Question';
import Response from '@/components/surveyResult/Response/Response';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { QuestionData, QuestionResultForm } from '@/types/questionData';
import { AxiosError } from 'axios';
import { getAnswerResultAPI, getQuestionResultAPI } from '@/api/getResult';
import { AnswerData } from '@/types/answerData';

function ResultPage() {
  const [searchParams] = useSearchParams();
  const surveyId = Number(searchParams.get('id'));

  const [currentSwitch, setCurrentSwitch] = useState<'question' | 'answer'>('question');

  const handleToggle = () => {
    setCurrentSwitch((prev) => (prev === 'question' ? 'answer' : 'question'));
  };

  const { data: questionData } = useQuery<QuestionResultForm, AxiosError>({
    queryKey: ['questionResult', surveyId],
    queryFn: () => getQuestionResultAPI(surveyId),
    meta: { errorMessage: '설문지 결과를 불러오는 중 오류가 발생했습니다.' },
  });

  const { data: answerData } = useQuery<AnswerData, AxiosError>({
    queryKey: ['answerResult', surveyId],
    queryFn: () => getAnswerResultAPI(surveyId),
    meta: { errorMessage: '설문지 결과를 불러오는 중 오류가 발생했습니다.' },
  });

  return (
    <Scrollbars style={{ marginTop: 30, maxHeight: 830 }}>
      <div className="flex flex-col items-center justify-center py-5">
        <div className="pb-6">
          <h1 className="text-black text-[2rem] font-semibold">{`[${questionData?.title}] 분석 결과`}</h1>
        </div>

        <ResultTypeSwitch curretState={currentSwitch} onChange={handleToggle} />
        <div className="pt-10">
          {currentSwitch === 'question' ? (
            <Question questions={questionData?.questions as QuestionData[]} />
          ) : (
            <Response title={answerData?.title as string} list={answerData?.list || { head: [], rows: [] }} />
          )}
        </div>
      </div>
    </Scrollbars>
  );
}

export default ResultPage;
