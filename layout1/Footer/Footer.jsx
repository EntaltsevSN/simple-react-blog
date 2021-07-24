import React from 'react'
import FooterCopyright from './FooterCopyright'
import FooterLogo from './FooterLogo'
import FooterMenu from './FooterMenu'
import FooterSocial from './FooterSocial'
import Container from '../../includes/Container'
import { menu } from '../../config/menus'

function Footer(props) {
  return (
    <footer className="footer">
      <section className="container footer__topbar">
        <div className="row footer__row">
          <FooterLogo/>
          <section className="column column--sm-8 row footer__menus">
            <FooterMenu title="Разделы" menu={menu.modules}/>
            <FooterMenu title="Поддержка" menu={menu.support}/>
            <FooterMenu title="Документация" menu={menu.docs}/>
          </section>
        </div>
      </section>
      <section className="footer__bottombar">
        <Container className="footer__container">
          <FooterCopyright/>
          <FooterSocial/>
        </Container>
      </section>
    </footer>
  )
}

export default Footer