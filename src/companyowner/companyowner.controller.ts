import { Controller, Get, Param, Post, Body, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyOwner } from './companyowner.entity';
import { Form } from '../forms/form.entity';

@Controller('api/companyowners')
export class CompanyOwnerController {
    constructor(
        @InjectRepository(CompanyOwner)
        private readonly companyOwnerRepository: Repository<CompanyOwner>,
        @InjectRepository(Form)
        private readonly formRepository: Repository<Form>,
    ) {}

    @Get('form/:formId')
    async getByFormId(@Param('formId') formId: number) {
        return this.companyOwnerRepository.find({ where: { form: { id: formId } } });
    }

    @Post()
    async create(@Body() body: any) {
        const { document_type, document_number, legal_name, level, parent_id, form_id, file_url, ownership } = body;

        const form = await this.formRepository.findOne(form_id);
        if (!form) {
            throw new NotFoundException('Form not found');
        }

        const parent = parent_id ? await this.companyOwnerRepository.findOne(parent_id) : null;

        const companyOwner = this.companyOwnerRepository.create({
            document_type,
            document_number,
            legal_name,
            level,
            parent,
            form,
            file_url,
            ownership
        });

        return this.companyOwnerRepository.save(companyOwner);
    }
}