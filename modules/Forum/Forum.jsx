import React from 'react'
import { Route, Switch } from 'react-router'
import { url } from '../../config/functions'
import Container from '../../includes/Container'
import Thread from '../Thread/Thread'
import ForumList from './ForumList'

export default props => (
  <section className="forum">
    <Container>
      <Switch>
        <Route exact path={url('forum')}>
          <ForumList />
        </Route>
        <Route path={url('forum', ':id')}>
          <Thread />
        </Route>
      </Switch>
    </Container>
  </section>
)