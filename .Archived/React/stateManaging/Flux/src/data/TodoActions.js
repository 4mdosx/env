import TodoActionTypes from './TodoActionTypes'
import TodoDispatcher from './TodoDispatcher'

const Actions = {
  addTodo (text) {
    TodoDispatcher.dispatch({
      type: TodoActionTypes.ADD_TODO, text})
  },

  deleteTodo (id) {
    TodoDispatcher.dispatch({
      type: TodoActionTypes.DELETE_TODO, id})
  },

  toggleTodo (id) {
    TodoDispatcher.dispatch({
      type: TodoActionTypes.TOGGLE_TODO, id})
  }
}

export default Actions
