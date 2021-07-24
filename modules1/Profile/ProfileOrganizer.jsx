import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dataBase } from '../../config/firebase'
import Select from 'react-select'
import { userPermissions } from '../../config/userPermissions'
import { profile } from '../../redux/Profile/reducer'
import { UpdateUserRole } from '../../redux/Users/reducer'
import { isEmail, isNumeric } from '../../config/functions'
import { Link } from 'react-router-dom'
import { VscEdit } from 'react-icons/vsc'

function ProfileOrganizer(props) {
  const dispatch = useDispatch()

  const profile = useSelector(state => state.profile.data)
  const users = useSelector(state => state.users)
  const [userData, setUserData] = useState([])  
  const [query, setQuery] = useState('') 
  
  useEffect(() => {
    const callBack = async () => {
      await dataBase.collection('users').get().then(query => {
        const list = []
        query.forEach(doc => list.push({
          id: doc.id,
          email: doc.data().email
        }))
        setUserData(list)        
      })
    }
    callBack()
  }, [])

  const handleUpdateUser = (e, data) => {
    console.log(e)
    console.log(data)
    const user = {
      ...data, 
      role: e.value
    }
    dispatch(UpdateUserRole(user))
  }

  const handleChange = e => {
    isNumeric(e.target.value)
    setQuery(e.target.value)
  }

  return (
    <>  
      { users.length > 0 ? users.filter(item => item.email === profile.email)[0].role === 'admin' ? <>
        <header className="profile__header profile__header--with-margin">
          <h2 className="profile__title">Управление пользователями</h2>
        </header>
        <div className="profile__table">
          <form action="" className="form">
            <section className="form__group">
              <input 
                type="text" 
                name="" 
                id="" 
                className="form__input"
                placeholder="Введите ID, логин или email пользователя"
                value={query}
                onChange={e => handleChange(e)}
              />
            </section>
          </form>
          <div className="editor table">
            <div className="editor__list table__row table__row--head">
              <div className="editor__item table__column">ID</div>
              <div className="editor__item table__column">Логин</div>
              <div className="editor__item table__column">Роль</div>
              <div className="editor__item table__column">Просмотр</div>
            </div>
            { users.filter(item => item.id !== 0 && item.email !== profile.email).filter(item =>
              query.length > 0
                ? isNumeric(query) 
                  ? (String(item.id).includes(query) || String(item.id) == query) 
                  : isEmail(query) 
                    ? (item.email.includes(query) || item.email == query || item.login.includes(query) || item.login == query) 
                    : (item.login.toLowerCase().includes(query.toLowerCase()) || item.login.toLowerCase() == query.toLowerCase()) 
                : item).map(user => <div key={user.id} className="editor__list table__row">
              <div className="editor__item table__column">{ user.id }</div>
              <div className="editor__item table__column">{ user.login }</div>
              <div className="editor__item table__column"><Select
                options={
                  userPermissions.map(item => ({value: item.slug, label: item.name}))
                }
                value={userPermissions.filter(item => item.slug === user.role)
                  .map(item => ({value: item.slug, label: item.name}))
                }
                onChange={e => handleUpdateUser(e, user)}
              /></div>
              <div className="editor__item table__column"><Link to={'/admin/users/update?id=' + user.id}><VscEdit /></Link></div>
            </div> )}
          </div>
        </div>
      </> : <>Вы не имеете прав для доступа к данной странице</> : <>Загрузка...</> }
    </>
  )
}

export default ProfileOrganizer