import React from 'react'
import { Route, Switch } from 'react-router'
import { url } from '../config/functions'
import TreeIcon from '../includes/TreeIcon'
import Admin from '../modules/Admin/Admin'
import Forum from '../modules/Forum/Forum'
import Home from '../modules/Home/Home'
import Section from '../modules/Section/Section'
import Sections from '../modules/Sections/Sections'
import Thread from '../modules/Thread/Thread'

export default props => (
  <section className="body">
    <Switch>
      <Route exact path={url('home')}>
        <Home />
      </Route>
      <Route path={url('sections')}>
        <Sections />
      </Route>
      <Route path={url('sections', ':id')}>
        <Section />
      </Route>
      <Route path={url('forum')}>
        <Forum />
      </Route>
      <Route path={url('forum', ':id')}>
        <Thread />
      </Route>
      <Route path={url('admin')}>
        <Admin />
      </Route>
    </Switch>
    <section className="body__bottom">
      <section className="body__info"></section>
      <TreeIcon size="96" color="#35d461" />
    </section>
  </section>
)