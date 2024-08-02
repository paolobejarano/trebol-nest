import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Institution } from './institution.entity';
import { createSlug } from './slug.util'; // Create a utility function to generate slugs

@Injectable()
export class InstitutionService {
    constructor(
        @InjectRepository(Institution)
        private readonly institutionRepository: Repository<Institution>,
    ) {}

    async findAll(): Promise<Institution[]> {
        return this.institutionRepository.find();
    }

    async create(institution: Institution): Promise<Institution> {
        institution.slug = createSlug(institution.name); // Generate the slug from the name
        return this.institutionRepository.save(institution);
    }

    async update(id: number, updateData: Partial<Institution>): Promise<Institution> {
        if (updateData.name) {
            updateData.slug = createSlug(updateData.name); // Update the slug if the name changes
        }
        await this.institutionRepository.update(id, updateData);
        const updatedInstitution = await this.institutionRepository.findOne({ where: { id } });
        if (!updatedInstitution) {
            throw new NotFoundException(`Institution with ID ${id} not found`);
        }
        return updatedInstitution;
    }

    async remove(id: number): Promise<void> {
        const deleteResult = await this.institutionRepository.delete(id);
        if (!deleteResult.affected) {
            throw new NotFoundException(`Institution with ID ${id} not found`);
        }
    }
}