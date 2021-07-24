import React from 'react'
import { Link } from 'react-router-dom'
import { classes, url } from '../config/functions'
import Container from '../includes/Container'
import TreeIcon from '../includes/TreeIcon'

export default props => (
  <header className="header">
    <Container type="header">
      <Link to={url('home')} className={classes("header__link", 'title')}>
        <h1 className="header__title">
          <TreeIcon color="#882ff6" />
          Педагогический клуб <br/>"Путь к совершенству"
        </h1>
      </Link>
      <nav className="header__nav">
        <ul className="header__list">
          <li className="header__item">
            <Link to={url('sections')} className="header__link">Разделы</Link>
          </li>
          <div className="header__item">
            <Link to={url('forum')} className="header__link">Форум</Link>
          </div>
        </ul>
      </nav>
    </Container>
  </header>
)