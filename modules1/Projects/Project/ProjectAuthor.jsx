import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setClasses, setURL } from '../../../config/functions'
import { settings } from '../../../config/settings'
import { userPermissions } from '../../../config/userPermissions'

function ProjectAuthor({ id }) {
  const author = useSelector(state => state.users.filter(item => Number(item.id) === Number(id))[0])

  return (
    <Link to={setURL('users', author.id)} className="author">
      <img src={author.avatar !== null ? author.avatar : settings.profile.defaultAvatar} alt=""className="author__avatar"/>
      <div className="author__info">
        <p className="author__name">{ author.login }</p>
        <p className={ setClasses("author__role", author.role) }>
          { userPermissions.filter(({ slug }) => slug === author.role)[0].name }
        </p>
      </div>
    </Link> 
  )
}

export default ProjectAuthor