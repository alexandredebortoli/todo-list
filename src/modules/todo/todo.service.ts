import { createType, TodoType, IdType } from './todo.type';
import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import * as todos from './mock/todo.json';
import { v4 as uuidv4 } from 'uuid';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class todoService {
  private logger = new Logger(todoService.name);

  private grpcService;
  constructor(@Inject('TODO_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.grpcService = this.client.getService('TodoService');
  }

  async getAll(): Promise<TodoType[]> {
    this.logger.debug('http request: get all');
    return await this.grpcService.getAll({}).toPromise();
  }
  async getById(id: string): Promise<TodoType> {
    this.logger.debug('http request: get by id');
    return await this.grpcService.getById({ uid: id }).toPromise();
  }
  async create(body: TodoType): Promise<void> {
    this.logger.debug('http request: create');
    await this.grpcService.create({ ...body }).toPromise();
  }

  async edit(id: string, body: TodoType): Promise<void> {
    this.logger.debug('http request: edit');
    body.uid = id;
    await this.grpcService.edit({ ...body }).toPromise();
  }

  async editStatus(id: string): Promise<void> {
    this.logger.debug('http request: edit status');
    await this.grpcService.editStatus({ uid: id }).toPromise();
  }
}
