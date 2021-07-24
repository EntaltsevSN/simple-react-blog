import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router'
import { setURL } from '../../config/functions'
import WizardIntro from './WizardIntro'
import WizardOverview from './WizardOverview'
import WizardSidebar from './WizardSidebar'
import WizardStats from './WizardStats'

function Wizard(props) {
  const profile = useSelector(state => state.profile.data)
  const projects = useSelector(state => state.projects.filter(item => Number(item.creator_id) === Number(profile.id)))
  const [createdProject, setCreatedProject] = useState(null)

  console.log(createdProject)
    
  return (
    <div className="wizard">
      { !projects.length
        ? <WizardIntro setCreatedProject={setCreatedProject} />
        : <>
          <WizardSidebar projects={projects} setCreatedProject={setCreatedProject} />
          <div className="wizard__content">
            <Switch>
              <Route path={setURL('wizard', ':id')}>
                <WizardOverview/>
              </Route>
              <Route exact path={setURL('wizard')}>
                <WizardStats />
              </Route>
            </Switch>
          </div>
        </>
      }
      { createdProject !== null && <Redirect to={setURL('wizard', createdProject)} /> } 
    </div>
  )
}

export default Wizard