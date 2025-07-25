import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [Task, TypeOrmModule.forFeature([Task])],
})
export class TaskModule {}
