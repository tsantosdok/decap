export const getABTestVariant = () => {
    const randomVariant = Math.random() < 0.5 ? 'A' : 'B';
    return randomVariant;
  };
  