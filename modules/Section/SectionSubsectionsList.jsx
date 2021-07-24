import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { url } from '../../config/functions'

export default ({ current }) => {
  const sections = useSelector(state => state.sections)
  const subsections = useSelector(state => state.subsections)
  const [section, setSection] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if(sections !== null && subsections !== null) {
      setIsLoading(false)
      setSection(sections.filter(({ id }) => Number(id) === Number(current))[0])
    }
  }, [sections, subsections])


  return (
    <section className="section">
      { isLoading 
      ?  <p>Раздел загружается...</p>
      : <>
          <h2 className="section__title">{ section.title }</h2>
          <section className="section__subsections">
            { subsections.sort((a,b) => a.id - b.id).filter(({ section_id}) => Number(section_id) === Number(current)).map(({ id, title }) => 
              <section className="section__subsection">
                <Link to={url('sections', current, id)}>
                  <h3 className="section__name">{ title }</h3>
                </Link>
              </section>
            ) }
          </section>
        </>
      }
    </section>
  )
}