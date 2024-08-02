import { Test, TestingModule } from '@nestjs/testing';
import { IndividualOwnerController } from './individualowner.controller';

describe('IndividualOwnerController', () => {
  let controller: IndividualOwnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndividualOwnerController],
    }).compile();

    controller = module.get<IndividualOwnerController>(IndividualOwnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
