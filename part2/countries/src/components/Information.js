import React from 'react'
import SingleCountryInfo from './SingleCountryInfo'
import ListElement from './ListElement'

const Information = ({ countriesToShow }) => {
  if (countriesToShow.length === 0) {
    return <></>
  }
  else if (countriesToShow.length === 1) {
    return <SingleCountryInfo country={countriesToShow[0]} show={true} />
  }
  else if (countriesToShow.length > 1 && countriesToShow.length <= 10) {
    return countriesToShow.map(country =>
      <ListElement key={country.name} country={country} />
    )
  }
  else if (countriesToShow.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
}

export default Information