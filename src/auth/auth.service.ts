import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';

import { Model } from 'mongoose';
import SignUpDto from './dto/signUp.dto';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import LoginDto from './dto/login.dto';
import { Role } from './schemas/role';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  // profile
  async getProfile(email: string): Promise<User> {
    return this.userModel.findOne({ email: email });
  }

  // register new user
  async signUpUser(signUpDto: SignUpDto): Promise<{ token: string }> {
    const encryptedPassword = await bcrypt.hash(signUpDto.password, 10);

    const createdUser = await this.userModel.create({
      ...signUpDto,
      role: Role.USER,
      password: encryptedPassword,
    });

    return { token: this.jwtService.sign({ id: createdUser._id }) };
  }

  async signUpAdmin(signUpDto: SignUpDto): Promise<{ token: string }> {
    const encryptedPassword = await bcrypt.hash(signUpDto.password, 10);

    const createdUser = await this.userModel.create({
      ...signUpDto,
      role: Role.ADMIN,
      password: encryptedPassword,
    });

    return { token: this.jwtService.sign({ id: createdUser._id }) };
  }

  // login user
  async login(loginDto: LoginDto): Promise<{ token: string; role: string }> {
    const user = await this.userModel.findOne({ email: loginDto.email });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { sub: user._id, username: user.email };

    return {
      token: await this.jwtService.signAsync(payload),
      role: user?.role,
    };
  }
}
