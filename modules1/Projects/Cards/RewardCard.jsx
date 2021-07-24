import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatSum, setClasses } from '../../../config/functions'
import { getNewCartReward } from '../../../config/getters'
import { settings } from '../../../config/settings'
import FormNumber from '../../../includes/Form/FormNumber'
import { UpdateUserCart } from '../../../redux/Users/reducer'
import Button from '../../../includes/Button'
import ProjectGraph from '../Project/ProjectGraph'
import { VscClose } from 'react-icons/vsc'

function RewardCard({ reward, project, cart, setCart }) {
  const profile = useSelector(state => state.profile.data)
  const dispatch = useDispatch()
  const currentReward = cart === null ? undefined: cart.rewards.filter(item => Number(item.id) === Number(reward.id))[0]
  const [showMore, setShowMore] = useState(false)
  const [count, setCount] = useState(currentReward !== undefined ? currentReward.count : 0)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isShowModal, setIsShowModal] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isShowModal ? 'hidden' : 'unset'
  }, [isShowModal]);

  useEffect(() => {
    const callBack = (count) => dispatch(UpdateUserCart(
      profile, 
      {...cart,
        rewards: cart.rewards.filter(item => Number(item.id) === Number(reward.id))[0] !== undefined
          ? [...cart.rewards.map(item => Number(item.id) === Number(reward.id)
            ? {...item, count}
            : item)
          ]
          : [...cart.rewards, getNewCartReward(reward.id, count)]
      },
      setIsDisabled
    ))

    callBack(count)
  }, [count])

  const triggerCart = (action, limit) => {
    setCount(prev => action === 'decrement'
      ? prev === 0 ? 0 : --prev
      : (limit !== 0) ? (++prev > limit) ? limit : ++prev : ++prev
    )
    setIsDisabled(true)
  }

  return ( 
    <>
      <article className="project__reward-card">
        <div className="project__cover">
          <img src={ reward.image !== null ? reward.image : settings.project.defaultImage } alt="" className={setClasses('project__image', 'cover')} />
        </div>
        <section className={ setClasses("project__stats", 'card')}>
          <p className="project__price">{ reward.price === '' ? 'Цена не указана' : formatSum(reward.price) }</p>
          <h4 className={setClasses("project__title", 'small', 'no-margin')}>{ reward.title }</h4>
          <p className="project__text">Куплено: { reward.backed } шт.</p>
          <p className="project__text">Участников: { reward.buyers } чел.</p>
        </section>
        <div className="project__flex">
          <div className="project__badges">
            <div className={setClasses("project__badge", 
              reward.digital ? 'blue' : 'red'
            )}>
              { reward.digital ? 'Электронная' : 'Физическая' }
            </div>
            { reward.second_chance && <div className={setClasses("project__badge", '')}>
              Второе дыхание
            </div> }
          </div>
          <div className="project__controls">
            <Button className="button--cart" onClick={() => triggerCart('decrement', reward.backer_limit)} disabled={isDisabled}>-</Button>
            <FormNumber groupClass='cart' inputClass="cart" value={count} setValue={setCount} max="20" allowZero={true}  />
            <Button className="button--cart" onClick={() => triggerCart('increment', reward.backer_limit)} disabled={isDisabled}>+</Button>
          </div>
        </div>
        <Button className="project__toggle button--link" onClick={() => setShowMore(!showMore)}>
          { showMore ? 'Скрыть' : 'Показать' } описание
        </Button>
        <Button className="project__toggle button--margin-left" onClick={() => setIsShowModal(true)}>
          Посмотреть полностью
        </Button>
        { showMore && <section className="project__more" dangerouslySetInnerHTML={{__html: reward.description}}></section> }
      </article>
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

export default RewardCard