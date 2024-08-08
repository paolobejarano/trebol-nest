import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyOwner } from './companyowner.entity';
import { CompanyOwnerService } from './companyowner.service';
import { CompanyOwnerController } from './companyowner.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyOwner])],
  providers: [CompanyOwnerService],
  controllers: [CompanyOwnerController],
})
export class CompanyOwnerModule {}