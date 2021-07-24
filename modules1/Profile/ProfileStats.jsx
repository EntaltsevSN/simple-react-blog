import React from 'react'

function ProfileStats(props) {
  return (
    <section className="profile__stats">
      <article className="profile__stat">
        <p className="profile__property">Поддержано:</p>
        <p className="profile__value">0 проектов</p>
      </article>
      <article className="profile__stat">
        <p className="profile__property">Понравилось:</p>
        <p className="profile__value">0 новостей</p>
      </article>
      <article className="profile__stat">
        <p className="profile__property">Написано:</p>
        <p className="profile__value">0 комментариев</p>
      </article>
    </section>
  )
}

export default ProfileStats