import { Todo } from '../types/todo'
import { storage } from '../utils/storage'
import { STORAGE_KEYS } from '../constants/app'

export class TodoService {
  private static readonly STORAGE_KEY = STORAGE_KEYS.TODOS

  static loadTodos(): Todo[] {
    return storage.get<Todo[]>(this.STORAGE_KEY, [])
  }

  static saveTodos(todos: Todo[]): void {
    storage.set(this.STORAGE_KEY, todos)
  }

  static createTodo(text: string): Todo {
    return {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date()
    }
  }

  static updateTodo(todo: Todo, updates: Partial<Todo>): Todo {
    return {
      ...todo,
      ...updates,
      updatedAt: new Date()
    }
  }

  static exportTodos(todos: Todo[]): string {
    return JSON.stringify(todos, null, 2)
  }

  static importTodos(jsonData: string): Todo[] {
    try {
      const parsed = JSON.parse(jsonData)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      throw new Error('Format JSON invalide')
    }
  }
}