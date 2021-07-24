import React, { useEffect, useState } from 'react'
import { VscClose } from 'react-icons/vsc'
import { Link, useLocation, useRouteMatch } from 'react-router-dom'
import { formatSum, setClasses, setURL } from '../../../config/functions'
import { settings } from '../../../config/settings'
import Button from '../../../includes/Button'

function SidebarCard({ reward }) {
  const [isShowModal, setIsShowModal] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isShowModal ? 'hidden' : 'unset'
  }, [isShowModal]);

  return (
    <>
      <div className={setClasses("card", 'sidebar')}>
        <section className="card__shape">        
          <img src={reward.image !== null ? reward.image : settings.project.defaultImage} alt="" className="card__image"/>
        </section>
        <div className="card__content">
          <div className="card__price">
            { reward.price === '' ? 'Цена не указана' : formatSum(reward.price) }
          </div>
          { reward.title.length > 0 && <h4 className="card__title">{ reward.title }</h4> }
          { reward.description.length > 0 && <p className="card__description">{ reward.description }</p> }
          <div className="card__stats">
            <div className={setClasses("card__text-between", 'small')}>
              <p className="card__text">Куплено: { reward.backed } шт.</p>
              <p className="card__text">Участников: { reward.buyers } чел.</p>
            </div>
            <div className="card__text-between">
              <Link to={setURL('')} className="button">Поддержать</Link>
              <Button className={setClasses('button', 'bordered')} onClick={() => setIsShowModal(true)}>Посмотреть</Button>
            </div>
          </div>
        </div>
      </div>
      { isShowModal && <>
        <section className={setClasses("modal", 'post')}>
          <div className="modal__header">
            <h3 className="modal__title">{ reward.title }</h3>
            <Button className="button--link" onClick={() => setIsShowModal(false)}>
              <VscClose className="modal__cross" />
            </Button>
          </div>
          <div className={setClasses("modal__body", 'post')}>
            <article className="project__news-post">
              <img src={ reward.image !== null ? reward.image : settings.project.defaultImage } alt="" className={setClasses('project__image', 'cover')} />
              <section className="project__more" dangerouslySetInnerHTML={{__html: reward.content}}></section>
            </article>
          </div>
        </section>
        <div className="overlay" onClick={ () => setIsShowModal(false) }></div>
      </> }
    </>
  )
}

export default SidebarCard