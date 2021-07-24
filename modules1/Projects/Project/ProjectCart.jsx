import React, { useState } from 'react'
import { formatSum, setClasses } from '../../../config/functions'
import Button from '../../../includes/Button'
import { VscClose, VscSettings } from 'react-icons/vsc'
import { useSelector } from 'react-redux'
import { settings } from '../../../config/settings'

function ProjectCart({ project }) {
  const profile = useSelector(state => state.profile.data)
  console.log(profile.cart.filter(item => Number(item.project_id) === Number(project.id))[0])
  const rewards = profile.cart.filter(item => Number(item.project_id) === Number(project.id))[0] === undefined ? undefined : profile.cart.filter(item => Number(item.project_id) === Number(project.id))[0].rewards
  
  const getItem = id => project.rewards.filter(item => Number(item.id) === Number(id))[0]

  return (
    <>{ rewards === undefined ? <>Загрузка...</> : 
      <section className="cart-widget">
        <header className="cart-widget__header">
          <h4 className={setClasses("project__title", 'small')}>Ваша корзина</h4>
        </header>
        <section className="cart-widget__list">
          { rewards.filter(item => item.count > 0).length > 0 
            ? rewards.map(reward => <React.Fragment key={reward.id}>
              <article className="cart-widget__item">
                { console.log(getItem(reward.id), reward) }
                <img src={
                  getItem(reward.id).image !== null ? getItem(reward.id).image : settings.project.defaultImage
                } alt="" className="cart-widget__image"/>
                <div className="cart-widget__info">
                  <h4 className="cart-widget__title">{getItem(reward.id).title}</h4>
                  <p className="cart-widget__count">Количество: {reward.count}</p>
                </div>
                <p className="cart-widget__price">{ formatSum(Number(project.rewards.filter(item => Number(item.id) === Number(reward.id))[0].price) * Number(reward.count)) }</p>
              </article>
            </React.Fragment>)
            : <p className="cart-widget__null">Вы ещё не приобрели ни одной награды</p>
          }
        </section>
      </section>
    }</>
  )
}

export default ProjectCart