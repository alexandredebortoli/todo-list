import { createType } from './todo.type';
import { todoService } from './todo.service';
import { Controller, Get, Post, Body, Param, Put, Patch } from '@nestjs/common'

@Controller("todo")
export class todoController {
  constructor(private service: todoService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get("/:id")
  getById(@Param("id") id: string) {
    return this.service.getById(id);
  }

  @Post("/create")
  create(@Body() body: createType) {
    return this.service.create(body);
  }

  @Put("/edit/:id")
  edit(@Param("id") id: string, @Body() body: createType) {
    return this.service.edit(id, body);
  }

  @Patch("/status/:id")
  editStatus(@Param("id") id: string) {
    return this.service.editStatus(id);
  }
}
