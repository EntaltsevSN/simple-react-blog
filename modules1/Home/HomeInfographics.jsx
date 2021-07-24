import React from 'react'
import feed from '../../assets/feed.svg'
import comments from '../../assets/comments.svg'
import fees from '../../assets/fees.svg'
import record from '../../assets/record.svg'
import rewards from '../../assets/rewards.svg'
import members from '../../assets/members.svg'

function HomeInfographics(props) {
  const graphics = [
    {
      id: 1,
      icon: fees,
      property: 'Всего собрано',
      value: '₽ 151 572 893'
    },
    {
      id: 2,
      icon: record,
      property: 'Рекорд дня',
      value: '₽ 2 868 485'
    },
    {
      id: 3,
      icon: members,
      property: 'Всего участников',
      value: '16 721'
    },
    {
      id: 4,
      icon: comments,
      property: 'Всего комментариев',
      value: '34 261'
    },
    {
      id: 5,
      icon: feed,
      property: 'Всего новостей и записей',
      value: '2 509'
    },
    {
      id: 6,
      icon: rewards,
      property: 'Приобретено наград',
      value: '135 182'
    }
  ]


  return (
    <section className="infographics">
      <div className="container infographics__container">
        <div className="row infographics__list">
          { graphics.map(({ id, icon, property, value }) => 
            <div key={id} className="column column--sm-4 infographics__item">
              <img src={icon} alt="" className="infographics__icon"/>
              <p className="infographics__property">{property}</p>
              <p className="infographics__value">{value}</p>
            </div>
          ) }
        </div>
      </div>
    </section>
  )
}

export default HomeInfographics