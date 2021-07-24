import React from 'react'

export default ({ children, onClick, disabled = false, type = 'button' }) => {
  const handleClick = () => {
    if(onClick !== undefined) {
      onClick()
    } else {
      return false;
    }
  }

  return (
    <button className="button" type={type} onClick={() => handleClick()} disabled={disabled}>{ children }</button>
  )
}