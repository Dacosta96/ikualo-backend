import {
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class MovementCreateDTO {
  // @ApiProperty({ description: 'User ID associated with the movement' })
  // @IsOptional()
  // userId?: string;

  @ApiProperty({
    description: 'Type of movement',
    enum: ['income', 'expense'],
    example: 'income',
  })
  @IsNotEmpty()
  @IsEnum(['income', 'expense'])
  type: 'income' | 'expense';

  @ApiProperty({ description: 'Amount of the movement', example: 100.5 })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Description of the movement', required: false })
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Email User', required: false })
  @IsNotEmpty()
  emailUser: string;

  @ApiProperty({
    description: 'Date of the movement',
    required: false,
    example: '2024-03-20',
  })
  @IsOptional()
  @IsDateString()
  date?: string;
}

export class MovementUpdateDTO {
  @ApiProperty({ description: 'Movement ID' })
  @IsNotEmpty()
  _id: string;

  @ApiProperty({
    description: 'Type of movement',
    enum: ['income', 'expense'],
    required: false,
    example: 'income',
  })
  @IsOptional()
  @IsEnum(['income', 'expense'])
  type?: 'income' | 'expense';

  @ApiProperty({
    description: 'Amount of the movement',
    required: false,
    example: 100.5,
  })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty({ description: 'Description of the movement', required: false })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Date of the movement',
    required: false,
    example: '2024-03-20',
  })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiProperty({
    description: 'User ID associated with the movement',
    required: false,
  })
  @IsOptional()
  user?: Types.ObjectId;
}
