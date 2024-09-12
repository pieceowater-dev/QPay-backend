import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hashSync, genSaltSync } from 'bcrypt';

export enum UserRoles {
  ADMINISTRATOR = 'ADMINISTRATOR',
  MANAGER = 'MANAGER',
}

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, select: false })
  password: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.MANAGER })
  role: UserRoles;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  passwordEncrypt() {
    if (this.password !== undefined) {
      this.password = hashSync(this.password, genSaltSync(12));
    }
  }
}
