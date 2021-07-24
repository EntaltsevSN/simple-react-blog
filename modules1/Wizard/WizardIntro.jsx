import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WizardAddProjectForm from './WizardAddProjectForm'

function WizardIntro({ setCreatedProject }) {
  const dispatch = useDispatch()
  const profile = useSelector(state => state.profile.data)
  const projects = useSelector(state => state.projects)
  
  return (
    <div class="wizard__intro">
      <h3 className="wizard__title">Добро пожаловать в CrowdWizard!</h3>
      <div className="wizard__text">
        <p>Поздравляем Вас с присвоением звания "Куратора"! Здесь вы сможете создавать ваши проекты и управлять ими.</p>
        <p>Прежде чем вы создадите Ваш первый проект, мы рекомендуем Вам ознакомиться с "Путеводителем куратора", где описаны лучшие практики по ведению и успешному продвижению проектов. Также мы советуем Вам посетить другие проекты, которые уже запустились и активно продвигаются. Так вы сможете определить верный курс развития проекта Вы можете найти их в разделе "Проекты".</p>
        <p>Вы уже определились с идеей проекта? У Вас есть концепция и план развития? Приступайте к созданию Вашего первого проекта! Для этого нажмите на кнопку "Создать проект" и следуйте дальнейшим инструкциям.</p>
      </div>
      <WizardAddProjectForm 
        setCreatedProject={setCreatedProject} 
        profile={profile}
      />
    </div>
  )
}

export default WizardIntro