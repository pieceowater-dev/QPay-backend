import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ type: 'bigint', default: () => 'round(EXTRACT(epoch FROM now()))' })
  created: string;

  @Column({ type: 'bigint', nullable: true, default: null })
  stopped: string;

  @Column({ type: 'bigint', nullable: true, default: null })
  deleted: string;
}
