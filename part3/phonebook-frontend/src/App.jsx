import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newMessage, setNewMessage] = useState(null)
  const [newMessageType, setNewMessageType] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name : newName,
      number : newNumber
    }
    const exist = persons.some(person => person.name === newName)
    if (exist) {
      if (window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)) {
        const prev = persons.find(person => person.name === newName)
        const updatedPerson = { ...prev, number: newNumber}
        personService
        .update(prev.id, updatedPerson)
        .then(response => {
          setPersons(persons.map((person) => (person.id === response.id ? response : person)))
          setNewMessage(`${nameObject.name}'s new number is updated in the phonebook`)
          setNewMessageType('success')
          setTimeout(() => {
            setNewMessage(null)
            setNewMessageType(null)
          }, 3000)
        })
        .catch(error => {
          setNewMessage(`Information of ${nameObject.name} has already been removed from the server`)
          setNewMessageType('error')
          setTimeout(() => {
            setNewMessage(null)
            setNewMessageType(null)
          }, 3000)
        })
      }
    } else {
      personService
      .add(nameObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNewMessage(`${nameObject.name} is added to the phonebook`)
        setNewMessageType('success')
      })
      .catch(error => {
        setNewMessage(`Error : ${error.response.data.error}`)
        setNewMessageType('error')
      })
      setTimeout(() => {
        setNewMessage(null)
        setNewMessageType(null)
      }, 3000)
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id == id)
    if (window.confirm(`Delete ${person.name}?`)) {
        personService
        .remove(id)
        .then(response => {
          const updated = persons.filter((person) => person.id != id)
          setPersons(updated)
        })
        setNewMessage(`${person.name} is deleted from the phonebook`)
        setNewMessageType('success')
        setTimeout(() => {
          setNewMessage(null)
          setNewMessageType(null)
        }, 3000)
    }
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        filter = {newFilter} 
        onFilterChange = {handleFilterChange}/>  
      <h2>Add to Phonebook</h2>
      <Notification message = {newMessage} type = {newMessageType} />
      <PersonForm 
        addPerson = {addPerson} 
        name = {newName}
        onNameChange = {handleNameChange}
        number = {newNumber}
        onNumberChange = {handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons 
        personsToShow = {personsToShow}
        deletePerson = {deletePerson} />
    </div>
  )
}

export default App