import stateful from 'deku-state'
// import stateful from '../stateful'
import {element} from 'deku'
import FilterLink from './FilterLink'
import {removeCompleted} from '../actions'

let onRemoveCompleted = (dispatch) => (e) => {
  dispatch(removeCompleted())
}

let remained = (todos) => todos.filter(item => !item.completed).length

let Footer = ({props, dispatch}) => (

  <footer class="footer">
    <span class="todo-count"><strong>{remained(props.todos)}</strong> item left</span>
    <ul class="filters">
      <FilterLink {...props} filter="ALL">
        All
      </FilterLink>
      <FilterLink {...props} filter="ACTIVE">
        Active
      </FilterLink>
      <FilterLink {...props} filter="COMPLETED">
        Completed
      </FilterLink>
    </ul>
    <button class="clear-completed" onClick={onRemoveCompleted(dispatch)}>Clear completed</button>
  </footer>

)


export default stateful(Footer)