import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Form } from './form.entity';
import { Institution } from '../institution/institution.entity';

@Controller('api/forms')
export class FormsController {
    constructor(
        @InjectRepository(Form)
        private readonly formRepository: Repository<Form>,
        @InjectRepository(Institution)
        private readonly institutionRepository: Repository<Institution>,
    ) {}

    @Post()
    async createForm(@Body() body: any) {
        const { email, companyName, documentId, institutionSlug } = body;

        const institution = await this.institutionRepository.findOne({ where: { slug: institutionSlug } });
        if (!institution) {
            throw new NotFoundException('Institution not found');
        }

        const form = this.formRepository.create({
            email,
            companyName,
            documentId,
            institution,
        });

        const createdForm = await this.formRepository.save(form);

        return createdForm;
    }
}