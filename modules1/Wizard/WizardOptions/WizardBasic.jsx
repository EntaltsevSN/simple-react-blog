import React, { useEffect, useState } from 'react'
import FormInput from '../../../includes/Form/FormInput'
import FormSelect from '../../../includes/Form/FormSelect'
import FormText from '../../../includes/Form/FormText'
import FormEditor from '../../../includes/Form/FormEditor'
import FormPrice from '../../../includes/Form/FormPrice'
import FormDate from '../../../includes/Form/FormDate'
import FormCheckbox from '../../../includes/Form/FormCheckbox'
import Button from '../../../includes/Button'
import { Redirect, useLocation, useParams, useRouteMatch } from 'react-router'
import FormImage from '../../../includes/Form/FormImage'
import { Link } from 'react-router-dom'
import { setURL } from '../../../config/functions'

function WizardBasic({ project, data, setData, getCards, handleSaveChanges, isSavedChanges, setIsSavedChanges }) {
  let path = useLocation().pathname.split('/')
  path.pop()  

  const url = path.join('/')

  const [title, setTitle] = useState(data.title)
  const [category, setCategory] = useState(data.category)
  const [description, setDescription] = useState(data.description)
  const [content, setContent] = useState(data.content)
  const [goal, setGoal] = useState(data.funding_goal)
  const [dateStart, setDateStart] = useState(data.date_start)
  const [dateFinish, setDateFinish] = useState(data.date_finish)
  const [dateSecondChance, setDateSecondChance] = useState(data.date_second_chance)
  const [noGoal, setNoGoal] = useState(data.no_funding_goal)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [template, setTemplate] = useState(data.template)
  const [templateImages, setTemplateImages] = useState(data.templateImages)

  const [leftImage, setLeftImage] = useState(data.templateImages.left)
  const [leftImageFile, setLeftImageFile] = useState(null)
  const [rightImage, setRightImage] = useState(data.templateImages.right)
  const [rightImageFile, setRightImageFile] = useState(null)

  const categories = [
    { value: null, label: 'Все проекты' },
    { value: 'BDG', label: 'Настольные игры' },
    { value: 'BOK', label: 'Книги' },
    { value: 'PRC', label: 'Периодика' },
    { value: 'CMX', label: 'Комиксы' },
    { value: 'CST', label: 'Другое' }
  ]

  const templates = [
    { value: 'basic', label: 'Стандартный шаблон' },
    { value: 'aside', label: 'Боковые рамки' }    
  ]

  useEffect(() => {
    setData({
      ...data,
      title, category, description, content, goal, date_start: dateStart, date_finish: dateFinish, date_second_chance: dateSecondChance, template, templateImages: {...templateImages, left: leftImage, right: rightImage}
    })
  }, [title, category, description, content, goal, dateStart, dateFinish, dateSecondChance, template, leftImage, rightImage])

  const comeBack = () => {
    setData(project)
    setIsSavedChanges(true)
  }

  return (
    <section className="wizard__form">
      <h3 className="wizard__title">{ getCards(data).filter(({ slug }) => slug === 'basic')[0].title }</h3>
      { 
      (['APG', 'RJD', 'SCD', 'FLR'].includes(project.status) ||
      ['FND', 'CHN'].includes(getCards(data).filter(({ slug }) => slug === 'basic')[0].slug))
      ? <><p className="wizard__text">
        Доступ к данному модулю ограничен согласно условиям заполнения проекта. Узнать об этих условиях вы можете <a href="#">здесь</a>.</p>
        <Link to={url} className="button">Вернуться</Link>
        </>
      : <>      
        <FormInput value={title} setValue={setTitle} placeholder='Название' id='title' disabled={['FND', 'CHN'].includes(project.status)} />
        <FormSelect options={categories} value={category} setValue={setCategory} placeholder='Категория' id="category" disabled={['FND', 'CHN'].includes(project.status)} />
        <FormText value={description} setValue={setDescription} placeholder='Описание' id="description" />
        <FormEditor value={content} setValue={setContent} placeholder='Полное описание проекта' isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} id="content" />
        { !noGoal && <FormPrice value={goal} setValue={setGoal} placeholder='Цель проекта' id="goal" disabled={['FND', 'CHN'].includes(project.status)} /> }
        <FormCheckbox value={noGoal} setValue={setNoGoal} placeholder="Без цели" id="noGoal" margin="8" disabled={['FND', 'CHN'].includes(project.status)} />
        <FormDate value={dateStart} setValue={setDateStart} noPast id="dateStart" disabled={['FND', 'CHN'].includes(project.status)} />
        <FormDate value={dateFinish} setValue={setDateFinish} noPast id="dateFinish" disabled={['FND', 'CHN'].includes(project.status)} />
        { project['second_chance'] && <FormDate value={dateSecondChance} setValue={setDateSecondChance} noPast id="dateSecondChance" disabled={['FND', 'CHN'].includes(project.status)} /> }
        <FormSelect options={templates} value={template} setValue={setTemplate} placeholder="Шаблон" id="template" />

        { template !== 'basic' && <>
          <FormImage value={leftImage} setValue={setLeftImage} file={leftImageFile} setFile={setLeftImageFile} directUpload={true} cropImage={false} groupClass="margin-top" placeholder="Выберите изображение слева" id="1" /> 
          <FormImage value={rightImage} setValue={setRightImage} file={rightImageFile} setFile={setRightImageFile} directUpload={true} cropImage={false} groupClass="margin-top" placeholder="Выберите изображение справа" id="2" />
          { (leftImage !== null || rightImage !== null) && <section className="form__flex" style={{ marginBottom: '32px' }}>
            { leftImage !== null && <img src={leftImage} style={{ height: '450px' }} /> }
            { rightImage !== null && <img src={rightImage} style={{ height: '450px' }} /> } 
          </section> }
        </>
      }

      <div className="wizard__controls">
        <Button onClick={() => handleSaveChanges('basic')}>Сохранить</Button>
        <Button onClick={() => comeBack()} className="button--bordered button--margin-left">Вернуться</Button>
      </div>
      {isSavedChanges && <Redirect to={url} />}
      </> }
    </section>
  )
}

export default WizardBasic