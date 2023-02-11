import * as argon2 from 'argon2';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 32 })
  username: string;

  @Column()
  firstName?: string;

  @Column()
  familyName?: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await argon2.hash(this.password);
    } else {
      this.password = undefined;
    }
  }

  @Column()
  image?: string;
}
