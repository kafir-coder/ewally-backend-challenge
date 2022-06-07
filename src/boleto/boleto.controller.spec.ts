import { Test, TestingModule } from '@nestjs/testing';
import { BoletoController } from './boleto.controller';
import { BoletoService } from './boleto.service';
import { BadRequestException } from '@nestjs/common';

describe('BoletoController', () => {
  let controller: BoletoController;
  let spyService: BoletoService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: BoletoService,
      useFactory: () => ({
        getBoletoType: jest.fn(() => []),
        getBoletoDetails: jest.fn(() => []),
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoletoController],
      providers: [BoletoService, ApiServiceProvider],
    }).compile();

    controller = module.get<BoletoController>(BoletoController);
    spyService = module.get<BoletoService>(BoletoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should call BoletoService.getBoletoType', () => {
    const dline = '';
    controller.getBoletoDetails(dline);
    expect(spyService.getBoletoType).toBeCalledTimes(1);
  });
  it('should return 400 if BoletoService.getBoletoType returns null', () => {
    const dline = '';
    jest.spyOn(spyService, 'getBoletoType').mockReturnValueOnce(null);
    try {
      controller.getBoletoDetails(dline);
    } catch (error: any) {
      expect(error.name).toBe(new BadRequestException().name);
    }
  });
  it('should return 400 if BoletoService.getBoletoDetails returns null', () => {
    const dline = '';
    jest.spyOn(spyService, 'getBoletoDetails').mockReturnValueOnce(null);
    try {
      controller.getBoletoDetails(dline);
    } catch (error: any) {
      expect(error.name).toBe(new BadRequestException().name);
    }
  });
  it('should return 200 if BoletoService.getBoletoDetails returns the Boleto details', () => {
    const dline = '';
    jest.spyOn(spyService, 'getBoletoDetails').mockReturnValueOnce({
      amount: 202,
      barCode: 'THE_BAR_CODE',
      expirationDate: new Date(),
    });
    try {
      controller.getBoletoDetails(dline);
    } catch (error: any) {
      expect(error.name).toBe(new BadRequestException().name);
    }
  });
});
