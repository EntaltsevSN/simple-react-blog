import React from 'react'
import { Route, Switch } from 'react-router'
import { setURL } from '../../config/functions'
import User from './User'
import UsersPage from './UsersPage'

function Users(props) {
  return (
    <section className="users">
      <Switch>
        <Route exact path={setURL('users')}>
          <UsersPage />
        </Route>
        <Route path={setURL('users', ':id')}>
          <User/>
        </Route>
      </Switch>
    </section>
  )
}

export default Users