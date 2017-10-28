import App from './component/App'
import {element, createApp} from 'deku'
import { createStore } from 'redux'
import reducers from './reducers'
import "todomvc-app-css/index.css"
let store = createStore(reducers)

let render = createApp(document.body, store.dispatch)

store.subscribe(() => {
  render(
    <App {...store.getState()}></App>
  )
})

store.dispatch({type: 'init'})

