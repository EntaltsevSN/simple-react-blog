import React, { useEffect, useState } from 'react'
import { AiOutlineMail, AiOutlineFieldTime } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { setClasses } from '../../config/functions'
import { settings } from '../../config/settings'
import { userPermissions } from '../../config/userPermissions'
import Button from '../../includes/Button'
import FormImage from '../../includes/Form/FormImage'
import FormInput from '../../includes/Form/FormInput'
import FormText from '../../includes/Form/FormText'
import { UpdateUser } from '../../redux/Users/reducer'

function ProfileHeader({ profile, isEditable, setIsEditable, data, setData, avatarFile, setAvatarFile, handleAddress, setHandleAddress }) {
  const dispatch = useDispatch()

  const [avatar, setAvatar] = useState(data.avatar)
  const [login, setLogin] = useState(data.login)
  const [about, setAbout] = useState(data.about)

  console.log(handleAddress)

  useEffect(() => {
    setData({
      ...data,
      avatar, login, about
    })
  }, [avatar, login, about])

  const details = [
    { icon: <AiOutlineMail className="profile__icon" />,
      detail: profile.email, 
    },
    { icon: <AiOutlineFieldTime className="profile__icon" />,
      detail: new Date(profile.registered).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })
    }
  ]

  const handleClick = () => {
    isEditable ? handleSaveChanges() : setIsEditable(!isEditable)
  }

  const handleSaveChanges = () => {
    dispatch(UpdateUser(data, { avatar: avatarFile }, saveCallBack))
  }

  const saveCallBack = boo => {
    setIsEditable(boo)
    setHandleAddress(boo)
  }

  return (
    <section className="profile__header">
      <section className="profile__shape">
        <img src={ avatarFile !== null ? URL.createObjectURL(avatarFile) : avatar !== null ? avatar : settings.profile.defaultAvatar } alt="" className="profile__avatar" />
        { isEditable 
          ? <FormImage value={avatar} setValue={setAvatar} file={avatarFile} setFile={setAvatarFile} isCircle={true} groupClass="margin-top" />
          : <></>
        }
      </section>
      <section className="profile__info">
        <h3 className="profile__name">
          { isEditable 
            ? <FormInput value={login} setValue={setLogin} placeholder="Логин" groupClass="no-margin" /> 
            : <span>{ profile.login }</span> 
          }
          <Button onClick={() => handleClick()} >
            { isEditable ? 'Сохранить' : 'Редактировать' }
          </Button>
        </h3>
        <section className="profile__details">
          <div className={setClasses("profile__role", profile.role)}>{ 
            userPermissions.filter(({ slug }) => slug === profile.role)[0].name
          }</div>
          { details.map(({ icon, detail }) => <div key={detail} className="profile__detail">
            {icon}
            <p className="profile__label">{ detail }</p>
          </div>) }
        </section>
        <section className="profile__about">
          { isEditable ? <FormText value={about} setValue={setAbout} placeholder="О себе" /> : about }
        </section>
      </section>
    </section>
  )
}

export default ProfileHeader