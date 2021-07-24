import React from 'react'

function ProjectContent({ content }) {
  return (
    <section className="project__content">
      { content !== '' 
        ? <div dangerouslySetInnerHTML={{__html: content}}></div> 
        : 'Полное описание проекта ещё не заполнено!' 
      }
    </section>
  )
}

export default ProjectContent