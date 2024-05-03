import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
