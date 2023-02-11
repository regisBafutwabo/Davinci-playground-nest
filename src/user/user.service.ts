import { validate } from 'class-validator';
import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  logger = new Logger('User Service');
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  // async findOne(username: string): Promise<UserEntity | undefined> {
  //   // return this.users.find((user) => user.username === username);
  // }

  async createUser(userData: CreateUserDto) {
    const { email, firstName, familyName, password, picture, username } =
      userData;

    // create a new user
    const newUser = new UserEntity();
    newUser.email = email;
    newUser.password = password;
    newUser.firstName = firstName || '';
    newUser.familyName = familyName || '';
    newUser.image = picture || '';
    newUser.username = username;

    const validate_error = await validate(newUser);
    if (validate_error.length > 0) {
      const _error = { username: 'UserInput is not valid check type' };
      throw new HttpException(
        { message: 'Input data validation failed', _error },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const user = await this.userRepo.save(newUser);
      this.logger.log('Successfully Saved the user', HttpStatus.ACCEPTED);

      return user;
    }
  }

  async findUser(username: string) {
    const getUser = this.userRepo
      .createQueryBuilder('user')
      .where('user.username= :username', { username });

    const user = await getUser.getOne();

    if (user) {
      return user;
    } else {
      return null;
    }
  }
}
