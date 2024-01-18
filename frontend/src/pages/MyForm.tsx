import SurveyForm from '@/components/survey/SurveyForm';
import usePaginationSurveyList from '@/hooks/usePaginationSurveyList';
import { useNavigate } from 'react-router-dom';

function MyForm() {
  const navigate = useNavigate();

  const { data, currentPage, handlePageChange } = usePaginationSurveyList('myForm');

  return (
    <SurveyForm
      surveyData={data || { surveys: [], totalPages: 0 }}
      currentPage={currentPage}
      onClickAddButton={() => navigate('/create')}
      onPageChange={handlePageChange}
    />
  );
}

export default MyForm;
