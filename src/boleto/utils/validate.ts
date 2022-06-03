import {
  modulo10,
  modulo11ForBankType,
  modulo11ToAgreementType,
} from '../algorithms';
import { getAgreementBarcode, getBankBarcode } from './barcode';

export const IsDigitalLine = (code: string) => {
  return [47, 48].includes(getOnlyNumbers(code).length);
};

export const isBarcode = (code: string) => {
  return [44, 45].includes(getOnlyNumbers(code).length);
};

export const getOnlyNumbers = (code = '') => code.replace(/( |\.|-)/g, '');

export const validateBarcodeBank = (code: string) => {
  if (!isBarcode(code)) return false;

  const DV = code.substr(4, 1);
  const block = code.substr(0, 4) + code.substr(5);

  return modulo11ForBankType(block) === Number(DV);
};

export const validateBarcodeAgreement = (code: string) => {
  if (!isBarcode(code) || Number(code.substr(0, 1)) !== 8) return false;

  const coin = Number(code.substr(2, 1));
  const DV = Number(code.substr(3, 1));
  const block = code.substr(0, 3) + code.substr(4);

  let moduloRef = null;

  if (coin === 6 || coin === 7) moduloRef = modulo10;
  if (coin === 8 || coin === 9) moduloRef = modulo11ToAgreementType;
  if (!moduloRef) return false;

  return moduloRef(block) === DV;
};

export const validateBankDigitableLine = (code: string) => {
  if (!IsDigitalLine(code)) return false;
  const blocks = [
    {
      num: code.substr(0, 9),
      DV: code.substr(9, 1),
    },
    {
      num: code.substr(10, 10),
      DV: code.substr(20, 1),
    },
    {
      num: code.substr(21, 10),
      DV: code.substr(31, 1),
    },
  ];

  const blocksValidate = blocks.every((e) => modulo10(e.num) === Number(e.DV));

  const checksum = validateBarcodeBank(getBankBarcode(code));
  return blocksValidate && checksum;
};

export const validateAgreementDigitableLine = (code) => {
  if (!IsDigitalLine(code) || Number(code.substr(0, 1)) !== 8) return false;

  const validDV = validateBarcodeAgreement(getAgreementBarcode(code));

  const coin = Number(code[2]);
  let modulo;
  if (coin === 6 || coin === 7) modulo = modulo10;
  else if (coin === 8 || coin === 9) modulo = modulo11ToAgreementType;
  else return false;
  const blocks = Array.from({ length: 4 }, (v, index) => {
    const start = 11 * index + index;
    const end = 11 * (index + 1) + index;
    return {
      num: code.substring(start, end),
      DV: code.substring(end, end + 1),
    };
  });
  const validBlocks = blocks.every((e) => modulo(e.num) === Number(e.DV));
  return validBlocks && validDV;
};
