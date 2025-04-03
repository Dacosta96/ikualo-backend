import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MovementsService } from './movements.service';
import { MovementCreateDTO } from '../dtos/movement.dto';
import { MovementEntity } from 'src/database/entities/movement.entity';
import { ClerkAuthGuard } from 'src/common/clerk-auth.guard';

@ApiTags('Movements')
@Controller('movements')
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}

  @ApiOperation({ summary: 'Create a new movement' })
  @ApiResponse({ status: 201, description: 'Movement created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post()
  create(
    @Body(new ValidationPipe()) movementCreateDTO: MovementCreateDTO,
  ): Promise<MovementEntity> {
    return this.movementsService.create(movementCreateDTO);
  }

  @UseGuards(ClerkAuthGuard)
  @ApiOperation({ summary: 'Get all movements' })
  @ApiResponse({ status: 200, description: 'Return all movements' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing authentication',
  })
  @Get()
  findAll(): Promise<MovementEntity[]> {
    return this.movementsService.findAll();
  }

  @ApiOperation({ summary: 'Get a movement by ID' })
  @ApiParam({ name: 'id', description: 'Movement ID' })
  @ApiResponse({ status: 200, description: 'Return the movement' })
  @ApiResponse({ status: 404, description: 'Movement not found' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<MovementEntity> {
    return this.movementsService.findOne(id);
  }

  @ApiOperation({ summary: 'Delete a movement' })
  @ApiParam({ name: 'id', description: 'Movement ID' })
  @ApiResponse({ status: 200, description: 'Movement deleted successfully' })
  @ApiResponse({ status: 404, description: 'Movement not found' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<MovementEntity> {
    return this.movementsService.remove(id);
  }

  @ApiOperation({ summary: 'Get movements by user Email' })
  @ApiParam({ name: 'emailUser', description: 'User Email', type: 'string' }) // Usa @ApiParam en lugar de @ApiQuery
  @ApiResponse({ status: 200, description: 'Return movements for the user' })
  @Get('user/:emailUser')
  findByUser(@Param('emailUser') emailUser: string): Promise<MovementEntity[]> {
    console.log('Email User:', emailUser);
    return this.movementsService.findByUser(emailUser);
  }
}
