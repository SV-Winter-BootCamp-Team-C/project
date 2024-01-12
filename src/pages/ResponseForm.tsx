import { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import ResponseMultipleChoice from '@/components/responsetype/ResponseMultipleChoice';
import ResponseSubjective from '@/components/responsetype/ResponseSubjective';
import ResponseCheckBox from '@/components/responsetype/ResponseCheckBox';
import ResponseDropDown from '@/components/responsetype/ResponseDropDown';
import { TextButton } from '@/components/common/Button';

const testData = {
  survey_id: 1,
  user_name: '소정',
  title: '맞춰봐',
  description: '여기에 설문 설명을 입력하세요',
  font: 'sans-serif',
  color: '#000000',
  main_image_url: 'https://i.pinimg.com/564x/89/df/e4/89dfe4af08bbb2d64aef7988170cba94.jpg',
  created_at: '2022.03.22',
  deadline: '2022.03.30',
  questions: [
    {
      question_id: 1,
      type: 'MULTIPLE_CHOICE',
      content: '가장 좋아하는 계절은?',
      image_url: '',
      choices: [
        { choice_id: 1, option: '봄' },
        { choice_id: 2, option: '여름' },
        { choice_id: 3, option: '가을' },
        { choice_id: 4, option: '겨울' },
      ],
    },
    {
      question_id: 2,
      type: 'SUBJECTIVE_QUESTION',
      content: '당신에게 여행이란 무엇인가요?',
      image_url: 'https://i.pinimg.com/564x/89/df/e4/89dfe4af08bbb2d64aef7988170cba94.jpg',
    },
    {
      question_id: 3,
      type: 'CHECKBOX',
      content: '좋아하는 과일을 선택하세요.',
      image_url: '',
      choices: [
        { choice_id: 1, option: '바나나' },
        { choice_id: 2, option: '사과' },
        { choice_id: 3, option: '배' },
      ],
    },
    {
      question_id: 4,
      type: 'DROPDOWN',
      content: '옵션을 선택해주세요.',
      image_url: '',
      choices: [
        { choice_id: 1, option: '옵션1' },
        { choice_id: 2, option: '옵션2' },
        { choice_id: 3, option: '옵션3' },
      ],
    },
  ],
};

function ResponseForm() {
  const [surveyData] = useState(testData);

  return (
    <div className="relative flex mt-[2.25rem] ml-[0.1rem]">
      <Scrollbars style={{ position: 'absolute', right: '0.1rem', width: 1080, height: 820 }}>
        <div className="flex flex-col px-[8.75rem]">
          {testData.main_image_url && (
            <img
              src={testData.main_image_url}
              alt="Preview"
              className="rounded-[1.25rem] border border-purple max-w-[50rem] mb-6"
              style={{ boxShadow: '0 0 0.25rem 0.25rem rgba(145,141,202,0.25)' }}
            />
          )}
          <div
            className="flex flex-col mb-6 rounded-[1.25rem] bg-white border border-purple"
            style={{ boxShadow: '0 0 0.25rem 0.25rem rgba(145,141,202,0.25)' }}
          >
            <div className="flex flex-col justify-center items-center">
              <div className="w-[50rem] h-4 rounded-t-[1.25rem] bg-purple" />
              <h1 className="text-[2rem] font-semibold text-center text-black mt-4">{surveyData.title}</h1>
            </div>
            <div className="flex flex-col mb-6">
              <h2 className="text-[1rem] test-start text-black ml-8 mb-6 mt-6">{surveyData.description}</h2>
              <div className="text-[1rem] test-start text-darkGray ml-8 whitespace-pre-line">
                생성자 : {surveyData.user_name}
                <br />
                생성일 : {surveyData.created_at}
                <br />
                마감일 : {surveyData.deadline}
              </div>
            </div>
          </div>

          {surveyData.questions.map((question) => {
            switch (question.type) {
              case 'MULTIPLE_CHOICE':
                return (
                  <div className="mb-6">
                    <ResponseMultipleChoice
                      key={question.question_id}
                      question={question} // Question 객체 전체를 question prop으로 전달
                    />
                  </div>
                );
              case 'SUBJECTIVE_QUESTION':
                return (
                  <div className="mb-6">
                    <ResponseSubjective
                      key={question.question_id}
                      question={question} // Question 객체 전체를 question prop으로 전달
                    />
                  </div>
                );
              case 'CHECKBOX':
                return (
                  <div className="mb-6">
                    <ResponseCheckBox
                      key={question.question_id}
                      question={question} // Question 객체 전체를 question prop으로 전달
                    />
                  </div>
                );
              case 'DROPDOWN':
                return (
                  <div className="mb-6">
                    <ResponseDropDown
                      key={question.question_id}
                      question={question} // Question 객체 전체를 question prop으로 전달
                    />
                  </div>
                );
              default:
                return null;
            }
          })}
          <div className="flex justify-center items-center gap-3 mt-3 mb-9">
            <TextButton text="제출하기" onClick={() => {}} />
            <TextButton text="나가기" onClick={() => {}} />
          </div>
        </div>
      </Scrollbars>
    </div>
  );
}

export default ResponseForm;
