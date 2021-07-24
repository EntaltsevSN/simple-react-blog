import React from 'react'
import { setClasses } from '../../config/functions'
import { projectStages } from '../../config/projectStages'
import Container from '../../includes/Container'
import ProjectInfo from './Project/ProjectInfo'

function ProjectsSlide({ project }) { 
  return (
    <Container>
      <div className={setClasses('project', 'slide')}>
        <ProjectInfo type="slide" project={project} />
      </div>
    </Container>
  )
}

export default ProjectsSlide