import React from 'react'

function CardMeta({ meta, type }) {
  return (
    <div className="card__meta">{ 
      type === 'date'
        ? new Date(meta).toLocaleTimeString()
        : convertCategory(meta)
    }</div>
  )
}

export default CardMeta