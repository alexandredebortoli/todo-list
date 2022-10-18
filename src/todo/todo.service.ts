import { Injectable } from "@nestjs/common";
import * as todos from "./mock/todo.json";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class todoService {
  getOi() {
    return 'Oi!';
  }
  getTodos() {
    return todos;
  }

  getById(id) {
    console.log(id)
    const todo = todos.data.find(todo => todo.uid === id);
    if(!todo) {
      return "Não encontrado"
    }
    return todo
  }
  createTodo(body) {
    const todo = {...body, uid: uuidv4()}
    todos.data.unshift(todo);
    if (todos.data.length != 3) {
      return {
        mensagem: `nome criado: ${todo.titulo}`, 
        error: false
      };
    }
    return {
      mensagem: `Não foi possível criar: ${todo.titulo}`,
      error: true
    };
  }

}