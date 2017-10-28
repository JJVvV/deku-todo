import stateful from 'deku-state'
import {element} from 'deku'
import AddTodo from './AddTodo'
import VisibleTodoList from './VisibleTodoList'
import Footer from './Footer'
import visibleFilter from '../reducers/visibilityFilter';

let App = ({props}) => (
  <section class="todoapp">
    <AddTodo />
    <VisibleTodoList {...props}  />
    <Footer {...props} />
  </section>






)


export default stateful(App)