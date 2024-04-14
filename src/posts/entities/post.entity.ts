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
  created: number;
}
