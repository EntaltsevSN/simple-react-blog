import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { classes, url } from '../../config/functions'
import Button from '../../includes/Button'
import CategoryIcon from '../../includes/CategoryIcon'
import { OpenModal } from '../../redux/Modal/reducer'

export default ({ showControls = true }) => {
  const dispatch = useDispatch()
  const threads = useSelector(state => state.threads)
  const messages = useSelector(state => state.messages)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if(threads !== null && messages !== null) {
      setIsLoading(false)
    }
  }, [threads, messages])
  
  return (
    <section className="forum__list">
      { isLoading 
        ? <section className="sections__item column">Форум загружается...</section>
        : <>
        { showControls && <Button onClick={() => dispatch(OpenModal('add thread'))}>Добавить тему</Button> }
        { threads.sort((a,b) => b.id - a.id).map(({ id, title }) => 
        <section key={id} className="forum__thread">
          <section className={classes("forum__section", 'info')}>
            <Link className="forum__link" to={url('forum', id)}>
              <h3 className="forum__name">{ title }</h3>
            </Link>
          </section>
          <section className={classes("forum__section", 'count')}>
            <p className="forum__count">{ messages.filter(({ thread_id }) => thread_id === id).length }</p>
          </section>  
        </section> )}</>
      }
    </section>
  )
}