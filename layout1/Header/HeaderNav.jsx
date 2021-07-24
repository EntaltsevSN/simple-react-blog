import React from 'react' 
import { Link, useLocation } from 'react-router-dom'
import { setClasses, setURL } from '../../config/functions'
import { menu } from '../../config/menus'

function HeaderNav(props) {
  const url = useLocation().pathname

  return (
    <nav className="header__nav">
      <ul className="header__list">
        { menu.modules.map(({ value, label }) => 
          <li key={value} className="header__item">
            <Link to={setURL(value)} className={
              (url.includes(value) && !url.includes('profile')) ? setClasses('header__link', 'active') : 'header__link'
            }>{label}</Link>
          </li> )}
      </ul>
    </nav>
  )
}

export default HeaderNav