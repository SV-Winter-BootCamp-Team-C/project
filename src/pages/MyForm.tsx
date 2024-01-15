import SurveyForm from '@/components/survey/SurveyForm';
import { useNavigate } from 'react-router-dom';

function MyForm() {
  const navigate = useNavigate();
  return <SurveyForm totalPages={2} onClickAddButton={() => navigate('/create')} />;
}

export default MyForm;
