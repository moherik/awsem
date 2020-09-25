import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from "typeorm";
import argon2 from "argon2";
import { IsNotEmpty, MinLength } from "class-validator";

@Entity()
@Unique(["username", "email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  username?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  googleProviderId?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  public hashPassword = async () => {
    if (this.password !== null)
      this.password = await argon2.hash(this.password!);
  };

  public checkPassword = async (password: string) => {
    return await argon2.verify(this.password!, password);
  };
}
