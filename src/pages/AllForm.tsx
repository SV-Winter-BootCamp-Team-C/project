import SurvdForm from '@/components/survey/SurveyForm';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return <SurvdForm totalPages={2} onClickAddButton={() => navigate('/create')} />;
}

export default Home;
