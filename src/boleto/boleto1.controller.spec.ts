import { Test, TestingModule } from '@nestjs/testing';
import { BoletoController } from './boleto.controller';
import { BoletoService } from './boleto.service';

describe('Boleto1Controller', () => {
  let controller: BoletoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoletoController],
      providers: [BoletoService],
    }).compile();

    controller = module.get<BoletoController>(BoletoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
