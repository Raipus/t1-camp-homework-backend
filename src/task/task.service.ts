import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(taskNew: Task): Promise<Task> {
    const task = this.taskRepository.create();
    task.title = taskNew.title;
    task.description = taskNew.description;
    task.category = taskNew.category;
    task.priority = taskNew.priority;
    task.status = taskNew.status;

    await this.taskRepository.save(task);

    return task;
  }

  async findOne(id: string): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({ where: { id } });

      if (!task) {
        throw new NotFoundException(`Задание с id ${id} не найдено`);
      }

      return task;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.taskRepository.find();
    return tasks;
  }

  async update(id: string, updatedTask: Task): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({ where: { id } });

      if (!task) {
        throw new NotFoundException(`Задание с id ${id} не найдено`);
      }

      task.title = updatedTask.title;
      task.description = updatedTask.description;
      task.category = updatedTask.category;
      task.priority = updatedTask.priority;
      task.status = updatedTask.status;

      await this.taskRepository.save(task);

      return task;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const task = await this.taskRepository.findOne({ where: { id } });

      if (!task) {
        throw new NotFoundException(`Задание с id ${id} не найдено`);
      }

      this.taskRepository.delete({ id });

      return HttpStatus.OK;
    } catch (error) {
      throw error;
    }
  }
}
