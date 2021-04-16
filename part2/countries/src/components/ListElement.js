import React, { useState } from 'react'
import SingleCountryInfo from './SingleCountryInfo'

const ListElement = ({ country }) => {
  const [show, setShow] = useState(false)
  const [buttonText, setButtonText] = useState("show")

  const showOrHide = () => {
    setShow(!show)
    setButtonText(buttonText === "show" ? "hide" : "show")
  }

  return (
    <div>
      <div>{country.name} <button onClick={showOrHide}>{buttonText}</button><br /></div>
      <SingleCountryInfo country={country} show={show} />
    </div>
  )
}

export default ListElement