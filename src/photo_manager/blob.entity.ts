import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('blob')
export default class BlobEntity extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar", { length: 500, nullable: false, default: "image/png" })
    mime: string;

    // valore uuid
    @Column("varchar", { length: 500, nullable: false, unique: true })
    value: string;

    // nome file
    @Column("varchar", { length: 500, nullable: false })
    name: string;

    @CreateDateColumn()
    createdAt!: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}