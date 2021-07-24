import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch, useLocation, useParams, useRouteMatch } from 'react-router'
import { setClasses, setURL } from '../../../config/functions'
import { projectStages } from '../../../config/projectStages'
import NoAccess from '../../../includes/NoAccess'
import ProjectComments from './ProjectComments'
import ProjectContent from './ProjectContent'
import ProjectFAQ from './ProjectFAQ'
import ProjectFiles from './ProjectFiles'
import ProjectGoals from './ProjectGoals'
import ProjectHeader from './ProjectHeader'
import ProjectInfo from './ProjectInfo'
import ProjectLinks from './ProjectLinks'
import ProjectNav from './ProjectNav'
import ProjectNews from './ProjectNews'
import ProjectRewards from './ProjectRewards'
import ProjectSidebar from './ProjectSidebar'

function Project(props) {
  const profile = useSelector(state => state.profile.data)
  const id = useParams().id
  const url = useRouteMatch().url
  const routeURL = url.substring(1)
  const pathname = useLocation().pathname
  const project = useSelector(state => state.projects.filter(item => Number(item.id) === Number(id))[0])

  console.log(profile)
  console.log(project)

  return (
    <> { 
      profile.role !== 'admin' 
        || 
      (
        profile.role === 'creator'
        &&
        project['creator_id'] !== profile.id
      )
        ||
      projectStages
        .filter(item => (item.id >= 6 && item.id <= 12 && item.id !== 10))
        .map(item => item.slug).includes(project.status)
      ? <NoAccess /> : 
    <section className={
      setClasses("project", project.template === 'basic'
        ? false : project.template)
    }>
      { project.template === 'aside' && 
        <div className={setClasses("project__aside", 'left')}>
          { project.templateImages.left !== null && 
            <img src={project.templateImages.left} alt="" className={setClasses("project__border", 'left')} /> 
          }
        </div> 
      }
      <div className={
        setClasses("project__section", project.template === 'basic'
          ? false : project.template)
      }>
        <ProjectHeader project={project} id={id} />
        <ProjectInfo project={project} id={id} />
        <div className="project__body">
          <div className="project__main">
            <ProjectNav pathname={pathname} url={url} />
            <Switch>
              <Route exact path={setURL(routeURL)}>
                <ProjectContent content={ project.content } />
              </Route>
              <Route path={setURL(routeURL, 'goals')}>
                <ProjectGoals project={ project } />
              </Route>
              <Route path={setURL(routeURL, 'rewards')}>
                <ProjectRewards project={ project } />
              </Route>
              <Route path={setURL(routeURL, 'news')}>
                <ProjectNews project={ project } />
              </Route>
              <Route path={setURL(routeURL, 'files')}>
                <ProjectFiles project={ project } />
              </Route>
              <Route path={setURL(routeURL, 'links')}>
                <ProjectLinks project={ project } />
              </Route>
              <Route path={setURL(routeURL, 'faq')}>
                <ProjectFAQ project={ project } />
              </Route>
              <Route path={setURL(routeURL, 'comments')}>
                <ProjectComments project={ project } />
              </Route>
            </Switch>
          </div>
          <ProjectSidebar project={project} />
        </div>
      </div>
      { project.template === 'aside' && 
        <div className={setClasses("project__aside", 'right')}>
          { project.templateImages.right !== null && 
            <img src={project.templateImages.right} alt="" className={setClasses("project__border", 'right')} /> 
          }
        </div> 
      }
    </section>
   } </> 
  )
}

export default Project