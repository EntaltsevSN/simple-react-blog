import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setClasses, setURL } from '../../config/functions'
import Button from '../../includes/Button'
import FormText from '../../includes/Form/FormText'
import { UpdateRequest } from '../../redux/Management/reducer'
import { VscClose } from 'react-icons/vsc'
import FormEditor from '../../includes/Form/FormEditor'
import FormSelect from '../../includes/Form/FormSelect'


function ProfileManager(props) {
  const dispatch = useDispatch()
  const requests = useSelector(state => state.management.filter(item => item.id !== 0 && item.status === 'pending'))
  const projects = useSelector(state => state.projects)

  const getProject = id => projects.filter(project => project.id === id)[0]
  const getReward = (list, id) => list.filter(reward => reward.id === id)[0]

  const [showCommentForm, setShowCommentForm] = useState(false)
  const [comment, setComment] = useState('')
  const [status, setStatus] = useState('')
  const [data, setData] = useState({})

  const prepareAnswer = (status, type, dataId, project) => {
    setStatus(status)
    setData({ type, dataId, project })
    setShowCommentForm(true)
  }

  console.log(status, data)

  const answer = () => {
    setShowCommentForm(false)
    dispatch(UpdateRequest(requests, data.type, data.dataId, status, comment, data.project))
  }

  return (
    <div className="management">
      <h3 className="management__title">Заявки на подтверждение</h3>
      { requests.length > 0 
        ? requests.map(item => <article className="management__request" key={item.id}>
          <h4 className="management__title">
            Заявка на подтверждение {item.type === 'project' ? <>проекта</> : <>награды</>}:  
            {item.type === 'project' 
              ? getProject(item['data_id']).title
              : getReward(getProject(item['data_id'].project).rewards, item['data_id'].reward).title }
          </h4>
          <div className="management__flex">
            <Link to={item.type === 'project' 
              ? setURL('projects', item['data_id'])
              : setURL('projects', item['data_id'].project, 'rewards')
            }>Посмотреть { item.type === 'project' ? <>проект</> : <>награду</> }</Link>
            <section className="management__controls">
              <Button className="management__button button--apd" onClick={
                () => prepareAnswer(
                  'approved', item.type, item['data_id'], getProject(item.type === 'project' 
                  ? item['data_id'] : item['data_id'].project
                )
                )
              }>Подтвердить</Button>
              <Button className="management__button button--flr" onClick={
                () => prepareAnswer(
                  'rejected', item.type, item['data_id'], getProject(item.type === 'project' 
                  ? item['data_id'] : item['data_id'].project
                )
                )
              }>Отклонить</Button>
            </section>
          </div>
        </article>)
        : <section className="management__empty">
          Новых заявок пока нет
        </section> }
        { showCommentForm && <>
            <section className={setClasses("modal", 'post')}>
              <div className="modal__header">
                <h3 className="modal__title">Оставьте комментарий к ответу</h3>
                <Button className="button--link" onClick={() => setShowCommentForm(false)}>
                  <VscClose className="modal__cross" />
                </Button>
              </div>
              <div className={setClasses("modal__body", 'post')}>
                <FormEditor value={comment} setValue={setComment} placeholder="Комментарий" hideCollapse={true} />
              </div>
              <div className={setClasses("modal__footer", 'post')}>
                <Button onClick={() => answer()}>Отправить</Button>
              </div>
            </section>
            <div className="overlay" onClick={ () => setIsPost(false) }></div>
          </> }
    </div>
  )
}

export default ProfileManager