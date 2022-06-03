export const getAmountToBankType = (dline: string) => {
  const value = dline.substr(-8, 8);
  return Number((parseInt(value, 10) / 100.0).toFixed(2));
};

export const getAmountToAgreementType = (number: string) => {
  const value = `${number.substr(0, 11)}${number.substr(12)}`.substr(4, 11);
  return Number((parseInt(value, 10) / 100.0).toFixed(2));
};

export const getAmount = (number: string, type: string) => {
  if (type === 'BANK') return getAmountToBankType(number);
  if (type === 'AGREEMENT') return getAmountToAgreementType(number);
  return 0;
};
