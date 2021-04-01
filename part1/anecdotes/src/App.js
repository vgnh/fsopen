import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [points, setPoints] = useState(new Uint32Array(anecdotes.length))

  const [selected, setSelected] = useState(0)

  const changeSelected = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const [max, setMax] = useState(0)

  const [mostVoted, setMostVoted] = useState(0)

  const vote = (n) => {
    const copy = [...points]
    copy[n] += 1
    setPoints(copy)

    const currentMax = Math.max(...copy)
    if (currentMax > max) {
      setMax(currentMax)
      setMostVoted(copy.indexOf(currentMax))
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[selected]} <br />
        has {points[selected]} votes
      </p>
      <button onClick={() => vote(selected)}>
        vote
      </button>
      <button onClick={changeSelected}>
        next anecdote
      </button>
      <h1>Anecdote with most votes</h1>
      <p>
        {anecdotes[mostVoted]} <br />
        has {points[mostVoted]} votes
      </p>
    </div>
  )
}

export default App