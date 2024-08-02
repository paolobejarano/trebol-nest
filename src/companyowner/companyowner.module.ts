import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyOwner } from './companyowner.entity';
import { CompanyOwnerService } from './companyowner.service';
import { CompanyOwnerController } from './companyowner.controller';
import { Form } from '../forms/form.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyOwner, Form])],
  providers: [CompanyOwnerService],
  controllers: [CompanyOwnerController],
})
export class CompanyOwnerModule {}