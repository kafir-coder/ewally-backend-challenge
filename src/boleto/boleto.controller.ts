import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Param,
} from '@nestjs/common';
import { badRequest, InsufficientDlineLength } from './errors/';
import { BoletoService } from './boleto.service';
import { InvalidDigitableLine } from './errors/invalid-digitable-line';

@Controller('/api/v1/getBoletoDetails')
export class BoletoController {
  constructor(private readonly boletoService: BoletoService) {}

  @Get('/:digitableLine')
  @HttpCode(200)
  getBoletoDetails(@Param('digitableLine') digitableLine: string) {
    const type = this.boletoService.getBoletoType(digitableLine);
    if (type == null) {
      throw new BadRequestException(badRequest(new InsufficientDlineLength()));
    }
    const result = this.boletoService.getBoletoDetails(digitableLine, type);
    if (result === null) {
      throw new BadRequestException(badRequest(new InvalidDigitableLine()));
    }

    return result;
  }
}
