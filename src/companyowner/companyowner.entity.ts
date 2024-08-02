import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Form } from '../forms/form.entity';

@Entity()
export class CompanyOwner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    document_type: string;

    @Column()
    document_number: string;

    @Column()
    legal_name: string;

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