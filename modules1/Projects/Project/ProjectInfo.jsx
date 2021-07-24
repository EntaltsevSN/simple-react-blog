import React from 'react'
import { Link } from 'react-router-dom'
import { formatSum, setClasses, setURL } from '../../../config/functions'
import { settings } from '../../../config/settings'
import FormDate from '../../../includes/Form/FormDate'
import { convertCategory } from '../../../config/functions'
import ProjectAuthor from './ProjectAuthor'
import ProjectGraph from './ProjectGraph'

function ProjectInfo({ project, type }) {
  return (
    <section className="project__info">
      <section className="project__shape">
        <img src={project.image !== null ? project.image : settings.project.defaultImage} alt="" className={setClasses('project__image', 'cover')} />
      </section>
      <section className={setClasses('project__stats', type === 'slide' ? 'slide' : false)}>
        <ProjectAuthor id={project.creator_id} />
        { project.description !== '' && <p className="project__description">{ project.description }</p> }
        <ProjectGraph item={project} />
        <Link to={setURL('projects', project.id)} className={setClasses("button", 'margin-top')}>Поддержать</Link>  
      </section>
    </section>
  )
}

export default ProjectInfo