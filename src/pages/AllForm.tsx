import SurveyCover from '@/components/survey/SurveyCover';
import { Survey } from '@/types/survey';

interface SurveyData {
  surveys: Survey[];
}

// 테스트용 데이터
const surveyData: SurveyData = {
  surveys: [
    {
      survey_id: 1,
      title: '나를 맞춰봐',
      main_image_url: '',
      created_at: '2022.02.22',
      updated_at: '2022.02.22',
      deadline: '2024.01.11',
      atted_count: 10,
    },
    {
      survey_id: 2,
      title: '논문폼',
      main_image_url: '', // 이미지 없을 경우
      created_at: '2022.02.22',
      updated_at: '2022.02.22',
      deadline: '2024.02.23',
      atted_count: 10,
    },
  ],
};

function Home() {
  return (
    <div>
      <div className="grid grid-cols-3 lg:grid-cols-3 p-9 gap-y-4 gap-x-6">
        {surveyData.surveys.map((item) => (
          <SurveyCover
            key={item.survey_id}
            title={item.title}
            mainImageUrl={item.main_image_url}
            deadline={item.deadline}
            attedCount={item.atted_count}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
