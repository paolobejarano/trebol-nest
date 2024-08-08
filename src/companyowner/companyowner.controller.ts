import { Controller, Get, Post, Put, Patch, Delete, Body, Param } from '@nestjs/common';
import { CompanyOwnerService } from './companyowner.service';
import { CompanyOwner } from './companyowner.entity';

@Controller('api/companyowners')
export class CompanyOwnerController {
    constructor(private readonly companyOwnerService: CompanyOwnerService) {}

    @Post()
    async create(@Body() companyOwner: CompanyOwner): Promise<CompanyOwner> {
        return this.companyOwnerService.create(companyOwner);
    }

    @Get()
    async findAll(): Promise<CompanyOwner[]> {
        return this.companyOwnerService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<CompanyOwner> {
        return this.companyOwnerService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateData: Partial<CompanyOwner>): Promise<CompanyOwner> {
        return this.companyOwnerService.update(id, updateData);
    }

    @Patch(':id')
    async partialUpdate(@Param('id') id: number, @Body() updateData: Partial<CompanyOwner>): Promise<CompanyOwner> {
        return this.companyOwnerService.update(id, updateData);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.companyOwnerService.remove(id);
    }
}