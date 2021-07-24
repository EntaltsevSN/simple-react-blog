import React, { useState } from 'react'
import { setClasses } from '../../../config/functions'
import { settings } from '../../../config/settings'
import Button from '../../../includes/Button'
import ProjectGraph from '../Project/ProjectGraph'

function GoalCard({ goal, project }) {
  const [showMore, setShowMore] = useState(false)

  return (
    <article className="project__goal-card">
      <div className="project__cover">
        <img src={ goal.image !== null ? goal.image : settings.project.defaultImage } alt="" className={setClasses('project__image', 'cover')} />
      </div>
      <section className={ setClasses("project__stats", 'card')}>
        <h4 className={setClasses("project__title", 'small')}>{ goal.title }</h4>
        <ProjectGraph item={goal} project={project} />
      </section>
      <Button className="project__toggle button--link" onClick={() => setShowMore(!showMore)}>
        { showMore ? 'Скрыть' : 'Показать' } описание
      </Button>
      { showMore && <section className="project__more" dangerouslySetInnerHTML={{__html: goal.description}}></section> }
    </article>
  )
}

export default GoalCard