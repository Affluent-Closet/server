import { Exclude } from 'class-transformer';
import { IsDate } from 'class-validator';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
export class Base {
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  @IsDate()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  @IsDate()
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  @IsDate()
  @Exclude({ toPlainOnly: true })
  deletedAt?: Date;
}
