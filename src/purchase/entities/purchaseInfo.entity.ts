import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Base } from '../../common/entities/base.entity';

@Entity('purchaseInfo')
@Unique(['id'])
export class purchaseInfo extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  /** 주문번호 */
  @Column()
  Num: number;

  // 주문일(Date), 수령자(Name), 수령자 연락처(Phone), 결제 수단(Payment), Address1, Address2(받는사람)
  // @Column()
  // Date: D

  /** 요청사항 */
  @Column()
  Request: string;

  //eager : 유저정보 아이디만 가져오지 않고 다 불러옴, 원래는 user는 userId가 있음
  @ManyToOne((type) => User, (user) => user.purchaseInfoList, { eager: false })
  user: User;
}
