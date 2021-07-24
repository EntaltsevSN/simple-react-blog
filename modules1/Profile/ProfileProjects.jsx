import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setClasses, setURL } from '../../config/functions'
import { settings } from '../../config/settings'
import Button from '../../includes/Button'

function ProfileProjects({ profile }) {
  const projects = useSelector(state => state.projects.filter(({ id }) => Number(id) !== 0))
  const [tab, setTab] = useState('backed')

  return (
    <section className="profile__projects">
      <header className="profile__topbar">
        <h3 className={setClasses("profile__title", 'no-margin')}>Проекты</h3>
        { (profile.role === 'creator' || profile.role === 'admin') && <Link to={setURL('wizard')} className="button">Перейти в Wizard</Link> }
      </header>
      { (profile.role === 'creator' || profile.role === 'admin') && <section className="profile__creator">
        <p><strong>Добро пожаловать, Куратор!</strong></p>
        <p>{ projects.filter(({ creator_id }) => Number(creator_id) === Number(profile.id)).length > 0
          ? <>Вы уже успели создать свои первые проекты. { 
            projects.filter(({ creator_id, status }) => (
              Number(creator_id) === Number(profile.id) && 
              (!['NEW', 'APG', 'RJD', 'APD', 'SCD'].includes(status))
              && <>И некоторые из них уже активно собирают средства. </>
            )).length > 0 }</>
          : <>Вы готовы создать Ваш первый проект и начать свою первую компанию?</>
        } Мы предлагаем Вам ознакомиться с нашим <Link to={ setURL('1') }>"Путеводителем куратора"</Link>, в котором мы собрали лучшие практики из самых успешных проектов.  </p>
      </section> }
      <section className="profile__tabs">
        { (profile.role === 'creator' || profile.role === 'admin') && <>
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
              { projects.filter(({ members }) => members.includes(profile.id)).length > 0
                ? projects.filter(({ members }) => members.includes(profile.id)).map(item => 
                  <></>
                )
                : <div className="column profile__column">Вы ещё не поддержали ни один проект</div>
              }
            </div>
          </section>
          : (profile.role === 'creator' || profile.role === 'admin') ? <section className="profile__tab">
            <div className="row profile__row">
              { projects.filter(({ creator_id }) => Number(creator_id) === Number(profile.id)).length > 0
                ? projects.filter(({ creator_id }) => Number(creator_id) === Number(profile.id)).map(item => 
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
  )
}

export default ProfileProjects