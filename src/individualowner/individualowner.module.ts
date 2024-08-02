import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndividualOwner } from './individualowner.entity';
import { IndividualOwnerController } from './individualowner.controller';
import { Form } from '../forms/form.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IndividualOwner, Form])],
  controllers: [IndividualOwnerController],
})
export class IndividualOwnerModule {}