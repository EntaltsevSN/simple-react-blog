import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { formatSum, getActualProjects, setClasses, setURL } from '../../config/functions'
import { projectStages } from '../../config/projectStages'
import FormSearch from '../../includes/Form/FormSearch'
import { setSearch } from '../../redux/search'

function HeaderSearch(props) {
  const dispatch = useDispatch()
  const projects = useSelector(state => state.projects)
  const profile = useSelector(state => state.profile.data)
  const search = useSelector(state => state.search)
  const url = useLocation().pathname

  const [query, setQuery] = useState(search)
  const [queryProjects, setQueryProjects] = useState([])
  const [redirectToResults, setRedirectToResults] = useState(false)

  useEffect(() => {
    setQueryProjects(
      query.length > 0 
        ? getActualProjects(projects, profile, projectStages)
          .filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
        : getActualProjects(projects, profile, projectStages)
    )
  }, [query])

  useEffect(() => {
    if(!redirectToResults) {
      handleValue('')
    }
    setRedirectToResults(false)
  }, [url])

  const handleValue = str => {
    setQuery(str)
    dispatch(setSearch(str))
  }

  const handleEnterInput = e => {
    e.key === 'Enter' 
      ? url !== '/projects' 
        ? !['', null].includes(search)
          ? setRedirectToResults(true) 
          : false 
        : false
      : false
  }
  
  return (
    <section className="header__search">
      <div className={setClasses("form", 'search')}>
        <FormSearch value={query} setValue={handleValue} placeholder="Введите название проекта" groupClass="no-margin" onEnter={handleEnterInput}/>
        { query.length > 0 && <div className="search">
          <ul className="search__results">
            { queryProjects.map(item => <li key={item.id} className="search__item">
              <Link className="search__link" to={setURL('projects', item.id)} onClick={() => handleValue('')}/>
              <p className="search__title">{item.title}</p>
              <p className="search__goal">
                {formatSum(item.funding_sum)} из {formatSum(item.funding_goal)} собрано
              </p>
            </li>) }
          </ul>
        </div> }
      </div>
      { redirectToResults && <Redirect to={setURL('projects')} /> }
    </section>
  )
}

export default HeaderSearch