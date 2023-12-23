import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export default class SignUpDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'username',
    example: 'user',
  })
  username: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  @ApiProperty({
    description: 'email',
    example: 'exemple@example.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({
    description: 'password',
    example: 'xxxxxxxxxxxxx',
  })
  password: string;
}
