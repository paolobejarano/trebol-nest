import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IndividualOwner } from './individualowner.entity';

@Injectable()
export class IndividualOwnerService {
    constructor(
      @InjectRepository(IndividualOwner)
      private individualOwnerRepository: Repository<IndividualOwner>,
    ) {}

    async create(individualOwner: IndividualOwner): Promise<IndividualOwner> {
        return this.individualOwnerRepository.save(individualOwner);
    }

    async findAll(level?: number, formId?: number): Promise<IndividualOwner[]> {
        const queryBuilder = this.individualOwnerRepository.createQueryBuilder('individualOwner')
          .leftJoinAndSelect('individualOwner.form', 'form');

        if (level !== undefined) {
            queryBuilder.andWhere('individualOwner.level = :level', { level });
        }

        if (formId !== undefined) {
            queryBuilder.andWhere('individualOwner.form_id = :formId', { formId });
        }

        return queryBuilder.getMany();
    }

    async findOne(id: number): Promise<IndividualOwner> {
        const individualOwner = await this.individualOwnerRepository.findOne({
            where: { id },
            relations: ['form'],
        });
        if (!individualOwner) {
            throw new NotFoundException(`IndividualOwner with ID ${id} not found`);
        }
        return individualOwner;
    }

    async update(id: number, updateData: Partial<IndividualOwner>): Promise<IndividualOwner> {
        await this.individualOwnerRepository.update(id, updateData);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        const result = await this.individualOwnerRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`IndividualOwner with ID ${id} not found`);
        }
    }
}