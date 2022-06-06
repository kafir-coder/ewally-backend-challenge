export class InvalidDigitableLine extends Error {
  constructor() {
    super();
    this.name = 'InvalidDigitableLine';
    this.message = 'The argument must be a digitable line';
  }
}
