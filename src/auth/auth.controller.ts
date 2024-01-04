import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import SignUpDto from './dto/signUp.dto';
import LoginDto from './dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup-user')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Register new user',
  })
  async signUpUser(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUpUser(signUpDto);
  }

  @Post('/signup-admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Register new admin',
  })
  async signUpAdmin(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUpAdmin(signUpDto);
  }

  @Post('/login')
  @ApiOperation({
    summary: 'Login user',
  })
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }
}
