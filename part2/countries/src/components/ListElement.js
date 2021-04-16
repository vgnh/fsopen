import React, { useState } from 'react'
import SingleCountryInfo from './SingleCountryInfo'

const ListElement = ({ country }) => {
  const [show, setShow] = useState(false)
  const [buttonText, setButtonText] = useState("show")

  const handleClick = () => {
    setShow(!show)
    if (buttonText === "show")
      setButtonText("hide")
    else
      setButtonText("show")
  }

  return (
    <div>
      <div>{country.name} <button onClick={handleClick}>{buttonText}</button><br /></div>
      <SingleCountryInfo country={country} show={show} />
    </div>
  )
}

export default ListElement