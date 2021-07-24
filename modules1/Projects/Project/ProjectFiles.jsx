import React from 'react'
import FileCard from '../Cards/FileCard'
import GoalCard from '../Cards/GoalCard'

function ProjectFiles({ project }) {

  return (
    <section className="project__goals">
      { project.files.map(item => <FileCard key={item.id} file={item} />)}
    </section>
  )
}

export default ProjectFiles