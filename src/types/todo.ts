export interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: Date
  updatedAt?: Date
}

export interface TodoContextType {
  todos: Todo[]
  addTodo: (text: string) => void
  toggleTodo: (id: number) => void
  deleteTodo: (id: number) => void
  updateTodo: (id: number, text: string) => void
}

export type TodoAction =
  | { type: 'ADD_TODO'; text: string }
  | { type: 'TOGGLE_TODO'; id: number }
  | { type: 'DELETE_TODO'; id: number }
  | { type: 'UPDATE_TODO'; id: number; text: string }