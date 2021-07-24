import React from 'react'
import { Route, Switch } from 'react-router'
import { setURL } from '../../config/functions'
import BlogList from './BlogList'
import BlogPage from './BlogPage'

function Blog(props) {
  return (
    <Switch>
      <Route exact path={setURL('blog')}>
        <BlogList />
      </Route>
      <Route path={setURL('blog', ':id')}>
        <BlogPage />
      </Route>
    </Switch>
  )
}

export default Blog