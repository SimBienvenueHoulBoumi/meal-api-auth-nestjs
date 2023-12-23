import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMealDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The id of the meal',
    example: '52959',
  })
  mealId: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The price of the meal',
    example: 12,
  })
  price: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The quantity of the meal',
    example: 1,
  })
  quantity: number;
}
