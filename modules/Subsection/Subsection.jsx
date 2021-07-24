import React from 'react'
import { Route, Switch, useParams } from 'react-router'
import { url } from '../../config/functions'
import Document from '../Document/Document'
import SubsectionDocumentsList from './SubsectionDocumentsList'

export default ({ section }) => {
  const current = useParams().id

  return (
    <Switch>
      <Route exact path={url('sections', section, current)}>
        <SubsectionDocumentsList section={section} current={current} />
      </Route>
      <Route path={url('sections', section, current, ':id')}>
        <Document />
      </Route>
    </Switch>
  )
}