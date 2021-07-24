import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { convertCategory, setURL } from '../../../config/functions'

function ProjectHeader({ project, id }) {
  const profile = useSelector(state => state.profile.data)
  return (
    <>
      <header className="project__header">
        <h3 className="project__title">{ project.title }</h3>
        { (Number(project['creator_id']) === Number(profile.id) || profile.role === 'admin') && <Link to={setURL('wizard', id)}>Редактировать</Link> }
      </header>
      <section className="project__meta">
        <p className="project__category">{convertCategory(project.category)}</p>
        <p className="project__id">#{project.id}</p>
      </section>
    </>
  )
}

export default ProjectHeader