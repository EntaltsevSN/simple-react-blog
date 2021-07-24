import React from 'react'

function Form(props) {
  return (
    <form className="form">{ props.children }</form>
  )
}

export default Form