import React from 'react'
import { settings } from '../../config/settings'

function FooterCopyright(props) {
  return (
    <p className="footer__copyright">
      &copy; {new Date().getFullYear()}. {settings.copyright}
    </p>
  )
}

export default FooterCopyright