import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useLocation, useRouteMatch } from 'react-router'
import { setURL } from '../../config/functions'
import WizardBasic from './WizardOptions/WizardBasic'
import WizardFAQ from './WizardOptions/WizardFAQ'
import WizardFiles from './WizardOptions/WizardFiles'
import WizardGoals from './WizardOptions/WizardGoals'
import WizardLinks from './WizardOptions/WizardLinks'
import WizardMedia from './WizardOptions/WizardMedia'
import WizardNews from './WizardOptions/WizardNews'
import WizardRewards from './WizardOptions/WizardRewards'
import { UpdateProject } from '../../redux/Projects/reducer'

function WizardOptions({ id, getCards }) {
  const dispatch = useDispatch()
  const project = useSelector(state => state.projects.filter(item => Number(item.id) === Number(id))[0])
  const url = useRouteMatch().url.substring(1).split('/')
  url.pop()

  const [data, setData] = useState({...project})
  const [imageFile, setImageFile] = useState(null)
  const [isSavedChanges, setIsSavedChanges] = useState(false)

  useEffect(() => setIsSavedChanges(false), [])

  const handleSaveChanges = (section) => {
    dispatch(UpdateProject(data, { image: imageFile }, getCards(project).filter(item => item.slug === section)[0].title, setIsSavedChanges))
  }

  const options = {
    project, data, setData, getCards, handleSaveChanges, isSavedChanges, setIsSavedChanges, imageFile, setImageFile
  }

  return (
    <section className="wizard__options">
      <form action="" className="form">
        <Switch>
          <Route path={setURL(...url, 'basic')}>
            <WizardBasic {...options} />
          </Route>
          <Route path={setURL(...url, 'media')}>
            <WizardMedia {...options} />
          </Route>
          <Route path={setURL(...url, 'goals')}>
            <WizardGoals {...options} />
          </Route>
          <Route path={setURL(...url, 'rewards')}>
            <WizardRewards {...options} />
          </Route>
          <Route path={setURL(...url, 'news')}>
            <WizardNews {...options} />
          </Route>
          <Route path={setURL(...url, 'files')}>
            <WizardFiles {...options} />
          </Route>
          <Route path={setURL(...url, 'links')}>
            <WizardLinks {...options} />
          </Route>
          <Route path={setURL(...url, 'faq')}>
            <WizardFAQ {...options} />
          </Route>
        </Switch>
      </form>
    </section>
  )
}

export default WizardOptions