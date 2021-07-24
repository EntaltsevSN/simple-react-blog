import React from 'react'
import { Link } from 'react-router-dom'
import { setClasses } from '../../../config/functions'

function ProjectNav({ pathname, url }) {

  const projectNav = [
    { id: 1, path: '', label: 'О проекте'},
    { id: 2, path: '/goals', label: 'Сверхцели'},
    { id: 3, path: '/rewards', label: 'Награды'},
    { id: 4, path: '/files', label: 'Файлы'},
    { id: 5, path: '/links', label: 'Ссылки'},
    { id: 6, path: '/news', label: 'Новости'},
    { id: 7, path: '/faq', label: 'Вопросы и ответы'},
    { id: 8, path: '/comments', label: 'Комментарии'}
  ]

  return (
    <nav className="project__nav">
      <ul className="project__menu">
        { projectNav.map(({ id, path, label }) => 
          <li 
            key={id} 
            className={path.length !== 0 && pathname.includes(path) 
              ? setClasses('project__item', 'active')
              : path.length === 0 && pathname === url 
                ? setClasses('project__item', 'active') : 'project__item'
            }
          >
            <Link to={url + path} className="project__link">{label}</Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default ProjectNav