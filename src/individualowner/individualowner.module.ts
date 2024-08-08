import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndividualOwner } from './individualowner.entity';
import { IndividualOwnerController } from './individualowner.controller';
import { IndividualOwnerService } from './individualowner.service';
import { Form } from '../forms/form.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IndividualOwner, Form])],
  providers: [IndividualOwnerService],
  controllers: [IndividualOwnerController],
})
export class IndividualOwnerModule {}