import React,{ useState,PureComponent,useCallback,useEffect,useMemo,memo,useRef} from 'react';
import './App.css';

function TodoItem(props) {
  const {
    todo:{
      id,text,complete
    },
    dispatch
  } = props;
  const onChange = () =>{
    dispatch({type:'toggle',payload:id})
    // toggleTodo(id)
  }
  const onClickRemove = () =>{
    // removeTodo(id)
    dispatch({type:'remove',payload:id})
  }
  return <li className="todo-item">
    <input type="checkbox" onChange={onChange} checked={complete} />
    <label className={complete?'complete':''}>{text}</label>
    <button onClick={onClickRemove}>x</button>
  </li>
}

function Todos(props) {
  const { todos, dispatch } = props;

  return (
    <ul>
      {
        todos.map(todo => <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />)
      }
    </ul>
  )
}
let idSeq = new Date()
function Control(props) {
  const { dispatch } = props;
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
    dispatch({type:'add',payload:{
      id: ++idSeq,
      text: textValue,
      complete: false
    }})
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
    dispatch({type:'add',payload:todo})
  }
  const removeTodo = (id) =>{
    // setTodos(todos => todos.filter(todo =>{
    //   return todo.id !== id
    // }))
    dispatch({type:'remove',payload:id})
  }
  const toggleTodo = (id) =>{
    // setTodos(todos => todos.map(todo => {
    //   return todo.id === id ? {
    //     ...todo,
    //     complete: !todo.complete
    //   } : todo
    // }))
    dispatch({type:'toggle',payload:id})
  }

  const dispatch = (action) => {
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
  }


  useEffect(() =>{
    const todos =JSON.parse(localStorage.getItem(SL_KEY) || '[]') 
    dispatch({type:'set',payload:todos})
  },[])
  useEffect(()=>{
    localStorage.setItem(SL_KEY,JSON.stringify(todos))
  },[todos])
  
  return (
    <div className="todo-list">
      <Control dispatch={dispatch} />
      <Todos dispatch={dispatch} todos={todos} />
    </div>
  )
}
export default App;
