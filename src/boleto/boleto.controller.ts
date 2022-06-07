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
import { ApiProperty, ApiResponse } from '@nestjs/swagger';

export class ErrorReponse {
  @ApiProperty()
  name: string;

  @ApiProperty()
  message: string;
}

export class Ok {
  @ApiProperty()
  amount: string;

  @ApiProperty()
  expirationDate: Date;

  @ApiProperty()
  barCode: string;
}

@Controller('/api/v1/get-boleto-details')
export class BoletoController {
  constructor(private readonly boletoService: BoletoService) {}

  @Get('/:digitableLine')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: Ok,
    description: 'Successo na consulta',
  })
  @ApiResponse({
    status: 400,
    type: ErrorReponse,
    description: 'A linha digital é invalida',
  })
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
