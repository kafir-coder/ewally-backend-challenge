import { getAmount } from './amount';

describe('amount utils test suite', () => {
  describe('bank paymentSlip', () => {
    const bankAmountTestTable = [
      ['21290001192110001210904475617405975870000002000', 20],
      ['21290001192110001210904475617405975870000001423', 14.23],
      ['21290001192110001210904475617405975870000022020', 220.2],
      ['21290001192110001210904475617405975870000002000', 20],
    ];
    it.each(bankAmountTestTable)(
      "getAmount(%s, 'BANK') = %s",
      (dline: string, expetedAmount: number) => {
        const result = getAmount(dline, 'BANK');
        expect(result).toBe(expetedAmount);
      },
    );
  });

  describe('agreement paymentSlip', () => {
    const agreementAmountTestTable = [
      ['858900004329951401791605607593050865831483000010', 43295.14],
      ['858900000009524601791605607593050865831483000010', 52.46],
      ['858900005049504601791605607593050865831483000010', 50450.46],
      ['858900001519510001791605607593050865831483000010', 15151],
    ];

    it.each(agreementAmountTestTable)(
      "getAmount(%s, 'AGREEMENT') = %s",
      (dline: string, expectedAmount: number) => {
        const result = getAmount(dline, 'AGREEMENT');
        expect(result).toBe(expectedAmount);
      },
    );
  });
});
