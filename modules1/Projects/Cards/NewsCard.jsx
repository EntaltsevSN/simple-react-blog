import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Redirect, Route, Switch, useLocation, useParams, useRouteMatch } from 'react-router-dom'
import { setClasses, setURL } from '../../../config/functions'
import { settings } from '../../../config/settings'
import Button from '../../../includes/Button'
import { UpdateProjectNews } from '../../../redux/Projects/reducer'
import Comments from '../../Comments/Comments'
import { VscClose } from 'react-icons/vsc'

function Card({ post, url, isPost, setIsPost, routeURL, project }) {
  const callBack = UpdateProjectNews()
  const pathname = useLocation().pathname
  const module = pathname.split('/')[1]
  
  useEffect(() => {
    document.body.style.overflow = isPost ? 'hidden' : 'unset'
  }, [isPost]);

  return (
    <>
      <article className="project__news-card">
        <div className="project__cover">
          <img src={ post.image !== null ? post.image : settings.project.defaultImage } alt="" className={setClasses('project__image', 'cover')} />
        </div>
        <section className={ setClasses("project__stats", 'card')}>
          <h4 className={setClasses("project__title", 'small', 'no-margin')}>{ post.title }</h4>
          <p className="project__description">{ post.description }</p>
        </section>
        <Link to={setURL(url.substring(1), post.id)} className={setClasses('button', 'margin-top')} onClick={ () => setIsPost(true) }>Читать</Link>
      </article>
      <Switch>
        <Route exact path={setURL(routeURL)}>
          <></>
        </Route>
        <Route path={setURL(routeURL, ':id')}>
          <>
            <section className={setClasses("modal", 'post')}>
              <div className="modal__header">
                <h3 className="modal__title">{ post.title }</h3>
                <Button className="button--link" onClick={() => setIsPost(false)}>
                  <VscClose className="modal__cross" />
                </Button>
              </div>
              <div className={setClasses("modal__body", 'post')}>
                <article className="project__news-post">
                  <img src={ post.image !== null ? post.image : settings.project.defaultImage } alt="" className={setClasses('project__image', 'cover')} />
                  <section className="project__more" dangerouslySetInnerHTML={{__html: post.content}}></section>
                </article>
                <Comments module='news' post={post} project={project} />
              </div>
            </section>
            <div className="overlay" onClick={ () => setIsPost(false) }></div>
          </>
        </Route>
      </Switch>
      { isPost ? <Redirect to={setURL(routeURL, post.id)} /> : <Redirect to={setURL(routeURL)} /> }
      { isPost && <div className="hidden-text">
        { document.body.style.overflow = isPost ? 'hidden' : 'unset'}  
      </div>}
    </>
  )
}

function NewsCard({ post, project }) {
  const profile = useSelector(state => state.profile.data)
  const [showMore, setShowMore] = useState(false)
  const url = useRouteMatch().url
  const routeURL = url.substring(1)
  const [isPost, setIsPost] = useState(String(useLocation().pathname) !== String(url) ? true : false)

  const cardOptions = {
    post, url, isPost, setIsPost, routeURL, project
  }

  console.log(post)

  return ( 
    <>
      {
        post.published 
          ? post.membersOnly 
            ? project.members.includes(profile.id)
              ? <Card {...cardOptions} />
              : <></>
            : <Card {...cardOptions} />
          : (Number(profile.id) === Number(project.creator_id) || profile.role === 'admin')
            ? <Card {...cardOptions} />
            : <></>

      }
    </>
  )
}

export default NewsCard