import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  /* const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) */
  useEffect(() => {
    //console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        //console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  //console.log('render', persons.length, 'persons')

  const [newName, setNewName] = useState('')
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const [newNumber, setNewNumber] = useState('')
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName) !== undefined) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const [showAll, setShowAll] = useState(true)

  const [newFilterName, setNewFilterName] = useState('')
  const handleFilterNameChange = (event) => {
    const changedFilterName = event.target.value
    setNewFilterName(changedFilterName)
    setShowAll(changedFilterName !== '' ? false : true)
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilterName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilterName} onChange={handleFilterNameChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}

        nameInputValue={newName}
        onChangeNameInput={handleNameChange}

        numberInputValue={newNumber}
        onChangeNumberInput={handleNumberChange}

        buttonText="add" />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App