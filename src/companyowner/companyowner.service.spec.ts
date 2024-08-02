import { Test, TestingModule } from '@nestjs/testing';
import { CompanyownerService } from './companyowner.service';

describe('CompanyownerService', () => {
  let service: CompanyownerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyownerService],
    }).compile();

    service = module.get<CompanyownerService>(CompanyownerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
