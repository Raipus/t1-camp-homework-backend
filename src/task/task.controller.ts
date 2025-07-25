import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('tasks')
@ApiTags('Задания')
export class TaskController {
  constructor(private readonly TaskService: TaskService) {}

  @ApiOperation({ summary: 'Получить все задания' })
  @Get()
  findAll() {
    return this.TaskService.findAll();
  }

  @ApiOperation({ summary: 'Получить конкретное задание' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.TaskService.findOne(id);
  }

  @ApiOperation({ summary: 'Удалить задание' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.TaskService.remove(id);
  }

  @ApiOperation({ summary: 'Изменить задание' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudio: Task) {
    return this.TaskService.update(id, updateStudio);
  }

  @ApiOperation({ summary: 'Создать задание' })
  @Post()
  create(@Body() createStudio: Task) {
    return this.TaskService.create(createStudio);
  }
}
