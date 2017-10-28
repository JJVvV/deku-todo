let nextTodoId = 0
export const addTodo = (text) => {
  return {
    text, 
    id: nextTodoId++,
    type: 'ADD_TODO'
  }
}

export const toggleTodo = (item) => {
  return {
    id: item.id,
    type: 'TOGGLE_TODO'
  }
}

export const filterTodo = (type) => {
  return {
    type
  }
}

export const toggleAll = (flag) => {
  return {
    type: 'TOGGLE_ALL',
    flag
  }
}

export const removeTodo = (item) => {
  return {
    type: 'REMOVE_TODO',
    id: item.id
  }
}

export const removeCompleted = (item) => {
  return {
    type: 'REMOVE_COMPLETED'
  }
}

