import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './form.entity';
import { FormsController } from './forms.controller';
import { InstitutionModule } from '../institution/institution.module';

@Module({
  imports: [TypeOrmModule.forFeature([Form]), InstitutionModule],
  controllers: [FormsController],
})
export class FormsModule {}