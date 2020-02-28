import React,{ useState,useEffect,createContext ,useContext} from 'react';
import './App.css';

class App2 extends React.Component{
  state = {
    count: 0,
    size: {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  }
  onResize = () => {
    this.setState({
      size: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    })
  }
  componentDidMount() {
    document.title = this.state.count
    window.addEventListener('resize',this.onResize,false)
  }
  componentDidUpdate() {
    document.title = this.state.count
  }
  componentWillUnmount() {
    window.removeEventListener('resize',this.onResize,false)
  }
  render() {
    const { count,size } = this.state
    return (
      <div>
        <button onClick={()=>{this.setState({count:count + 1})}}>click</button>
        <p>{size.width} x {size.height}</p>
      </div>
    )
  }
}

// function App(props) {
//   const [count,setCount] = useState(0);
//   const [size,setSize] = useState({
//     width: document.documentElement.clientWidth,
//     height: document.documentElement.clientHeight
//   })
//   const onResize = () => {
//     setSize(
//       {
//         width: document.documentElement.clientWidth,
//         height: document.documentElement.clientHeight
//       }
//     )
//   }
//   useEffect(()=>{
//     document.title = count
//   })
//   useEffect(()=>{
//     window.addEventListener('resize',onResize,false)
//     return ()=>{
//       window.removeEventListener('resize',onResize,false)
//     }
//   },[])
//   useEffect(()=>{
//     console.log(count) //如果需要在某个值变化时做一些操作，可以在useEffect的第二个参数数组中加上这个变量
//   },[count])
//   const onClick = () =>{
//     console.log('click')
//   }
//   useEffect(()=>{
//     //需要频繁清理状态的副作用，这样每次我们都能获取到最新的DOM节点，从而进行操作
//     document.querySelector('#size').addEventListener('click',onClick,false)
//     return ()=>{
//       document.querySelector('#size').removeEventListener('click',onClick,false)
//     }
//   })//useEffect的第二个参数不要传
//   return (
//     <div>
//       <button onClick={()=>{setCount(count +1)}}>click({count})</button>
//       {
//         count%2 ? <span id="size">{size.width} x {size.height}</span> : <p id="size">{size.width} x {size.height}</p>
//       }
      
//     </div>
//   );
// }
const CountContext = createContext();

class Foo extends React.Component{
  render() {
    return (
      <CountContext.Consumer>
        {
          count => <h1>{count}</h1>
        }
      </CountContext.Consumer>
    )
  }
}
class Bar extends React.Component{
  static contextType = CountContext;
  render() {
    const count = this.context
    return (
    <h1>{count}</h1>
    )
  }
}
function Counter() {
  const count = useContext(CountContext)
  return (
  <h1>{count}</h1>
  )
}
function About(props){
  const [count,setCount] = useState(0)
  return (
    <div>
      <button onClick={()=>{setCount(count+1)}}>click</button>
      <CountContext.Provider value={count}>
        <Foo />
        <Bar />
        <Counter />
      </CountContext.Provider>
    </div>
  )
}
export default About;
