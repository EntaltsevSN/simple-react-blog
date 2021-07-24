import React, { useState } from 'react'
import { AiOutlineLogin } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../includes/Button'
import Dropdown from '../../includes/Dropdown'
import { openModal } from '../../redux/Modal/actions'
import { menu } from '../../config/menus';

function HeaderMenu(props) {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.profile.isLoggedIn)
  const profile = useSelector(state => state.profile.data)

  return (
    <section className="header__section">
      { isLoggedIn
        ? <Dropdown button="link" icon={<CgProfile className="header__icon" />} type="menu" menu={menu.profile} profile={profile} />
        : <Button className="button--link" onClick={() => dispatch(openModal())}>
          <AiOutlineLogin className="header__icon" />
        </Button>
      }
    </section>
  )
}

export default HeaderMenu