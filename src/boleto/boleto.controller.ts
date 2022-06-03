import { Controller, Get, HttpCode, Query } from '@nestjs/common';

@Controller('/api/v1/getBoleto')
export class BoletoController {
  @Get('/:digitableLine')
  @HttpCode(200)
  getBoleto(@Query('digitableLine') digitableLine: string) {
    // return this.boletoService.create(createBoletoDto);
    console.log(digitableLine);
    return {
      barCode: '',
      amount: '',
      expirationDate: '',
    };
  }
}
