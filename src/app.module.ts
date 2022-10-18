import { TodoModule } from './todo/todo.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
