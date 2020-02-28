import React,{ useState,useEffect,useMemo,memo} from 'react';
import './App.css';

const Counter = memo(function Counter(props) {
  //count不变 Counter就不会重新渲染
  console.log('render')
  return (
    <h1 onClick={props.onClick}>{props.count}</h1>
  )
})
function Memo(props){
  const [count,setCount] = useState(0)
  const double = useMemo(()=>{
    return count *2
  },[count===3])//在渲染之前完成，其返回值可以参与渲染
  const half = useMemo(()=>{
    return double/4
  },[double])
  const onClick = useMemo(() =>{
    console.log('Click')
  },[])
  //useMemo(()=>fn)
  // const onClick = useCallback(() =>{
  //   console.log('Click')
  // },[])
  //useCallback(fn)
  return (
    <div>
      <button onClick={()=>{setCount(count+1)}}>click{count}</button>
        <Counter count={double} onClick={onClick} />
        <p>double:{double}</p>
        <p>half:{half}</p>
    </div>
  )
}
export default Memo;
