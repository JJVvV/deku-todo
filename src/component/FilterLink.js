import stateful from 'deku-state'
// import stateful from '../stateful'
import {element} from 'deku'
import {filterTodo} from '../actions'

let onClick = (dispatch, type) => (e) => {
  dispatch(filterTodo(type))
}
let FilterLink = {
  render({children, props, dispatch}){
    return <li 
      onClick={onClick(dispatch, props.filter)}>
        <a class={props.visibilityFilter==props.filter?'selected':''} 
        >{children}</a>
    </li>
  }

}



export default stateful(FilterLink)