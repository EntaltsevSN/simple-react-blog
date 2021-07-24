import React from 'react'
import { Route, Switch } from 'react-router'
import { setURL } from '../../config/functions'
import Project from './Project/Project'
import ProjectsList from './ProjectsList'

function Projects(props) {
  return (
    <Switch>
      <Route exact path={setURL('projects')}>
        <ProjectsList/>
      </Route>
      <Route path={setURL('projects', ':id')}>
        <Project/>
      </Route>
    </Switch>
  )
}

export default Projects