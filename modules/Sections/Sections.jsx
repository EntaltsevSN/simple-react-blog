import React from 'react'
import { Route, Switch } from 'react-router'
import { url } from '../../config/functions'
import Container from '../../includes/Container'
import Section from '../Section/Section'
import SectionsList from './SectionsList'

export default props => (
  <section className="sections">
    <Container>
      <Switch>
        <Route exact path={url('sections')}>
          <SectionsList />
        </Route>
        <Route path={url('sections', ':id')}>
          <Section />
        </Route>
      </Switch>
    </Container>
  </section>
)