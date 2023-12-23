import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import SignUpDto from './dto/signUp.dto';
import LoginDto from './dto/login.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { User } from './schemas/user.schema';

@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Register new user',
  })
  async signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  @ApiOperation({
    summary: 'Login user',
  })
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Get('/profile/:username')
  @ApiOperation({
    summary: 'User profile',
  })
  @UseGuards(AuthGuard)
  async profile(@Param('username') username: string): Promise<User> {
    return this.authService.getProfile(username);
  }
}
