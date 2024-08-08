import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Institution } from './institution.entity';
import { InstitutionService } from './institution.service';

@Controller('api/institutions')
export class InstitutionController {
    constructor(
        @InjectRepository(Institution)
        private readonly institutionRepository: Repository<Institution>,
        private readonly institutionService: InstitutionService,
    ) {}

    @Get(':slug')
    async getInstitutionBySlug(@Param('slug') slug: string) {
        const institution = await this.institutionRepository.findOne({ where: { slug } });
        if (!institution) {
            throw new NotFoundException('Institution not found');
        }
        return institution;
    }

    @Post()
    async createInstitution(@Body() institution: Institution): Promise<Institution> {
        return this.institutionService.create(institution);
    }
}