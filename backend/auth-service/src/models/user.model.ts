import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users") 
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ name: "password_hash" })
  password!: string;
}
