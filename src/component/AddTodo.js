import stateful from 'deku-state'
// import stateful from '../stateful'
import {element} from 'deku'
import {addTodo} from '../actions'


let onKeyUp = (state, setState, dispatch) => (e) => {

  
  setState({value:e.target.value})
  
  //enter
  if(e.which === 13){
    if (!e.target.value.trim()) {
      return
    }
    dispatch(addTodo(state.value))
    setState({value:''})
  }
  

  
}

let AddTodo = {

  render({path, state, setState, dispatch}){ 
    return <header class="header">
      <h1>todos</h1>
      <input 
        class="new-todo" 
        placeholder="What needs to be done?" 
        autofocus 
        onKeyUp={onKeyUp(state, setState, dispatch)}
        value={state.value}
      />
    </header>
  },

  initialState(){
    return {}
  },

  shouldUpdate({prevState, state}){
    return prevState.value !== state.value
  },

  onUpdate({state}){
    
  },

  onCreate({path}){
    
  }
}


export default stateful(AddTodo)