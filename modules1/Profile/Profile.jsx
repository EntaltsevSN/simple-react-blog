import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router'
import { setURL } from '../../config/functions'
import ProfileEdit from './ProfileEdit'
import ProfileManager from './ProfileManager'
import ProfileModerator from './ProfileModerator'
import ProfileOrganizer from './ProfileOrganizer'
import ProfilePage from './ProfilePage'
import ProfilePager from './ProfilePager'
import ProfileProjects from './ProfileProjects'
import ProfileSidebar from './ProfileSidebar'

function Profile(props) {
  const profile = useSelector(state => state.profile.data)

  return (
    <section className="box profile">
      <ProfileSidebar profile={profile} />
      <main className="profile__body">
        <Switch>
          <Route exact path={setURL('profile')}>
            <ProfilePage profile={profile} />
          </Route>
          <Route path={setURL('profile', 'projects')}>
            <ProfileProjects profile={profile} />
          </Route>
          <Route path={setURL('profile', 'edit')}>
            <ProfileEdit/>
          </Route>
          <Route path={setURL('profile', 'moderator')}>
            <ProfileModerator/>
          </Route>
          <Route path={setURL('profile', 'pager')}>
            <ProfilePager/>
          </Route>
          <Route path={setURL('profile', 'manager')}>
            <ProfileManager/>
          </Route>
          <Route path={setURL('profile', 'organizer')}>
            <ProfileOrganizer/>
          </Route>
        </Switch>
      </main>
    </section>
  )
}

export default Profile