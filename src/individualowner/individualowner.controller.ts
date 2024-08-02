// src/individualowner/individualowner.controller.ts
import { Controller, Get, Param, Post, Body, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IndividualOwner } from './individualowner.entity';
import { Form } from '../forms/form.entity';

@Controller('api/individualowners')
export class IndividualOwnerController {
    constructor(
        @InjectRepository(IndividualOwner)
        private readonly individualOwnerRepository: Repository<IndividualOwner>,
        @InjectRepository(Form)
        private readonly formRepository: Repository<Form>,
    ) {}

    @Get('form/:formId')
    async getByFormId(@Param('formId') formId: number) {
        return this.individualOwnerRepository.find({ where: { form: { id: formId } } });
    }

    @Post()
    async create(@Body() body: any) {
        const { document_type, document_id, first_name, last_name, level, parent_id, form_id, file_url, ownership } = body;

        const form = await this.formRepository.findOne(form_id);
        if (!form) {
            throw new NotFoundException('Form not found');
        }

        const parent = parent_id ? await this.individualOwnerRepository.findOne(parent_id) : null;

        const individualOwner = this.individualOwnerRepository.create({
            document_type,
            document_id,
            first_name,
            last_name,
            level,
            parent,
            form,
            file_url,
            ownership
        });

        return this.individualOwnerRepository.save(individualOwner);
    }
}