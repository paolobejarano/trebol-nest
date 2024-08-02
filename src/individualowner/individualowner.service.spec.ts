import { Test, TestingModule } from '@nestjs/testing';
import { IndividualownerService } from './individualowner.service';

describe('IndividualownerService', () => {
  let service: IndividualownerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndividualownerService],
    }).compile();

    service = module.get<IndividualownerService>(IndividualownerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
