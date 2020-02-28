import React,{ useState,PureComponent,useCallback,useEffect,useMemo,memo,useRef} from 'react';
import './App.css';

// const Counter = memo(function Counter(props) {
//   //count不变 Counter就不会重新渲染
//   console.log('render')
//   return (
//     <h1 onClick={props.onClick}>{props.count}</h1>
//   )
// })

// class Counter extends PureComponent{
//   render() {
//     const {props} = this
//     return (
//       <h1>{props.count}</h1>
//     )
//   }
// }
function useCounter(count) {
  return (
    <h1>{count}</h1>
  )
}
//自定义Hooks函数
function useResize(){
  const [size,setSize] = useState({
    width:document.documentElement.clientWidth,
    height:document.documentElement.clientHeight
  })
  const onResize = ()=>{
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
  }
  useEffect(()=>{
    window.addEventListener('resize',onResize,false)
    return ()=>{
      window.removeEventListener('resize',onResize,false)
    }
  })
  return size
}
function useCount(defaultCount) {
  const [count,setCount] = useState(0)
  let timer = useRef()

  useEffect(()=>{
    timer.current = setInterval(()=>{
      setCount(count => count + 1)
    },1000)
  },[])
  useEffect(()=>{
    if(count > 10){
      clearInterval(timer.current)
      // setCount(0)
    }
  })
  return [count,setCount]
}

function App(props){
 const [count,setCount] = useCount(0)
 const Counter = useCounter(count)
 const Size = useResize()
  //useCallback(fn)
  return (
    <div>
      <button onClick={()=>{setCount(count+1)}}>click{count}</button>
        {/* <Counter count={count} /> */}
        {Counter}--{Size.width}x{Size.height}
    </div>
  )
}
export default App;
