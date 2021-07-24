import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getActualProjects } from '../../config/functions'
import { projectStages } from '../../config/projectStages'
import FormSelect from '../../includes/Form/FormSelect'
import { getProjects } from '../../redux/Projects/actions'
import ProjectsCard from './ProjectsCard'

function ProjectsList(props) {
  const projects = useSelector(state => state.projects.filter(({ id }) => Number(id) !== 0))
  const profile = useSelector(state => state.profile.data)
  const search = useSelector(state => state.search)

  const categories = [
    { value: null, label: 'Все проекты' },
    { value: 'BDG', label: 'Настольные игры' },
    { value: 'BOK', label: 'Книги' },
    { value: 'PRC', label: 'Периодика' },
    { value: 'CMX', label: 'Комиксы' },
    { value: 'CST', label: 'Другое' }
  ]

  const stages = [
    { value: null, label: 'Все этапы' },
    { value: 'FND', label: 'Активные' },
    { value: 'CHN', label: 'Второе дыхание' },
    { value: 'PRD', label: 'Доставка' },
    { value: 'PBL', label: 'Изданные' }
  ]

  const [projectsList, setProjectsList] = useState(projects)
  const [category, setCategory] = useState(categories[0].value)
  const [stage, setStage] = useState(stages[0].value)

  useEffect(() => {
    setProjectsList(
      search.length === 0 || search === null 
        ? projects
          .filter(project => category !== null ? project.category === category : Number(project.id) !== 0)
          .filter(project => stage !== null ? project.status === stage : Number(project.id) !== 0)
        : projects
          .filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
    )
  }, [category, stage, search])

  useEffect(() => {
    if(!['', null].includes(search)) {
      setCategory(null)
      setStage(null)
    }
  }, [search])

  const filteredList = stage !== null ? projectsList : getActualProjects(projectsList, profile, projectStages)

  return (
    <div className="projects__list">
      <div className="projects__filters">
        { search.length === 0 || search === null ? <>
          <FormSelect options={categories} value={category} setValue={setCategory} placeholder="По категории" />
          <FormSelect options={stages} value={stage} setValue={setStage} placeholder="По этапу" />
          <span className="projects__quote">или введите запрос в строку поиска выше</span>
        </> : <>Результаты поиска по вашему запросу: <strong>{search}</strong></> }
      </div>
      <div className="row">
        <>{ getActualProjects(projectsList, profile, projectStages).length > 0
        ? getActualProjects(projectsList, profile, projectStages).map(item => 
          <div key={item.id} className="column column--sm-6 column--md-4">
            <ProjectsCard project={item} />
          </div>
        )
        : <p>Доступных проектов не обнаружено</p> 
      }</>
      </div>
    </div>
  )
}

export default ProjectsList