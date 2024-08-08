import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyOwner } from './companyowner.entity';

@Injectable()
export class CompanyOwnerService {
    constructor(
      @InjectRepository(CompanyOwner)
      private companyOwnerRepository: Repository<CompanyOwner>,
    ) {}

    async create(companyOwner: CompanyOwner): Promise<CompanyOwner> {
        return this.companyOwnerRepository.save(companyOwner);
    }

    async findAll(): Promise<CompanyOwner[]> {
        return this.companyOwnerRepository.find();
    }

    async findOne(id: number): Promise<CompanyOwner> {
        const companyOwner = await this.companyOwnerRepository.findOne({ where: { id } });
        if (!companyOwner) {
            throw new NotFoundException(`CompanyOwner with ID ${id} not found`);
        }
        return companyOwner;
    }

    async update(id: number, updateData: Partial<CompanyOwner>): Promise<CompanyOwner> {
        await this.companyOwnerRepository.update(id, updateData);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        const result = await this.companyOwnerRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`CompanyOwner with ID ${id} not found`);
        }
    }
}