import { Injectable } from '@nestjs/common';
import {
  getAmount,
  getBarcode,
  getExpirationDate,
  IsDigitalLine,
  validateAgreementDigitableLine,
  validateBankDigitableLine,
} from './utils';

@Injectable()
export class BoletoService {
  getBoletoType(digitableLine: string): string | null {
    const isDline = IsDigitalLine(digitableLine);
    if (!isDline) return null;
    const len = digitableLine.length;
    if (len === 47) {
      return 'BANK';
    } else if (len == 48) return 'AGREEMENT';
  }
  getBoletoDetails(
    digitableLine: string,
    type: string,
  ): DigitableLineDetails | null {
    let isDlineValid = null;
    if (type === 'BANK')
      isDlineValid = validateBankDigitableLine(digitableLine);
    else isDlineValid = validateAgreementDigitableLine(digitableLine);

    if (!isDlineValid) return null;

    const amount = getAmount(digitableLine, type);
    const barCode = getBarcode(digitableLine, type);
    const expirationDate = getExpirationDate(digitableLine, type);
    return {
      amount,
      barCode,
      expirationDate,
    };
  }
}

export type DigitableLineDetails = {
  amount: number;
  expirationDate: Date;
  barCode: string;
};
