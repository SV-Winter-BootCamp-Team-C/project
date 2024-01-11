export const calculateRemainingDays = (deadline: string) => {
  const deadlineDate = new Date(deadline);
  const today = new Date();
  const difference = deadlineDate.getTime() - today.getTime();
  const remainingDays = Math.ceil(difference / (1000 * 3600 * 24));

  let textColor = 'text-darkGary';
  const textLabel = remainingDays > 0 ? `D - ${remainingDays}` : '마감';

  if (remainingDays <= 0 || remainingDays <= 3) {
    textColor = 'text-red-500';
  }

  return { textLabel, textColor };
};
