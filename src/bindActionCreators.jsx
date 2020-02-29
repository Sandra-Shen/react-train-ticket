import React,{ useState,PureComponent,useCallback,useEffect,useMemo,memo,useRef} from 'react';
import './App.css';
import {
  createAdd,
  createSet,
  createRemove,
  createToggle
} from './action'

function TodoItem(props) {
  const {
    todo:{
      id,text,complete
    },
    removeTodo,
    toggleTodo
  } = props;
  const onChange = () =>{
    // dispatch(createToggle(id))
    toggleTodo(id)
  }
  const onClickRemove = () =>{
    removeTodo(id)
    // dispatch(createRemove(id))
  }
  return <li className="todo-item">
    <input type="checkbox" onChange={onChange} checked={complete} />
    <label className={complete?'complete':''}>{text}</label>
    <button onClick={onClickRemove}>x</button>
  </li>
}

function Todos(props) {
  const { todos, removeTodo,toggleTodo } = props;

  return (
    <ul>
      {
        todos.map(todo => <TodoItem key={todo.id} todo={todo} removeTodo={removeTodo} toggleTodo={toggleTodo} />)
      }
    </ul>
  )
}
let idSeq = new Date()

function bindActionCreators(actionCreators,dispatch){
  const ret ={}
  for(let key in actionCreators){
    ret[key] = function(...args) {
      const actionCreator = actionCreators[key]
      const action = actionCreator(...args)
      dispatch(action)
    }
  }
  return ret;
}


function Control(props) {
  const { addTodo } = props;
  const inputText = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
    const textValue = inputText.current.value.trim();
    if(textValue.length === 0){
      return;
    }
    // addTodo({
    //   id: ++idSeq,
    //   text: textValue,
    //   complete: false
    // })
    // dispatch(createAdd({
    //   id: ++idSeq,
    //   text: textValue,
    //   complete: false
    // }))
    addTodo({
      id: ++idSeq,
      text: textValue,
      complete: false
    })
    inputText.current.value = ''
  }
  return (
    <div className="control">
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input type='text' className="new-todo" ref={inputText} placeholder="what needs to be done?" />
      </form>
    </div>
  )
}
const SL_KEY = '_todoskey_'
function App(props){
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) =>{
  }
  const removeTodo = (id) =>{
    // setTodos(todos => todos.filter(todo =>{
    //   return todo.id !== id
    // }))
  }
  const toggleTodo = (id) =>{
    // setTodos(todos => todos.map(todo => {
    //   return todo.id === id ? {
    //     ...todo,
    //     complete: !todo.complete
    //   } : todo
    // }))
  }

  const dispatch = useCallback((action) => {
    const { type,payload } = action;
    switch(type){
      case 'set':
        setTodos(payload)
        break;
      case 'add':
        setTodos(todos => [...todos,payload])
        break;
      case 'remove':
        setTodos(todos => todos.filter(todo =>{
          return todo.id !== payload
        }))
        break;
      case 'toggle':
        setTodos(todos => todos.map(todo => {
          return todo.id === payload ? {
            ...todo,
            complete: !todo.complete
          } : todo
        }))
        break;
      default:
    }
  },[])


  useEffect(() =>{
    const todos =JSON.parse(localStorage.getItem(SL_KEY) || '[]') 
    dispatch(createSet(todos))
  },[])
  useEffect(()=>{
    localStorage.setItem(SL_KEY,JSON.stringify(todos))
  },[todos])
  
  return (
    <div className="todo-list">
      <Control 
      {
        ...bindActionCreators({
          addTodo: createAdd
        },dispatch)
      }
      />
      <Todos todos={todos}
      {
        ...bindActionCreators({
          removeTodo:createRemove,
          toggleTodo:createToggle
        },dispatch)
      }
      />
    </div>
  )
}
export default App;
