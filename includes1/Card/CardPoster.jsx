import React from 'react'
import { settings } from '../../config/settings'

function CardPoster({ poster }) {
  return (
    <section className="card__shape">
      <img src={poster !== null ? poster : settings.project.defaultImage} alt="" className="card__image"/>
    </section>
  )
}

export default CardPoster