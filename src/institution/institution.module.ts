import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from './institution.entity';
import { InstitutionController } from './institution.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Institution])],
  controllers: [InstitutionController],
  exports: [TypeOrmModule],  // Ensure that TypeOrmModule is exported
})
export class InstitutionModule {}