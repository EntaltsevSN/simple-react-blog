import React from 'react'
import { Link } from 'react-router-dom'
import { setURL } from '../../config/functions'
import { menu } from '../../config/menus'
import { settings } from '../../config/settings'

function FooterMenu({ title, menu }) {
  return (
    <div className="column column--sm-4 footer__menu">
      <p className="footer__title">{ title }</p>
      <ul className="footer__list">
        { menu.map(({ path, label }) => 
          <li key={path} className="footer__item">
            <Link to={setURL(path)} className="footer__link">{label}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default FooterMenu