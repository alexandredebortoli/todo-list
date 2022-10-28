import { HealthModule } from './healthcheck/health.module';
import { TodoModule } from './modules/todo/todo.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [TodoModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
