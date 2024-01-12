import { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import ResultTypeSwitch from '@/components/common/ResultTypeSwitch';
import Question from '@/components/surveyResult/Question/Question';
import Response from '@/components/surveyResult/Response/Response';

function ResultPage() {
  const [currentSwitch, setCurrentSwitch] = useState<'question' | 'answer'>('question');

  const handleToggle = () => {
    setCurrentSwitch((prev) => (prev === 'question' ? 'answer' : 'question'));
  };

  return (
    <Scrollbars style={{ marginTop: 30, maxHeight: 830 }}>
      <div className="flex flex-col items-center justify-center py-5">
        <div className="pb-6">
          <h1 className="text-black text-[2rem] font-semibold">[설문지 제목] 분석 결과</h1>
        </div>

        <ResultTypeSwitch curretState={currentSwitch} onChange={handleToggle} />
        <div className="pt-10">{currentSwitch === 'question' ? <Question /> : <Response />}</div>
      </div>
    </Scrollbars>
  );
}

export default ResultPage;
