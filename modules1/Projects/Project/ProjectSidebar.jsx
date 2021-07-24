import React from 'react'
import { useLocation, useRouteMatch } from 'react-router'
import { Link } from 'react-router-dom'
import { setClasses } from '../../../config/functions'
import SidebarCard from '../Cards/SidebarCard'
import ProjectCart from './ProjectCart'

function ProjectSidebar({ project }) {
  const path = useLocation().pathname
  const url = useRouteMatch().url

  const main = project.rewards.filter(({ addon }) => !addon)
  const addons = project.rewards.filter(({ addon }) => addon)

  return (
    <section className="project__sidebar">
      { path.includes('rewards')
        ? <ProjectCart project={project} />
        : <>
      { main.length > 0 && <>
        <h3 className={setClasses("project__title", 'no-margin')}>Основные</h3>
        { main.map(item => <SidebarCard key={item.id} reward={item} />) } 
      </> }
      { addons.length > 0 && <>
        <h3 className={setClasses("project__title", 'no-margin')}>Дополнительные</h3>
        { addons.map(item => <SidebarCard key={item.id} reward={item} />) } 
      </> }
    </>
      }
    </section>
  )
}

export default ProjectSidebar