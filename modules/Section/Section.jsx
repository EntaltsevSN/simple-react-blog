import React from 'react'
import { Route, Switch, useParams } from 'react-router'
import { url } from '../../config/functions'
import Subsection from '../Subsection/Subsection'
import SectionSubsectionsList from './SectionSubsectionsList'

export default props => {
  const current = useParams().id

  return (
    <Switch>
      <Route exact path={url('sections', current)}>
        <SectionSubsectionsList current={current} />
      </Route>
      <Route path={url('sections', current, ':id')}>
        <Subsection section={current} />
      </Route>
    </Switch>
  )
}