import React, { useState } from 'react'
import { setClasses } from '../../../config/functions'
import Button from '../../../includes/Button'
import { VscChevronDown, VscChevronUp } from 'react-icons/vsc'

function FAQCard({ faq, project }) {
  const [showMore, setShowMore] = useState(false)

  return (
    <article className="project__faq-card">
      <section className={setClasses("project__flex", 'button')}  onClick={() => setShowMore(!showMore)}>
        <h4 className={setClasses("project__title", 'small')}>{ faq.question }</h4>
        <Button className="button--link button--fluid">
          { showMore ? <VscChevronUp /> : <VscChevronDown /> }
        </Button>
      </section>
      { showMore && <section className="project__more" dangerouslySetInnerHTML={{__html: faq.answer}}></section> }
    </article>
  )
}

export default FAQCard