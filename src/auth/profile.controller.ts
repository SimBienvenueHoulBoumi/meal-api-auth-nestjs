import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { User } from './schemas/user.schema';

@Controller('profile')
@ApiTags('profile')
@ApiBearerAuth()
export class ProfileController {
  constructor(private authService: AuthService) {}

  @Get('/:username')
  @ApiOperation({
    summary: 'User profile',
  })
  @UseGuards(AuthGuard)
  async profile(@Param('username') username: string): Promise<User> {
    return this.authService.getProfile(username);
  }
}
