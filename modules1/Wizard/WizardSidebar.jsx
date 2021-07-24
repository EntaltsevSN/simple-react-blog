import React from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { setClasses, setURL } from '../../config/functions'
import { projectStages } from '../../config/projectStages'
import { VscArrowLeft } from 'react-icons/vsc'
import WizardAddProjectForm from './WizardAddProjectForm'
import { useSelector } from 'react-redux'
 
function WizardSidebar({ projects, setCreatedProject }) {
  const url = useLocation().pathname
  const profile = useSelector(state => state.profile.data)

  return (
    <aside className="wizard__sidebar">
      { url !== '/wizard' && <Link to={setURL('wizard')} className="wizard__back">
        <VscArrowLeft />
        <span>На главную</span>
      </Link> }
      <ul className="wizard__list">
        { projects.map(item => <li key={item.id} className="wizard__item">
          <section className={setClasses(
            "wizard__block", item.status.toLowerCase(), url.includes(item.id) ? 'active' : false
          )}>
            <Link to={setURL('wizard', item.id)} className="wizard__redirect"></Link>
            <h4 className="wizard__title wizard__title--small">{ item.title }</h4>
            <div className="wizard__status">
              <span>{ projectStages.filter(stage => stage.status === item.status)[0].name }</span>
              <></>
            </div>
          </section>
        </li>) }
      </ul>
      <div className="wizard__back">
        <WizardAddProjectForm 
          setCreatedProject={setCreatedProject} 
          profile={profile}
        />
      </div>
    </aside>
  )
}

export default WizardSidebar