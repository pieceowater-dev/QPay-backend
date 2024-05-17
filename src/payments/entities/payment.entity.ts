import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostEntity } from '../../posts/entities/post.entity';

export enum PaymentType {
  CASH,
  CASHLESS,
}

@Entity('payments')
export class PaymentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', update: false, default: null })
  date: string;

  @Column({ type: 'bigint', update: false, default: null })
  datetime: string;

  @Column({ type: 'money' })
  sum: string;

  @Column({ type: 'varchar', length: 255 })
  txn_id: string;

  @Column({ type: 'varchar', length: 5 })
  result: string;

  @Column({ type: 'text', default: '' })
  comment: string;

  @Column({ type: 'enum', enum: PaymentType, default: PaymentType.CASHLESS })
  @Index()
  type: PaymentType;

  @ManyToOne(() => PostEntity, (p) => p.id, { eager: true })
  device: PostEntity | number;
}
