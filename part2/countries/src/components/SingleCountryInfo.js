import React from 'react'

const SingleCountryInfo = ({ country, show }) => {
  if (show) {
    //TODO: 2.14*: Data for countries, step3 (Adding weather data)
    //Account creation required for weatherstack.com API key
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
        <img src={country.flag} alt={`Flag of ${country.name}`} height="115" />
      </div>
    )
  }
  else {
    return <></>
  }
}

export default SingleCountryInfo