import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { setClasses } from '../../config/functions'

function Page(props) {
  const id = useParams()['pageId']
  console.log(useParams())
  const page = useSelector(state => state.pages.filter(item => item.slug === id)[0])

  console.log(page)

  return (
    <section className="page">
      <div className="page__header">
        <h3 className={ setClasses("page__title", 'no-margin') }>{ page.title }</h3>
      </div>
      <section className="page__content" dangerouslySetInnerHTML={{ __html: page.content}}/>
    </section>
  )
}

export default Page