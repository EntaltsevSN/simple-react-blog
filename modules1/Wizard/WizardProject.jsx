import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkOptions, setClasses, setURL } from '../../config/functions'
import { Link, useLocation, useParams, useRouteMatch } from 'react-router-dom'
import WizardStage from './WizardStage'
import { VscQuestion, VscInfo } from 'react-icons/vsc'

function WizardProject({ id, getCards }) {
  const dispatch = useDispatch()
  const profile = useSelector(state => state.profile.data)
  const url = useLocation().pathname
  const project = useSelector(state => state.projects.filter(item => Number(item.id) === Number(id))[0])

  return (
    <div className="wizard__project">
      <header className="wizard__header">
        <h3 className="wizard__title">{ project.title }</h3>
        { (Number(project.creator_id) === Number(profile.id) || profile.role === 'admin') && <Link to={setURL('projects', id)}>Посмотреть</Link> }
      </header>
      <ul className="wizard__sections row">
        { getCards(project).map(item => <li key={item.id} className="wizard__section column column--sm-6">
          <section className="wizard__wrapper" disabled={
            (project.status === 'APG' || project.status === 'RJD' || project.status === 'SCD'  || project.status === 'FLR' || project.status === 'CSD') ? true : item.disabled === undefined ? false : item.disabled.includes(project.status) ? true : false
          }>
            { (['FND', 'CHN'].includes(project.status) && ['basic', 'goals', 'rewards'].includes(item.slug)) && <>
              <div className={setClasses('advice', 'important')}>
                <VscInfo className="advice__question"/>
                <div className="advice__recommendation">
                  <p className="advice__explanation">Обратите внимание, что на этом этапе в этом модуле не доступны для редактирования определенные настройки.</p>
                </div>
              </div>
            </> }
            { item.icon }
            <div className="wizard__proper">
              <Link to={setURL('wizard', id, item.slug)} className="wizard__redirect"></Link>
              <h4 className={ setClasses("wizard__title", 'section') }>{ item.title }</h4>
              <div className="wizard__counter">
                { (item.id === 1 || item.id === 2)
                  ? <>{ checkOptions(item.data) } из { item.data.length } полей заполнено</>
                  : <>{ item.data.length } элементов добавлено</>
                }
              </div>
            </div>
          </section>
        </li>) }
      </ul>
      <WizardStage project={project} />
    </div>
  )
}

export default WizardProject