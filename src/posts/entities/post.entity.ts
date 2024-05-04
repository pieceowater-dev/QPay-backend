import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  identifier: string;

  @Column({ type: 'bigint', default: () => 'round(EXTRACT(epoch FROM now()))' })
  created: string;

  @Column({ type: 'boolean', default: false })
  stopped: boolean;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;
}
