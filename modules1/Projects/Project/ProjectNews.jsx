import React from 'react'
import { Route, Switch, useLocation, useRouteMatch } from 'react-router'
import { setURL } from '../../../config/functions'
import NewsCard from '../Cards/NewsCard'
import NewsPost from '../Cards/NewsPost'

function ProjectNews({ project }) {
  return (
    <section className="project__news">
      { project.news.map(item => <NewsCard key={item.id} post={item} project={project} />)}
    </section>
  )
}

export default ProjectNews