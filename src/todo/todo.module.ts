import { todoService } from './todo.service';
import { todoController } from './todo.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [todoController],
  providers: [todoService],
})
export class TodoModule {}
