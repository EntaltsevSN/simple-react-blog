import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import AddMessage from '../../includes/AddMessage'
import Button from '../../includes/Button'
import { openModal } from '../../redux/Modal/actions'

export default props => {
  const dispatch = useDispatch()
  const current = useParams().id
  const threads = useSelector(state => state.threads)
  const messages = useSelector(state => state.messages)
  const modal = useSelector(state => state.modal)
  const [isLoading, setIsLoading] = useState(true)
  const [thread, setThread] = useState(null)

  useEffect(() => {
    if(threads !== null && messages !== null) {
      setIsLoading(false)
      setThread(threads.filter(({ id }) => Number(id) === Number(current))[0])
    }
  }, [threads, messages])

  return (
    <section className="thread">
      { isLoading 
      ?  <p>Тема загружается...</p>
      : <>
        <h2 className="thread__title">{ thread.title }</h2>
        <Button onClick={() => dispatch(openModal('add message'))}>Добавить сообщение</Button>
        <section className="thread__messages">
          { messages.sort((a,b) => a.id - b.id).filter(({ thread_id}) => Number(thread_id) === Number(current)).map(({ id, author, text }) => 
            <section key={id} className="thread__message">
              <h3 className="thread__author">{ author }</h3>
              <p className="thread__text">{ text }</p>
            </section>
          ) }
        </section>
      </>
      }
      { modal.isOpened 
        ? modal.type === 'add message'
          ? <AddMessage current={current} />
          : <></>
        : <></>
      }
    </section>
  )
}