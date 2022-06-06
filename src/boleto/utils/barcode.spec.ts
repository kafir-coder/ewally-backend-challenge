import { getAgreementBarcode, getBankBarcode } from './barcode';

describe('barcode utils test suite', () => {
  it('should return the barcode representation of the bank paymetSlip digitable line', () => {
    const dline = '21290001192110001210904475617405975870000002000';
    const expectedBarCode = '21299758700000020000001121100012100447561740';
    const result = getBankBarcode(dline);
    expect(result).toBe(expectedBarCode);
  });

  it('should return the barcode representation of the agreement paymentSlip digitable line', () => {
    const dline = '858900004609524601791605607593050865831483000010';
    const expectedBarCode = '85890000460524601791606075930508683148300001';
    const result = getAgreementBarcode(dline);
    expect(result).toBe(expectedBarCode);
  });
});
