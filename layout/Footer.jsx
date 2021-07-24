import React from 'react'
import { Link } from 'react-router-dom'
import { classes, url } from '../config/functions'
import Container from '../includes/Container'

export default props => (
  <footer className="footer">
    <Container type="footer">
      <Link to={url('home')} className={classes("footer__link", 'title')}>
        <h2 className="footer__title">Педагогический клуб <br/>"Путь к совершенству"</h2>
      </Link>
      <nav className="footer__nav">
        <ul className="footer__list">
          <li className="footer__item">
            <Link to={url('sections')} className="footer__link">Разделы</Link>
          </li>
          <li className="footer__item">
            <Link to={url('forum')} className="footer__link">Форум</Link>
          </li>
        </ul>
      </nav>
    </Container>
  </footer>
)