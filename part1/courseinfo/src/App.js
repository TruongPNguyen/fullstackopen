const App = () => {
  const course = 'Half Stack application development'
  const parts = [ 
    {
      name : 'Fundamentals of React',
      exercises : 10
    },
    {
      name : 'Using props to pass data',
      exercises : 7
    },
    {
      name :'State of a component',
      exercises : 14
    }
  ]

  return (
    <div>
      <Header header = {course}/>
      <Content name1 = {parts[0].name} number1 = {parts[0].exercises} name2 = {parts[1].name} number2 = {parts[1].exercises} name3 = {parts[2].name} number3 = {parts[2].exercises}/>
      <Total exercises1 = {parts[0].exercises} exercises2 = {parts[1].exercises} exercises3 = {parts[2].exercises}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1> {props.header} </h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name = {props.name1} number = {props.number1}/>
      <Part name = {props.name2} number = {props.number2}/>
      <Part name = {props.name3} number = {props.number3}/>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p> {props.name} {props.number} </p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p> Number of exercises {props.exercises1 + props.exercises2 + props.exercises3} </p>
    </div>
  )
} 

export default App
