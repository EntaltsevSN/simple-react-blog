import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../includes/Button'
import { AddProject } from '../../redux/Projects/reducer'


function WizardAddProjectForm({ setCreatedProject, profile }) {
  const dispatch = useDispatch()
  const projects = useSelector(state => state.projects)
  const [showInput, setShowInput] = useState(false)
  const [title, setTitle] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    dispatch(AddProject({ title, creatorId: profile.id }, projects, setCreatedProject))
    setTitle('')
    setShowInput(false)
  }

  return (
    <>
      { !showInput && 
        <Button onClick={() => setShowInput(!showInput)}>Создать проект</Button> 
      }
      { showInput && 
        <form action="" className="form" onSubmit={e => handleSubmit(e)}>
          <section className="form__group">
            <input 
              type="text" 
              className="form__input"
              placeholder="Введите название проекта"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </section>
          <Button type="submit">Продолжить</Button>
        </form> 
      }
    </>
  )
}

export default WizardAddProjectForm