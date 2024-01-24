import SurveyForm from '../components/survey/SurveyForm';
import usePaginationSurveyList from '../hooks/usePaginationSurveyList';

function MyResponse() {
  const { data, currentPage, handlePageChange, searchTerm, setSearchTerm, handleSortChange } =
    usePaginationSurveyList('myResponse');

  return (
    <SurveyForm
      surveyData={data || { surveys: [], totalPages: 0 }}
      currentPage={currentPage}
      onPageChange={handlePageChange}
      searchTerm={searchTerm} // 검색어 상태 전달
      setSearchTerm={setSearchTerm} // 검색 핸들러 전달
      onSortChange={handleSortChange}
    />
  );
}

export default MyResponse;
