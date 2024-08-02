import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CompanyOwner } from '../companyowner/companyowner.entity';
import { Form } from '../forms/form.entity';

@Entity()
export class IndividualOwner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    document_type: string;

    @Column()
    document_id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    level: number;

    @ManyToOne(() => CompanyOwner, companyOwner => companyOwner.id, { nullable: true })
    @JoinColumn({ name: 'parent_id' })
    parent: CompanyOwner;

    @ManyToOne(() => Form, { nullable: false })
    @JoinColumn({ name: 'form_id' })
    form: Form;

    @Column()
    file_url: string;

    @Column('decimal', { precision: 5, scale: 4 })
    ownership: number;
}