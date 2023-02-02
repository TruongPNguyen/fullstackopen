import { useState } from 'react'

const Button = (props) => (
  <button onClick = {props.handleClick}>
    {props.text}
  </button>
)

const StatisticsLine = (props) => {
  const {text, stats} = props

  return (
    <tr>
      <td> {text} </td>
      <td> {stats} </td>
    </tr>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad} = props
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = good / total

  if (total == 0) {
    return (
      <div>
        submit feedback to see results
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text = "number of good feedback:" stats = {good}/>
        <StatisticsLine text = "number of neutral feedback:" stats = {neutral}/>
        <StatisticsLine text = "number of bad feedback:" stats = {bad}/>
        <StatisticsLine text = "average feedback:" stats = {average.toFixed(1)}/>
        <StatisticsLine text = "positive percentage:" stats = {(positive * 100).toFixed(1) + " %"} /> 
      </tbody>
    </table>
  )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1> give feedback for course </h1>
      <div>
        <Button handleClick = {() => setGood(good + 1)} text = "good feedback"/>
      </div>
      <div>
        <Button handleClick = {() => setNeutral(neutral + 1)} text = "neutral feedback"/>
      </div>
      <div> 
        <Button handleClick = {() => setBad(bad + 1)} text = "bad feedback"/>
      </div>
      <h1> feedback statistics </h1>
        <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

export default App