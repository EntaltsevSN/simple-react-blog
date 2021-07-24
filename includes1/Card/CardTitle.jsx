import React from 'react'

function CardTitle({ title }) {
  return (
    <>{ title.length > 0 && <h4 className="card__title">{ title }</h4> }</>
  )
}

export default CardTitle