import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Institution {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    logo: string;

    @Column()
    color: string;

    @Column({ unique: true })
    slug: string;
}