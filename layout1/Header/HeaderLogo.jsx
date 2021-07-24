import React from 'react'
import { setClasses, setURL } from '../../config/functions'
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'

function HeaderLogo(props) {
  return (
    <Link to={setURL('home')} className={setClasses('header__link', 'logo')}>
      <img src={logo} alt="" className="header__logo"/>
    </Link>
  )
}

export default HeaderLogo