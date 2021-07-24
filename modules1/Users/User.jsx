import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { AiOutlineFieldTime } from 'react-icons/ai'
import { settings } from '../../config/settings'
import { setClasses, setURL } from '../../config/functions'
import { userPermissions } from '../../config/userPermissions'
import Button from '../../includes/Button'
import { Link } from 'react-router-dom'

function User(props) {
  const id = useParams().id
  const user = useSelector(state => state.users.filter(item => Number(item.id) === Number(id))[0])
  const projects = useSelector(state => state.projects.filter(({ id }) => Number(id) !== 0))

  console.log(user)

  const details = [
    { icon: <AiOutlineFieldTime className="profile__icon" />,
      detail: new Date(user.registered).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })
    }
  ]

  const [tab, setTab] = useState('backed')

  return (
    <section className="user">
      <header className="profile__header">
        <section className="profile__shape">
          <img src={ user.avatar !== null ? user.avatar : settings.profile.defaultAvatar } alt="" className="profile__avatar" />
        </section>
        <section className="profile__info">
          <h3 className="profile__name">
            <span>{ user.login }</span>
          </h3>
          <section className="profile__details">
            <div className={setClasses("profile__role", user.role)}>{ 
              userPermissions.filter(({ slug }) => slug === user.role)[0].name
            }</div>
            { details.map(({ icon, detail }) => <div key={detail} className="profile__detail">
              {icon}
              <p className="profile__label">{ detail }</p>
            </div>) }
          </section>
          <section className="profile__about">{ user.about }</section>
        </section>
      </header>
      <section className="profile__data">
        <section className="profile__projects">
          <header className="profile__topbar">
            <h3 className={"profile__title"}>Проекты</h3>
          </header>
          <section className="profile__tabs">
            { (user.role === 'creator' || user.role === 'admin') && <>
              <Button className={setClasses("profile__button", tab === 'backed' ? 'active' : false)} onClick={() => setTab('backed')}>
                Поддержано
              </Button>
              <Button className={setClasses("profile__button", tab === 'created' ? 'active' : false)} onClick={() => setTab('created')}>
                Создано
              </Button>
            </> }
            { tab === 'backed' 
              ? <section className="profile__tab">
                <div className="row profile__row">
                  { projects.filter(({ members }) => members.includes(user.id)).length > 0
                    ? projects.filter(({ members }) => members.includes(user.id)).map(item => 
                      <></>
                    )
                    : <div className="column profile__column">Вы ещё не поддержали ни один проект</div>
                  }
                </div>
              </section>
              : (user.role === 'creator' || user.role === 'admin') ? <section className="profile__tab">
                <div className="row profile__row">
                  { projects.filter(({ creator_id }) => Number(creator_id) === Number(user.id)).length > 0
                    ? projects.filter(({ creator_id }) => Number(creator_id) === Number(user.id)).map(item => 
                        <div className="column column--sm-4 profile__column">
                          <article className={setClasses("card", 'gray')}>
                            <Link className="card__link" to={setURL('projects', item.id)} />
                            <img src={ item.image !== null ? item.image : settings.project.defaultImage } alt="" className="card__image"/>
                            <div className="card__content">
                              <h4 className={setClasses('card__title', 'no-margin')}>{ item.title }</h4>
                            </div>
                          </article>
                        </div>
                    )
                    : <div className="column profile__column">Вы ещё не создали ни одного проекта</div>
                  }
                </div>
              </section> : <></>
            }
          </section>
        </section>
      </section>
    </section>
  )
}

export default User