import stateful from 'deku-state'
// import stateful from '../stateful'
import {element} from 'deku'
import { toggleTodo , toggleAll, removeTodo} from './../actions'

let onToggleTodo = (dispatch, item) => (e) => {
  dispatch(toggleTodo(item))
}

let onToggleAll = (dispatch) => (e) => {
  dispatch(toggleAll(e.target.checked))
}

let onRemoveTodo = (dispatch, item) => (e) => {
  dispatch(removeTodo(item))
}

let TodoList = ({props, dispatch}) => (
  <section class="main">
    <input 
      id="toggle-all" 
      class="toggle-all" 
      onChange={onToggleAll(dispatch)}
      checked={props.todos.filter(item=>item.completed).length==props.todos.length}
      type="checkbox" />
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
    {props.todos.map((item, index) => (
      <li 
        key={item.id}
        class={item.completed?'completed':''}>
      <div class="view">
        <input class="toggle" type="checkbox"
          checked={item.completed} 
          onChange={onToggleTodo(dispatch, item)} />
        <label>{item.text}</label>
        <button class="destroy" onClick={onRemoveTodo(dispatch, item)}></button>
      </div>
      <input class="edit" value="Create a TodoMVC template" />
    </li>
      ))}
    </ul>
  </section>
)


export default stateful(TodoList)