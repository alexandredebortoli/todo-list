import { todoService } from './todo.service';
import { Controller, Get, Post, Body, Param } from '@nestjs/common'

@Controller()
export class todoController {
  constructor(private service: todoService) {}

  @Get()
  getTodo() {
    return this.service.getTodos();
  }

  @Get("/:id")
  getById(@Param("id") id) {
    return this.service.getById(id);
  }


  @Post("/create")
  createTodo(@Body() body) {

    return this.service.createTodo(body);
  }
}
