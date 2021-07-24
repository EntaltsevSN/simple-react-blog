import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { url } from '../../config/functions'

export default ({ clickable = true }) => {
  const sections = useSelector(state => state.sections)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if(sections !== null) {
      setIsLoading(false)
    }
  }, [sections])
  
  return (
  <section className="sections__list row">
    { isLoading 
      ? <section className="sections__item column">Разделы загружаются...</section>
      : sections.sort((a,b) => a.id - b.id).map(({ id, title, description }) => 
      <section key={id} className="sections__item column column--sm-6 column--md-4">
        <section className="sections__section">
          { clickable && <Link className="sections__target" to={url('sections', id)} /> }
          <h3 className="sections__title">{ title }</h3>
          <p className="sections__description">{ description }</p>
        </section>
      </section> )
    }
  </section>
  )
}