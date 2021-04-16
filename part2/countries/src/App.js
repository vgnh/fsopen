import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Information from './components/Information'

const App = () => {
  const [countries, setCountires] = useState([])
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountires(response.data)
      })
  }, [])

  const [newFilterCountry, setNewFilterCountry] = useState('')
  const handleFilterCountryChange = (event) => {
    setNewFilterCountry(event.target.value)
  }

  const countriesToShow = newFilterCountry === ''
    ? []
    : countries.filter(country => country.name.toLowerCase().includes(newFilterCountry.toLowerCase()))

  return (
    <>
      <form>
        <div>find countries <input value={newFilterCountry} onChange={handleFilterCountryChange} /></div>
      </form>
      <Information countriesToShow={countriesToShow} />
    </>
  )
}

export default App