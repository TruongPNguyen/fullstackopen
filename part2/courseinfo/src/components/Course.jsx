const Course = ({ course }) => {
    return ( 
      <div>
        <Header header = {course.name}/>
        <Content content = {course.parts}/> 
        <Total array = {course.parts}/>
      </div>
    )
  }
  
  const Header = ({ header }) => {
    return (
      <div>
        <h2> {header} </h2>
      </div>
    )
  }
  
  const Content = ({ content }) => {
    return (
      <div>
        {content.map(part => <Part key = {part.id} name = {part.name} number = {part.exercises}/>)}
      </div>
    )
  }
  
  const Part = ({ name, number }) => {
    return (
      <div>
        <p> {name} {number} </p>
      </div>
    )
  }
  
  const Total = ({ array }) => {
    const total = array.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)
    return (
      <div>
        <b> total of {total} exercises </b>
      </div>
    )
  }

  export default Course