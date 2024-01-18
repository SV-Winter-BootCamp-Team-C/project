export const getRoundedClass = (buttonStyle: 'smooth' | 'round' | 'angled') => {
  switch (buttonStyle) {
    case 'smooth':
      return 'rounded-[0.625rem]';
    case 'round':
      return 'rounded-[1.875rem]';
    default:
      return 'rounded-0';
  }
};
