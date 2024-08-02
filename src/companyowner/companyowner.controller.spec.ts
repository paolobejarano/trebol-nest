import { Test, TestingModule } from '@nestjs/testing';
import { CompanyOwnerController } from './companyowner.controller';

describe('CompanyOwnerController', () => {
  let controller: CompanyOwnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyOwnerController],
    }).compile();

    controller = module.get<CompanyOwnerController>(CompanyOwnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
