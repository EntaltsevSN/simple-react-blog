import React, { useState } from 'react'
import { Route, Switch } from 'react-router'
import { url } from '../../config/functions'
import LoginToAdmin from '../../includes/LoginToAdmin'
import AdminData from './AdminData'

export default props => {
  const [isEntered, setIsEntered] = useState(false)
  const enterData = { login: 'msoge100', password: 'brave4' }
  return (
    <section className="admin">
      { !isEntered
        ? <LoginToAdmin action={setIsEntered} check={enterData} />
        : <Switch>
          <Route exact path={url('admin')}>
            <AdminData />
          </Route>
        </Switch>
      }
    </section>
  )
}