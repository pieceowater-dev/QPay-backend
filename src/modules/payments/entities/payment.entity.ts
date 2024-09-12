import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from '../../posts/entities/post.entity';
import { KaspiResult } from '../../kaspiapi/types/KaspiResult';

export enum PaymentType {
  CASH,
  CASHLESS,
}

@Entity('payments')
export class PaymentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  datetime?: string;

  @Column({ type: 'money' })
  sum: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    default: null,
    unique: true,
  })
  txn_id: string;

  @Column({ type: 'smallint', default: 0 })
  result: KaspiResult;

  @Column({ type: 'text', default: '' })
  comment: string;

  @Column({ type: 'smallint' })
  type: PaymentType;

  @ManyToOne(() => PostEntity, (p) => p.id, { eager: true })
  device: PostEntity | number;

  @Column({
    type: 'bigint',
    update: false,
    default: () => 'ROUND(EXTRACT(EPOCH FROM NOW()))',
  })
  createdAt?: string;
}
