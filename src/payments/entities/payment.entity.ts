import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from '../../posts/entities/post.entity';

@Entity('payments')
export class PaymentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint', update: false })
  date: string;

  @Column({ type: 'money' })
  sum: string;

  @Column({ type: 'varchar', length: 255 })
  txn_id: string;

  @Column({ type: 'varchar', length: 5 })
  result: string;

  @Column({ type: 'text', default: '' })
  comment: string;

  @ManyToOne(() => PostEntity, (p) => p.id, { eager: true })
  device: PostEntity | number;
}
