import React from 'react'
import { settings } from '../../config/settings'

function PostPoster({ poster }) {
  return (
    <section className="post__shape">
      <img src={poster !== null ? poster : settings.project.defaultImage} alt="" className="post__image"/>
    </section>
  )
}

export default PostPoster