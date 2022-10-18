import { createType } from './todo.type';
import { HttpException, Injectable, Logger } from "@nestjs/common"
import * as todos from "./mock/todo.json"
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class todoService {
  private logger = new Logger(todoService.name)

  getAll() {
    this.logger.debug("http request: get all")
    return todos
  }
  getById(id: string) {
    this.logger.debug("http request: get by id")
    try {
      const todo = todos.data.find(todo => todo.uid === id)

      if (!todo) {
        throw new HttpException("not found", 404)
      }
      
      return todo
    } catch (error) {
      this.logger.error(error.message)
      throw new HttpException(error.message, error.status)
    }
    
  }
  create(body) {
    this.logger.debug("http request: create")

    const todo = {...body, uid: uuidv4()}
    todos.data.unshift(todo);
    if (todos.data.length != 3) {
      return {
        mensagem: `added: ${todo.title}`, 
        error: false
      };
    }
    return {
      mensagem: `failed to add: ${todo.title}`,
      error: true
    };
  }

  edit(id: string, body: createType) {
    this.logger.debug("http request: edit")
    try {
      const todo = todos.data.find(todo => todo.uid === id)
      if (!todo) {
        throw new HttpException("not found", 404)
      }
      const newTodo = {...body}

      if (todo != newTodo) {
        if(newTodo.title) {
          todo.title = newTodo.title
        }
        if(newTodo.description) {
          todo.description = newTodo.description
        }
        if(newTodo.time) {
          todo.time = newTodo.time
        }
        if(newTodo.completed) {
          todo.completed = newTodo.completed
        }
      }

      return todo
    } catch (error) {
      this.logger.error(error.message)
      throw new HttpException(error.message, error.status)
    }
  }

  editStatus(id) {
    this.logger.debug("http request: edit status")
    try {
      const todo = todos.data.find(todo => todo.uid === id)
      if (!todo) {
        throw new HttpException("not found", 404)
      }
      todo.completed = !todo.completed
      return todo
    } catch (error) {
      this.logger.error(error.message)
      throw new HttpException(error.message, error.status)
    }
  }

}