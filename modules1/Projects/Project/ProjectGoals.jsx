import React from 'react'
import GoalCard from '../Cards/GoalCard'

function ProjectGoals({ project }) {
  const points = [
    project.funding_goal,
    ...project.goals.map(({ funding_goal }) => funding_goal)
  ]

  console.log(points)

  return (
    <section className="project__goals">
      <section className="project__way">
        { project.goals.length > 0 ? <>
          <article className="project__waypoint">
            { project.title.charAt(0).toUpperCase() }
          </article>
          { project.goals.map(item => <React.Fragment key={item.id}>
            <div className="project__wayline"></div>
            <article className="project__waypoint">
              { item.title.charAt(0).toUpperCase() }
            </article>
          </React.Fragment>) }
        </> : <></> }
      </section>
      { project.goals.map(item => <GoalCard key={item.id} goal={item} project={project} />)}
    </section>
  )
}

export default ProjectGoals