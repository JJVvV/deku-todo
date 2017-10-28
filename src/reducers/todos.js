
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state.map(todo =>
        (todo.id === action.id) 
          ? {...todo, completed: !todo.completed}
          : todo
      )
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.id)
    
    case 'REMOVE_COMPLETED':
      return state.filter(todo => !todo.completed)

    case 'TOGGLE_ALL':
      return state.map(todo =>({...todo,completed:action.flag}))
    default:
      return state
  }
}

export default todos