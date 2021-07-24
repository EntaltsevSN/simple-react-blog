import React from 'react'

function CardDescription({ description }) {
  return (
    <p className="card__description" dangerouslySetInnerHTML={{__html: description}}></p>
  )
}

export default CardDescription