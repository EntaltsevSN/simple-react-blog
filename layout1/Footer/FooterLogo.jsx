import React from 'react'
import { Link } from 'react-router-dom'
import { setURL } from '../../config/functions'
import logo from '../../assets/logo.svg'
import { settings } from '../../config/settings'

function FooterLogo(props) {
  return (
    <div className="column column--sm-4 footer__column">
      <Link to={setURL('home')} className="footer__link">
        <img src={logo} alt="" className="footer__logo"/>
      </Link>
      <p className="footer__description">{ settings.footer.description }</p>
    </div>
  )
}

export default FooterLogo