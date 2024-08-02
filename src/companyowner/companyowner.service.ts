import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyOwner } from './companyowner.entity';

@Injectable()
export class CompanyOwnerService {
    constructor(
        @InjectRepository(CompanyOwner)
        private readonly companyOwnerRepository: Repository<CompanyOwner>,
    ) {}

    async findAll(): Promise<CompanyOwner[]> {
        return this.companyOwnerRepository.find();
    }

    async create(companyOwner: CompanyOwner): Promise<CompanyOwner> {
        return this.companyOwnerRepository.save(companyOwner);
    }

    async update(id: number, updateData: Partial<CompanyOwner>): Promise<CompanyOwner> {
        await this.companyOwnerRepository.update(id, updateData);
        const updatedOwner = await this.companyOwnerRepository.findOne({ where: { id } });
        if (!updatedOwner) {
            throw new NotFoundException(`CompanyOwner with ID ${id} not found`);
        }
        return updatedOwner;
    }

    async remove(id: number): Promise<void> {
        const deleteResult = await this.companyOwnerRepository.delete(id);
        if (!deleteResult.affected) {
            throw new NotFoundException(`CompanyOwner with ID ${id} not found`);
        }
    }
}