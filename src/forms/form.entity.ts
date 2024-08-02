import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Institution } from '../institution/institution.entity';

@Entity()
export class Form {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    companyName: string;

    @Column()
    documentId: string;

    @ManyToOne(() => Institution, { nullable: false })
    @JoinColumn({ name: 'institution_id' })
    institution: Institution;
}