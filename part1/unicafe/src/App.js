import React, { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const Buttons = ({ categories }) => {
  return categories.map(category =>
    <Button key={category.name+"_button"} text={category.name} handleClick={category.incrementValue} />
  )
}

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}{(text === "positive") ? " %" : ""}</td>
  </tr>
)

const Statistics = ({ categories }) => {
  const all = categories.map(category => category.value).reduce((a, b) => a + b)

  // If all is 0, display 0 instead of "NaN"
  const average = (all === 0) ? 0 : (categories[0].value - categories[2].value) / all

  // If all is 0, display 0 instead of "NaN"
  const positive = (all === 0) ? 0 : (categories[0].value / all) * 100

  if (all === 0)
    return <p>No feedback given</p>
  else
    return (
      <table>
        <tbody>
          {
            categories.map(category =>
              <Statistic key={category.name+"_statistic"} text={category.name} value={category.value} />
            )
          }
          <Statistic text="all" value={all} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positive} />
        </tbody>
      </table>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  const feedback = {
    categories: [
      {
        name: "good",
        value: good,
        incrementValue: incrementGood
      },
      {
        name: "neutral",
        value: neutral,
        incrementValue: incrementNeutral
      },
      {
        name: "bad",
        value: bad,
        incrementValue: incrementBad
      }
    ]
  }

  return (
    <div>
      <Header text="give feedback" />
      <Buttons categories={feedback.categories} />
      <Header text="statistics" />
      <Statistics categories={feedback.categories} />
    </div>
  )
}

export default App