import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('meal')
@ApiTags('meal')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a meal',
  })
  create(@Body() createMealDto: CreateMealDto) {
    return this.mealService.create(createMealDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all meal',
  })
  findAll() {
    return this.mealService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one meal by id',
  })
  findOnlyOne(@Param('id') id: string) {
    return this.mealService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update one meal by id',
  })
  update(@Param('id') id: string, @Body() updateMealDto: UpdateMealDto) {
    return this.mealService.update(id, updateMealDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete one meal by id',
  })
  remove(@Param('id') id: string) {
    return this.mealService.removeOne(id);
  }
}
