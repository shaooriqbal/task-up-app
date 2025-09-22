import { Document } from 'mongoose';
import { User } from '../../common/auth/users/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PersonDocument = Person & Document;

@Schema({ timestamps: true })
export class Person extends User {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  phone: string;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
