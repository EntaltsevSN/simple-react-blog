import React from 'react'
import { useLocation } from 'react-router'
import { UpdateProjectComments } from '../../../redux/Projects/reducer'
import Comments from '../../Comments/Comments'

function ProjectComments({ project }) {
  const callBack = UpdateProjectComments
  const module = useLocation().pathname.split('/')[1]
    
  return (
    <section className="project__goals">
      <Comments module={module} post={project} />
    </section>
  )
}

export default ProjectComments