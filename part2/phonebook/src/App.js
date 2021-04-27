import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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

    if (newName.length === 0 || newNumber.length === 0) {
      return
    }

    const p = persons.find(person => person.name === newName)
    if (p !== undefined) {
      // If the person's name already exists

      //window.alert(`${newName} is already added to phonebook`)
      if (window.confirm(`${p.name} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...p, number: newNumber }

        personService
          .update(p.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === p.id ? returnedPerson : person))
            setNewName('')
            setNewNumber('')
          })
      }
    }
    else {
      // If the person's name is not already present, create a new person

      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const removePerson = (personToRemove) => {
    if (window.confirm(`Delete ${personToRemove.name} ?`)) {
      personService
        .remove(personToRemove.id)
        .then(setPersons(persons.filter(person => person.id !== personToRemove.id)))
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
      <Persons persons={personsToShow} onClickDelete={removePerson} />
    </div>
  )
}

export default App