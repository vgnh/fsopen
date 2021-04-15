import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Information = ({ countriesToShow }) => {
  if (countriesToShow.length === 0) {
    return <></>
  }
  else if (countriesToShow.length === 1) {
    const country = countriesToShow[0]
    return (
      <div>
        <h1>{country.name}</h1>
        <p>
          capital {country.capital}<br />
          population {country.population}
        </p>
        <h2>languages</h2>
        <ul>
          {
            country.languages.map(language =>
              <li key={language.name}>{language.name}</li>
            )
          }
        </ul>
        <img src={country.flag} alt={`Flag of ${country.name}`} width="125" height="125" />
      </div>
    )
  }
  else if (countriesToShow.length > 1 && countriesToShow.length <= 10) {
    return (
      <p>
        {
          countriesToShow.map(country =>
            <span key={country.name}>{country.name}<br /></span>
          )
        }
      </p>
    )
  }
  else if (countriesToShow.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
}

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