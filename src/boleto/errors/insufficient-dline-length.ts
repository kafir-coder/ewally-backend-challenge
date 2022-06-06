export class InsufficientDlineLength extends Error {
  constructor() {
    super();
    this.name = 'InsufficientDlineLength';
    this.message = 'The argument must be at least 47 long';
  }
}
