import React, { useState } from 'react'
import { useLocation, useRouteMatch } from 'react-router'
import { Link } from 'react-router-dom'
import { setClasses } from '../../../config/functions'
import { settings } from '../../../config/settings'
import Button from '../../../includes/Button'
import ProjectGraph from '../Project/ProjectGraph'

function LinkCard({ link }) {
  const [showMore, setShowMore] = useState(false)
  console.log(link.url)

  return (
    <article className="project__file-card">
      <h4 className={setClasses("project__title", 'small')}>
        <a href={'http://' + link.url} target="_blank">{ link.title }</a>
      </h4>
    </article>
  )
}

export default LinkCard