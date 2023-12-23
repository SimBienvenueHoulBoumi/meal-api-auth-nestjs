import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from './role';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  name: string;
  @Prop({
    unique: [true, 'Duplicate email entered'],
  })
  email: string;
  @Prop()
  password: string;

  @Prop({
    default: 'USER',
    enum: ['ADMIN', 'USER'],
  })
  role: Role.ADMIN | Role.USER;
}

export const UserSchema = SchemaFactory.createForClass(User);
