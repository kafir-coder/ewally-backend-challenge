export const getBankBarcode = (dline: string) =>
  dline.replace(
    /^(\d{4})(\d{5})\d{1}(\d{10})\d{1}(\d{10})\d{1}(\d{15})$/,
    '$1$5$2$3$4',
  );

export const getAgreementBarcode = (dline: string) => {
  let barcode = '';

  for (let index = 0; index < 4; index += 1) {
    const start = 11 * index + index;
    const end = 11 * (index + 1) + index;

    barcode += dline.substring(start, end);
  }
  return barcode;
};

export const getBarcode = (dline: string, type: string): string => {
  if (type === 'BANK') return getBankBarcode(dline);
  return getAgreementBarcode(dline);
};
