import React from 'react'

function Button(props) {

  const handleClick = e => {
    e.preventDefault()

    props.onClick !== undefined && props.onClick(arguments)
  }

  const buttonClasses = props.className !== undefined ? ['button', props.className].join(' ') : `button`

  return (
    <>
      { props.type
        ? <button disabled={props.disabled} className={buttonClasses}>{ props.children }</button>
        : <button disabled={props.disabled} className={buttonClasses} onClick={e => handleClick(e)}>{ props.children }</button>
      }
    </>
  )
}

export default Button