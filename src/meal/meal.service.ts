import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { Meal } from './schemas/meal.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MealService {
  constructor(@InjectModel(Meal.name) private mealModel: Model<Meal>) {}

  create(createMealDto: CreateMealDto): Promise<Meal> {
    return new this.mealModel(createMealDto).save();
  }

  findAll(): Promise<Meal[]> {
    return this.mealModel.find().exec();
  }

  findOne(id: string) {
    return this.mealModel.find({ _id: id }).exec();
  }

  async update(id: string, updateMealDto: UpdateMealDto) {
    const data = {
      ...updateMealDto,
    } as Meal;

    await this.mealModel.findByIdAndUpdate(id, data, { new: true });
    return this.findOne(id);
  }

  removeOne(id: string) {
    this.mealModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
