import React, { useState } from 'react'
import { Link, Route, Switch, useLocation, useParams } from 'react-router-dom'
import { setClasses, setURL } from '../../../config/functions'
import { settings } from '../../../config/settings'

function NewsPost({ news, backURL }) {
  const id = useParams().id
  const post = news.filter(item => Number(item.id) === Number(id))[0]

  return (
    <>
      <article className="project__news-post">
        <p className="project__topbar">
          <Link to={backURL}>К другим новостям</Link>
        </p>
        <h3>{ post.title }</h3>
        <img src={ post.image !== null ? post.image : settings.project.defaultImage } alt="" className={setClasses('project__image', 'cover')} />
        <section className="project__more" dangerouslySetInnerHTML={{__html: post.content}}></section>
      </article>
    </>
  )
}

export default NewsPost