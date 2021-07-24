import React from 'react'
import FileCard from '../Cards/FileCard'
import GoalCard from '../Cards/GoalCard'
import LinkCard from '../Cards/LinkCard'

function ProjectLinks({ project }) {

  return (
    <section className="project__goals">
      { project.links.map(item => <LinkCard key={item.id} link={item} />)}
    </section>
  )
}

export default ProjectLinks