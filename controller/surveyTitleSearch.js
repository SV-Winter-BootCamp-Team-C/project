function findSurveyIdsByTitle(searchList) {
  const { surveys, title } = searchList;

  const filtered = surveys.filter((survey) => {
    return survey.surveyTitle.includes(title);
  });

  const surveyIds = filtered.map((survey) => {
    return survey.surveyId;
  });

  return {
    surveys: surveyIds,
  };
}

module.exports = {
  surveyTitleSearch: findSurveyIdsByTitle,
};
