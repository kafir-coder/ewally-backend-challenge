import {
  getOnlyNumbers,
  isBarcode,
  IsDigitalLine,
  validateAgreementDigitableLine,
  validateBankDigitableLine,
} from './validate';

describe('validate utils test suite', () => {
  describe('isBarcode', () => {
    it("should return false if input length isn't between 44 and 45", () => {
      const lesser_input = '1234567890123456789012345678901234567890'; // length 40
      const greater_input = '1234567890123456789012345678901234567890123456'; // length 46

      expect(isBarcode(lesser_input) || isBarcode(greater_input)).toBe(false);
    });
    it('should return true if input length is between 44 and 45', () => {
      const first = '12345678901234567890123456789012345678901234'; // length 44
      const second = '123456789012345678930123456789012345678901234'; // length 45

      expect(isBarcode(first) && isBarcode(second)).toBe(true);
    });
  });
  describe('isDigitableLine', () => {
    it("should return false if input length isn't between 47 and 48", () => {
      const lesser_input = '1234567890123456789012345678901234567890'; // length 40
      const greater_input = '1234567890123456789012345678901234567890123456'; // length 46

      expect(IsDigitalLine(lesser_input) || IsDigitalLine(greater_input)).toBe(
        false,
      );
    });
    it('should return true if input length is between 47 and 48', () => {
      const first = '123456789012345678901234567890123456789012341234'; // length 44
      const second = '123212345789012345678930123456789012345678901234 '; // length 46

      expect(IsDigitalLine(first) && IsDigitalLine(second)).toBe(true);
    });
  });
  describe('getOnlyNumber', () => {
    it('should return only numbers', () => {
      const input = '12345678901234567890123456789012345678901234-1212';
      const result = getOnlyNumbers(input);

      expect(result.length < input.length && /^\d+$/g.test(result)).toBe(true);
    });
  });
  describe('validateBankDigitableLine', () => {
    it('should return false if the bank digitable line is valid.', () => {
      const dline = '33690000090000001000910721762432181580000235000';
      expect(validateBankDigitableLine(dline)).toBe(true);
    });

    it('should return false if the bank digitable line has at least one false dv invalid dvs.', () => {
      const dline = '33690000010000001000910721762432181580000235000';
      expect(validateBankDigitableLine(dline)).toBe(false);
    });
  });
  describe('validateAgreementDigitableLine', () => {
    it('should return false if the agreement digitable line is valid.', () => {
      const dline = '858900004609524601791605607593050865831483000010';
      expect(validateAgreementDigitableLine(dline)).toBe(true);
    });
  });
});
