import React, { useEffect, useState } from 'react'
import { formatSum } from '../../../config/functions'

function ProjectGraph({ item, project = undefined }) { 
  const percents = Math.floor(100 / item.funding_goal * (project !== undefined ? project.funding_sum : item.funding_sum))
  const finish = new Date(item.date_finish)
  const today = new Date()

  const [timeDiff, setTimeDiff] = useState(Math.floor((item.date_finish - (+new Date())) / 1000 ))

  /*useEffect(() => {
    if(timeDiff > 0) {
      const interval = setInterval(() => {
        setTimeDiff(timeDiff)
      }, 1000);
      return () => timeDiff <= 0 ? false : clearInterval(interval);
    }
  }, [])*/

  const getTime = format => { switch(format) {
      case 'd': return Math.floor(timeDiff / 60 / 60 / 24)
      case 'h': return Math.floor(timeDiff / 60 / 60)
      case 'm': return Math.floor(timeDiff / 60)
      case 's': return Math.floor(timeDiff)
      default: return timeDiff
    }
  }

  const getLastInt = format => +getTime(format).toString().split('').pop()

  const getName = format => { switch(format) {
    case 'd': return getLastInt(format) === 1 ? 'день' : [2, 3, 4].includes(getLastInt(format)) ? 'дня' : 'дней' 
    case 'h': return getLastInt(format) === 1 ? 'час' : [2, 3, 4].includes(getLastInt(format)) ? 'часа' : 'часов' 
    case 'm': return getLastInt(format) === 1 ? 'минута' : [2, 3, 4].includes(getLastInt(format)) ? 'минуты' : 'минут' 
    case 's': return getLastInt(format) === 1 ? 'секунда' : [2, 3, 4].includes(getLastInt(format)) ? 'секунды' : 'секунд' 
  }}

  const timeLeft = 
    getTime('d') >= 1 ? `${getTime('d')} ${getName('d')}` : 
    getTime('h') >= 1 ? `${getTime('h')} ${getName('h')}` : 
    getTime('m') >= 1 ? `${getTime('m')} ${getName('m')}` : 
    getTime('s') >= 1 ? `${getTime('s')} ${getName('s')}` : 
    timeDiff

  return (
    <>
      <section className="project__fees">
        <p className="project__current">{formatSum(
          project !== undefined ? project.funding_sum : item.funding_sum
        )}</p>
        <p className="project__goal">{formatSum(item.funding_goal)}</p>
      </section>
      <section className="project__path">
        <div 
          className="project__current-path" 
          style={{ width: percents > 100 ? '100' : percents + '%' }}
        ></div>
      </section>
      <section className="project__results">
        <p className="project__completed">Достигнуто: {percents}%</p>
        { item.date_finish !== undefined && <p className="project__days-left">
          { timeDiff < 0 ? <>Срок истек</> : <>До завершения: {timeLeft}</> }
        </p> }
      </section>
    </>
  )
}

export default ProjectGraph