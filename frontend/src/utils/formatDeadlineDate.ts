export const formatDeadlineDate = (date: string) => {
  // 유효한 날짜인지 확인
  if (!Date.parse(date)) {
    return '';
  }
  const deadlineDate = new Date(date);
  return deadlineDate.toISOString().split('T')[0];
};
