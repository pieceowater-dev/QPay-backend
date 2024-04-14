import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hashSync, genSaltSync } from 'bcrypt';
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

  @BeforeInsert()
  passwordEncrypt() {
    if (this.password !== undefined) {
      this.password = hashSync(this.password, genSaltSync(12));
    }
  }
}
