import React from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { setClasses } from '../../config/functions'
import { menu } from '../../config/menus'

function ProfileSidebar({ profile }) {
  return (
    <aside className="profile__sidebar">
      <nav className="profile__nav">
        <ul className="profile__list">
          { menu.profile.filter(item => item.path !== '#').map(item => 
            item.role === 'any' || (item.role === profile.role || profile.role === 'admin') 
              ? <li key={item.path} className="profile__item">
                <Link to={item.path} className={ 
                useLocation().pathname === item.path ? setClasses('profile__link', 'active') : 'profile__link'
                }>{ item.label }</Link>
              </li>
              : <></>                
          ) }
        </ul>
      </nav>
    </aside>
  )
}

export default ProfileSidebar