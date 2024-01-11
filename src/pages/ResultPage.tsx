import ResultTypeSwitch from '@/components/common/ResultTypeSwitch';
import { useState } from 'react';

function ResultPage() {
  const [currentSwitch, setCurrentSwitch] = useState<'question' | 'answer'>('question');

  const handleToggle = () => {
    setCurrentSwitch((prev) => (prev === 'question' ? 'answer' : 'question'));
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 ">
      <div className="pb-6">
        <h1 className="text-black text-[2rem] font-semibold">[설문지 제목] 분석 결과</h1>
      </div>

      <ResultTypeSwitch curretState={currentSwitch} onChange={handleToggle} />
    </div>
  );
}

export default ResultPage;
