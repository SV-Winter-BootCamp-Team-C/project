import { AddButton, TextButton } from '@/components/common/Button';
import { useState } from 'react';
import MultipleChoice from '@/components/surveytype/MultipleChoice';
import Checkbox from '@/components/surveytype/CheckBox';
import DropDown from '@/components/surveytype/DropDown';
import Subjective from '@/components/surveytype/Subjective';
import CreateQuestionMenu from './CreateQuestionMenu';

function CreateQuestion() {
  const [addQuestion, setAddQuestion] = useState(false);
  const [selectedQuestionType, setSelectedQuestionType] = useState<string[]>([]);

  const handleAddQuestion = () => {
    setAddQuestion(!addQuestion);
  };

  const handleQuestionTypeSelect = (type: string) => {
    setSelectedQuestionType((prev) => [...prev, type]);
    setAddQuestion(false);
  };

  const renderQuestionComponent = (type: string) => {
    switch (type) {
      case '객관식 문항':
        return <MultipleChoice />;
      case '체크박스 문항':
        return <Checkbox />;
      case '드롭다운 문항':
        return <DropDown />;
      case '주관식 문항':
        return <Subjective />;
      default:
        return null;
    }
  };

  return (
    <div className="relative flex flex-col h-full px-[8.75rem] ">
      <div className="flex items-center justify-start gap-6 my-6">
        <p className="text-[2rem] font-semibold text-black">문제</p>
        <AddButton
          text="추가"
          onClick={() => {
            handleAddQuestion();
          }}
        />
        {addQuestion && <CreateQuestionMenu onSelect={handleQuestionTypeSelect} />}
      </div>

      <div className="flex flex-col items-center justify-center">
        {selectedQuestionType.length === 0 ? (
          <p className="text-gray">설문 문항을 등록하세요.</p>
        ) : (
          selectedQuestionType.map((type, index) => {
            return (
              <div key={index} className="pb-6">
                {renderQuestionComponent(type)}
              </div>
            );
          })
        )}
      </div>

      {selectedQuestionType.length > 0 && (
        <div className="flex items-center justify-center pt-2">
          <TextButton text="저장하기" onClick={() => {}} />
        </div>
      )}
    </div>
  );
}

export default CreateQuestion;
