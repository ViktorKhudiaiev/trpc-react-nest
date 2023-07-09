import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private jwt: JwtService,
  ) {}

  async signup(user: Users): Promise<Users> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return await this.userRepository.save(user);
  }

  async validateUser(username: string, password: string): Promise<any> {
    // @ts-ignore
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

    async login(user: Users) {
        const payload = { username: user.username, sub: user.id };
        return {
          access_token: this.jwt.sign(payload),
        };
      }
}
