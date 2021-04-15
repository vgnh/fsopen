import React from 'react'

const PersonForm = ({ onSubmit, nameInputValue, onChangeNameInput, numberInputValue, onChangeNumberInput, buttonText }) => (
  <form onSubmit={onSubmit}>
    <div>name: <input value={nameInputValue} onChange={onChangeNameInput} /></div>
    <div>number: <input value={numberInputValue} onChange={onChangeNumberInput} /></div>
    <div><button type="submit">{buttonText}</button></div>
  </form>
)

export default PersonForm