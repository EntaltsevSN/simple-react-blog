import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../../includes/Button'
import { CallPopup } from '../../redux/Popup/reducer'
import { TiSocialTwitter, TiSocialFacebook } from 'react-icons/ti'
import { IoLogoVk } from 'react-icons/io'

function HomeSubscribe(props) {
  const dispatch = useDispatch()
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleClick = () => {
    setIsSubscribed(!isSubscribed)
    dispatch(CallPopup(isSubscribed ? 'unsubscribe' : 'subscribe'))
  }

  return (
    <div className="subscribe">
      <h3 className="subscribe__title">Хотите узнавать последние новости сервиса первым? Подпишитесь!</h3>
      <div className="subscribe__controls">
        <Button onClick={() => handleClick()}>
          { isSubscribed ? <>Отписаться</> : <>Подписаться</> }
        </Button>
      </div>
      <h4 className="subscribe__subtitle">Также вы можете поделиться нашим сервисом с Вашими друзьями</h4>
      <div className="subscribe__social">
        <Link to='#' className="subscribe__link"><TiSocialTwitter/></Link>
        <Link to='#' className="subscribe__link"><TiSocialFacebook/></Link>
        <Link to='#' className="subscribe__link"><IoLogoVk/></Link>
      </div>
    </div>
  )
}

export default HomeSubscribe