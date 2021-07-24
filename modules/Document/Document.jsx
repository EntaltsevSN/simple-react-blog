import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

export default props => {
  const current = useParams().id
  console.log(current)
  const documents = useSelector(state => state.documents)
  const [document, setDocument] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if(documents !== null) {
      setIsLoading(false)
      setDocument(documents.filter(({ id }) => Number(id) === Number(current))[0])
    }
  }, [documents])

  console.log(document)


  return (
    <section className="document">
      { isLoading 
      ?  <p>Раздел загружается...</p>
      : <>
        <h2 className="document__title">{ document.title }</h2>
        <section className="document__text" dangerouslySetInnerHTML={{ __html: document.text }} />
        </>
      }
    </section>
  )
}