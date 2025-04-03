import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'movements',
})
export class MovementEntity extends Document {
  @Prop({ type: Types.ObjectId, ref: 'UserEntity', required: true })
  user: Types.ObjectId;

  @Prop({ required: true, enum: ['income', 'expense'] })
  type: 'income' | 'expense';

  @Prop({ required: true })
  amount: number;

  @Prop()
  description: string;

  @Prop()
  date: Date;
}

export const MovementEntitySchema =
  SchemaFactory.createForClass(MovementEntity);
