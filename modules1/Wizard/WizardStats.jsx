import React from 'react'
import { useSelector } from 'react-redux'

function WizardStats(props) {
  const profile = useSelector(state => state.profile.data)
  const projects = useSelector(state => state.projects.filter(({ id, creator_id }) => 
    (Number(id) !== 0) && (Number(creator_id) === Number(profile.id))
  ))

  return (
    <section className="wizard__stats">
      <div className="wizard__stat">
        <h3 className="wizard__title">Проекты</h3>
        <div className="wizard__option">
          <div className="wizard__property">Всего проектов</div>
          <div className="wizard__value">{ projects.length }</div>
        </div>
        <div className="wizard__option">
          <div className="wizard__property">Активных проектов</div>
          <div className="wizard__value">{ projects.filter(({ status }) => status === 'FND').length }</div>
        </div>
        <div className="wizard__option">
          <div className="wizard__property">Доступных доставок</div>
          <div className="wizard__value">{ projects.filter(({ status }) => status === 'PBL').length }</div>
        </div>
        <div className="wizard__option">
          <div className="wizard__property">Изданных проектов</div>
          <div className="wizard__value">{ projects.filter(({ status }) => status === 'PBL').length }</div>
        </div>
      </div>
      <div className="wizard__stat">
        <h3 className="wizard__title">События</h3>
        <p>События пока не доступны</p>
      </div>
      <div className="wizard__stat">
        <h3 className="wizard__title">Сборы</h3>
        <p>Сборов у проектов пока нет</p>
      </div>
      <div className="wizard__stat">
        <h3 className="wizard__title">Рейтинг</h3>
        <p>Рейтинг проектов пока недоступен</p>
      </div>
    </section>
  )
}

export default WizardStats