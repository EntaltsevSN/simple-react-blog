import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import PopupItem from './PopupItem'

function Popup(props) {
  const dispatch = useDispatch()
  const popups = useSelector(state => state.popup)
  const [count, setCount] = useState(1)

  const generatePopup = (type, title = undefined) => {
    switch(type) {
      case 'add project':
        return `Проект "${title}" успешно создан!`
      case 'edit project':
        return `Изменения в разделе "${title}" сохранены!`
      case 'edit user':
        return `Данные пользователя успешно обновлены!`
      case 'register user':
        return `Добро пожаловать в Crowd Republic, ${title}!`
      case 'authorize user':
        return `С возвращением, ${title}!`
      case 'logout user':
        return `Возвращайтесь! Ждём Вас снова!`
      case 'subscribe':
        return `Вы успешно подписаны на наши новости!`
      case 'unsubscribe':
        return `Вы успешно отписались от наших новостей!`
      case 'add comment':
        return `Вы успешно добавили комментарий!`
      case 'edit cart':
        return `Корзина обновлена!`
      case 'add project request':
        return `Заявка на подтверждение проекта отправлена!`
      case 'cancel project request':
        return `Заявка на подтверждение проекта отменена!`
      case 'approved project request':
        return `Проект успешно подтвержден!`
      case 'rejected project request':
        return `Проект отклонен!`
      case 'add reward request':
        return `Заявка на подтверждение награды отправлена!`
      case 'cancel reward request':
        return `Заявка на подтверждение награды отменена!`
      case 'approved reward request':
        return `Награда успешно подтверждена!`
      case 'rejected reward request':
        return `Награда отклонена!`
      case 'update user role':
        return 'Пользователь ' + title.login + ' успешно переведен на роль ' + (title.role === 'creator' ? 'Куратор' : title.role === 'moderator' ? 'Модератор' : title.role === 'manager' ? 'Менеджер' : title.role === 'admin' ? 'Администратор' : 'Пользователь')
        case 'add blog':
          return `Пост "${title}" успешно создан!`
        case 'edit blog':
          return `Изменения в посте "${title}" сохранены!`
        case 'delete blog':
          return `Пост "${title}" удален!`
    }
  }

  return (
    <TransitionGroup className="popup">
        { popups.map(item => <CSSTransition key={item.id} timeout={500} classNames="popup__transition">
          <PopupItem value={generatePopup(item.type, item.title)}/>
        </CSSTransition>) }
      </TransitionGroup>
  )
}

export default Popup