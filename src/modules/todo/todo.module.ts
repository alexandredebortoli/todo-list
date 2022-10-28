import { todoService } from './todo.service';
import { todoController } from './todo.controller';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { Transport, ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TODO_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: `todoService`,
          url: `0.0.0.0:5000`,
          protoPath: join(__dirname, '../../proto/todo-service.proto'),
        },
      },
    ]),
  ],
  controllers: [todoController],
  providers: [todoService],
})
export class TodoModule {}
