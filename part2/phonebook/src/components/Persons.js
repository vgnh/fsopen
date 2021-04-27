import React from 'react'

const Persons = ({ persons, onClickDelete }) => {
  return persons.map(person =>
    <div key={person.id}>
      {person.name} {person.number} <button onClick={() => onClickDelete(person)}>delete</button>
    </div>
  )
}

export default Persons