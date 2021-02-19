import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  author: string;

  @Prop()
  description: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
