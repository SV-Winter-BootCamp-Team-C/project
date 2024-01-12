import SurvdForm from '@/components/survey/SurveyForm';
import { useNavigate } from 'react-router-dom';

function MyForm() {
  const navigate = useNavigate();
  return <SurvdForm totalPages={2} onClickAddButton={() => navigate('/createstyle')} />;
}

export default MyForm;
