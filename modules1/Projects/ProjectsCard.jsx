import React from 'react'
import { Link } from 'react-router-dom'
import { convertCategory, formatSum, setURL } from '../../config/functions'
import { settings } from '../../config/settings'
import ProjectInfo from './Project/ProjectInfo'

function ProjectsCard({ project }) {
  const percents = Math.floor(100 / project.funding_goal * project.funding_sum)
  const finish = new Date(project.date_finish)
  const today = new Date()
  const daysLeft = Math.floor((finish.getTime() - today.getTime()) / (1000 * 3600 * 24))

  return (
    <div className="card">
      <Link className="card__link" to={setURL('projects', project.id)}/>
      <section className="card__shape">
        <img src={project.image !== null ? project.image : settings.project.defaultImage} alt="" className="card__image"/>
      </section>
      <div className="card__content">
        <div className="card__meta">{ convertCategory(project.category) }</div>
        { project.title.length > 0 && <h4 className="card__title">{ project.title }</h4> }
        { project.description.length > 0 && <p className="card__description">{ project.description }</p> }
        <div className="card__stats">
          <div className="card__text-between">
            <p className="card__text">{ formatSum(project.funding_sum) }</p>
            <p className="card__text">{ formatSum(project.funding_goal) }</p>
          </div>
          <div className="card__path">
            <p className="card__current-path" style={{ width: percents > 100 ? '100' : percents + '%' }}></p>
          </div>
          <div className="card__text-between">
            <p className="card__text">Достигнуто: {percents}%</p>
            <p className="card__text">{ daysLeft < 0 ? <>Срок истек</> : <>{daysLeft} дней осталось</> }</p>
          </div>
      </div>
      </div>
    </div>
  )
}

export default ProjectsCard