// src/individualowner/individualowner.controller.ts
import { Controller, Get, Param, Post, Put, Patch, Delete, Body, Query, NotFoundException } from '@nestjs/common';
import { IndividualOwnerService } from './individualowner.service';
import { IndividualOwner } from './individualowner.entity';


@Controller('api/individualowners')
export class IndividualOwnerController {
    constructor(private readonly individualOwnerService: IndividualOwnerService) {}

    // GET /api/individualowners
    @Get()
    async findAll(
      @Query('level') level?: number,
      @Query('form_id') formId?: number,
    ): Promise<IndividualOwner[]> {
        return this.individualOwnerService.findAll(level, formId);
    }

    // GET /api/individualowners/:id
    @Post()
    async create(@Body() individualOwner: IndividualOwner): Promise<IndividualOwner> {
        return this.individualOwnerService.create(individualOwner);
    }

    // GET /api/individualowners/:id
    @Put(':id')
    async update(@Param('id') id: number, @Body() updateData: Partial<IndividualOwner>): Promise<IndividualOwner> {
        return this.individualOwnerService.update(id, updateData);
    }

    @Patch(':id')
    async partialUpdate(@Param('id') id: number, @Body() updateData: Partial<IndividualOwner>): Promise<IndividualOwner> {
        return this.individualOwnerService.update(id, updateData);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.individualOwnerService.remove(id);
    }
}