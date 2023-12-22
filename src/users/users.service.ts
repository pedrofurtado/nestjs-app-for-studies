import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'smith',
      access_token: 'ajshdkjashdjkas'
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      access_token: '89d79g87d89fg789df'
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findOneByAcessToken(access_token: string): Promise<User | undefined> {
    return this.users.find(user => user.access_token === access_token);
  }
}
