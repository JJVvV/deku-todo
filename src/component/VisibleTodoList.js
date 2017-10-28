import stateful from 'deku-state'
// import stateful from '../stateful'
import {element} from 'deku'
import { toggleTodo } from './../actions'
import TodoList from './TodoList'

let onClick = (dispatch, item) => (e) => {
  dispatch(toggleTodo(item))
}
let filterTodos = (todos, visibilityFilter) => {
  switch(visibilityFilter){
    case "ALL":
      return todos
    case 'ACTIVE':
      return todos.filter(item => !item.completed)
    case 'COMPLETED':
      return todos.filter(item => item.completed)
  }
}

let VisibleTodoList = ({props, dispatch}) => (
  <div>
    <TodoList todos={filterTodos(props.todos, props.visibilityFilter)} />
  </div>
)


export default stateful(VisibleTodoList)