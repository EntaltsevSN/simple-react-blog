import React from 'react'
import { settings } from '../../config/settings'
import vk from '../../assets/vk.svg'
import facebook from '../../assets/facebook.svg'
import twitter from '../../assets/twitter.svg'
import { Link } from 'react-router-dom'

function FooterSocial(props) {
  const social = [
    { id: 1, path: settings.social.vk, icon: vk }, 
    { id: 2, path: settings.social.facebook, icon: facebook },
    { id: 3, path: settings.social.twitter, icon: twitter }
  ]

  return (
    <nav className="social">
      <ul className="social__list">
        { social.map(({ id, path, icon }) => 
          <li key={id} className="social__item">
            <a target="_blank" href={path} className="social__link">
              <img src={icon} alt="" className="social__icon"/>
            </a>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default FooterSocial