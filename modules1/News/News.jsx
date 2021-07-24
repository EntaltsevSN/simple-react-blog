import React from 'react'
import { Route, Switch } from 'react-router'
import { setURL } from '../../config/functions'
import NewsList from './NewsList'
import NewsPost from './NewsPost'

function News(props) {
  return (
    <Switch>
      <Route exact path={setURL('news')}>
        <NewsList/>
      </Route>
      <Route path={setURL('news', ':id')}>
        <NewsPost/>
      </Route>
    </Switch>
  )
}

export default News