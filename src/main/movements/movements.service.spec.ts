import { Test, TestingModule } from '@nestjs/testing';
import { MovementsService } from './movements.service';
import { getModelToken } from '@nestjs/mongoose';
import { MovementEntity } from 'src/database/entities/movement.entity';
import { UserEntity } from 'src/database/entities/user.entity';

describe('MovementsService', () => {
  let service: MovementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovementsService,
        {
          provide: getModelToken(MovementEntity.name),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: getModelToken(UserEntity.name),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MovementsService>(MovementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
