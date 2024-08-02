import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IndividualOwner } from './individualowner.entity';

@Injectable()
export class IndividualOwnerService {
    constructor(
        @InjectRepository(IndividualOwner)
        private readonly individualOwnerRepository: Repository<IndividualOwner>,
    ) {}

    async findAll(): Promise<IndividualOwner[]> {
        return this.individualOwnerRepository.find();
    }

    async create(individualOwner: IndividualOwner): Promise<IndividualOwner> {
        return this.individualOwnerRepository.save(individualOwner);
    }

    async update(id: number, updateData: Partial<IndividualOwner>): Promise<IndividualOwner> {
        await this.individualOwnerRepository.update(id, updateData);
        const updatedOwner = await this.individualOwnerRepository.findOne({ where: { id } });
        if (!updatedOwner) {
            throw new NotFoundException(`IndividualOwner with ID ${id} not found`);
        }
        return updatedOwner;
    }

    async remove(id: number): Promise<void> {
        const deleteResult = await this.individualOwnerRepository.delete(id);
        if (!deleteResult.affected) {
            throw new NotFoundException(`IndividualOwner with ID ${id} not found`);
        }
    }
}