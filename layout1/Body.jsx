import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch, useLocation } from 'react-router'
import { setClasses, setURL } from '../config/functions'
import Container from '../includes/Container'
import Blog from '../modules/Blog/Blog'
import Home from '../modules/Home/Home'
import News from '../modules/News/News'
import Page from '../modules/Pages/Page'
import Profile from '../modules/Profile/Profile'
import Projects from '../modules/Projects/Projects'
import Users from '../modules/Users/Users'
import Wizard from '../modules/Wizard/Wizard'
import Editor from './Editor'
import Popup from './Popup/Popup'

function Body(props) {
  console.log(useLocation())
  const url = useLocation().pathname
  const projects = useSelector(state => state.projects.filter(({ id }) => Number(id) !== 0))

  const getCurrentProject = () => 
    !url.includes('projects')
      ? false : url.includes('profile') ? false : url.split('/').length <= 2 
        ? false : projects.filter(({id}) => Number(id) === Number(url.split('/')[2]))[0]

  return (
    <section className="content">
      <Switch>
        <Route exact path={setURL('home')}>
          <Home/>
        </Route>
        <Route path={setURL('profile')}>
          <Container wrapper="content"><Profile/></Container>
        </Route>
        <Route path={setURL('wizard')}>
          <Container wrapper="content"><Wizard/></Container>
        </Route>
        <Route path={setURL('projects')}>
          <Container wrapper="content" className={
            getCurrentProject() === false 
              ? undefined : getCurrentProject().template === 'basic' 
                ? undefined : 'container--full-width'
          }><Projects/></Container>
        </Route>
        <Route path={setURL('news')}>
          <Container wrapper="content"><News/></Container>
        </Route>
        <Route path={setURL('blog')}>
          <Container wrapper="content"><Blog/></Container>
        </Route>
        <Route path={setURL('users')}>
          <Container wrapper="content"><Users/></Container>
        </Route>
        <Route path={setURL('editor')}>
          <Container wrapper="content"><Editor/></Container>
        </Route>
        <Route path={setURL(':pageId')}>
          <Container wrapper="content"><Page/></Container>
        </Route>
      </Switch>
      <Popup/>
    </section>
  )
}

export default Body