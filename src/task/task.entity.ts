import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('task')
export class Task {
  @IsUUID()
  @ApiProperty({ example: '1', description: 'ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Название',
    description: 'Название',
  })
  @Column()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Краткое описание задачи',
    description: 'Описание',
  })
  @Column()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Фича',
    description: 'Категория',
  })
  @Column()
  category: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Средний',
    description: 'Приоритет',
  })
  @Column()
  priority: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Предстоит',
    description: 'Статус',
  })
  @Column()
  status: string;
}
