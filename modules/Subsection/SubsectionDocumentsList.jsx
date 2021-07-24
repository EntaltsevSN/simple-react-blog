import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { url } from '../../config/functions'

export default ({ section, current }) => {
  const subsections = useSelector(state => state.subsections)
  const documents = useSelector(state => state.documents)
  const [subsection, setSubsection] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if(subsections !== null && documents !== null) {
      setIsLoading(false)
      setSubsection(subsections.filter(({ id }) => Number(id) === Number(current))[0])
    }
  }, [subsections, documents])


  return (
    <section className="subsection">
      { isLoading 
      ?  <p>Раздел загружается...</p>
      : <>
          <h2 className="subsection__title">{ subsection.title }</h2>
          <section className="subsection__subsections">
            { documents.sort((a,b) => a.id - b.id).filter(({ subsection_id}) => Number(subsection_id) === Number(current)).map(({ id, title }) => 
              <section className="subsection__subsection">
                <Link to={url('sections', section, current, id)}>
                  <h3 className="subsection__name">{ title }</h3>
                </Link>
              </section>
            ) }
          </section>
        </>
      }
    </section>
  )
}