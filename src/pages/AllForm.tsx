import SurveyForm from '@/components/survey/SurveyForm';
import { useNavigate } from 'react-router-dom';
import usePaginationSurveyList from '@/hooks/usePaginationSurveyList';

function AllForm() {
  const navigate = useNavigate();

  const { data, currentPage, handlePageChange } = usePaginationSurveyList('allForm');

  return (
    <SurveyForm
      surveyData={data || { surveys: [], totalPages: 0 }}
      currentPage={currentPage}
      onClickAddButton={() => navigate('/create')}
      onPageChange={handlePageChange}
    />
  );
}

export default AllForm;
