import React,{ useState,PureComponent,useCallback,useEffect,useMemo,memo,useRef} from 'react';
import './App.css';

// const Counter = memo(function Counter(props) {
//   //count不变 Counter就不会重新渲染
//   console.log('render')
//   return (
//     <h1 onClick={props.onClick}>{props.count}</h1>
//   )
// })

class Counter extends PureComponent{
  speak() {
    console.log(`now count is: ${this.props.count}`)
  }
  render() {
    const {props} = this
    return (
      <h1 onClick={props.onClick}>{props.count}</h1>
    )
  }
}
function Ref(props){
  const [count,setCount] = useState(0)
  const counterRef = useRef()
  let timer = useRef()
  const double = useMemo(()=>{
    return count *2
  },[count===3])//在渲染之前完成，其返回值可以参与渲染
  const half = useMemo(()=>{
    return double/4
  },[double])
  // const onClick = useMemo(() =>{
  //   console.log('Click')
  // },[])
  // useMemo(()=>fn)
  const onClick = useCallback(() =>{
    console.log('Click')
    counterRef.current.speak()
  },[counterRef])

  useEffect(()=>{
    timer.current = setInterval(()=>{
      setCount(count => count + 1)
    },1000)
  },[])
  useEffect(()=>{
    if(count > 10){
      clearInterval(timer.current)
      setCount(0)
    }
  })
  //useCallback(fn)
  return (
    <div>
      <button onClick={()=>{setCount(count+1)}}>click{count}</button>
        <Counter ref={counterRef} count={double} onClick={onClick} />
        <p>double:{double}</p>
        <p>half:{half}</p>
    </div>
  )
}
export default Ref;
