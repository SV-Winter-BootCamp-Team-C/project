import SurveyForm from '@/components/survey/SurveyForm';
import usePaginationSurveyList from '@/hooks/usePaginationSurveyList';

function MyResponse() {
  const { data, currentPage, handlePageChange } = usePaginationSurveyList('myResponse');

  return (
    <SurveyForm
      surveyData={data || { surveys: [], totalPages: 0 }}
      currentPage={currentPage}
      onPageChange={handlePageChange}
    />
  );
}

export default MyResponse;
