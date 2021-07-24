import React from 'react'
import { Route, Switch, useParams, useRouteMatch } from 'react-router'
import { setURL } from '../../config/functions'
import WizardOptions from './WizardOptions'
import WizardProject from './WizardProject'
import { VscInfo, VscPreview, VscRepoForked, VscRuby, VscFiles, VscLink, VscNote, VscQuestion } from 'react-icons/vsc'
import { useSelector } from 'react-redux'
import NoAccess from '../../includes/NoAccess'

function WizardOverview(props) {
  const url = useRouteMatch().url.substring(1)
  const id = useParams().id
  const project = useSelector(state => state.projects.filter(item => Number(item.id) === Number(id))[0])
  const profile = useSelector(state => state.profile.data)

  const getCards = project => ([
    { 
      id: 1,
      slug: 'basic',
      title: 'Основное',
      icon: <VscInfo className="wizard__icon" />,
      data: [ project.title, project.category, project.description, project.content, project.funding_goal, project.date_start, project.date_finish, project.no_funding_goal ],
      disabled: ['SCS', 'PRD', 'PBL']
     },
    { 
      id: 2,
      slug: 'media',
      title: 'Медиа',
      icon: <VscPreview className="wizard__icon" />,
      data: [ project.image, project.video ],
      disabled: ['SCS', 'PRD', 'PBL']
     },
    { 
      id: 3,
      slug: 'goals',
      title: 'Сверхцели',
      icon: <VscRepoForked className="wizard__icon" />,
      data: project.goals,
      disabled: ['SCS', 'PRD', 'PBL']
     },
    { 
      id: 4,
      slug: 'rewards',
      title: 'Награды',
      icon: <VscRuby className="wizard__icon" />,
      data: project.rewards,
      disabled: ['SCS', 'PRD', 'PBL']
    },
    { 
      id: 5,
      slug: 'files',
      title: 'Файлы',
      icon: <VscFiles className="wizard__icon" />,
      data: project.files
    },
    { 
      id: 6,
      slug: 'links',
      title: 'Ссылки',
      icon: <VscLink className="wizard__icon" />,
      data: project.links
    },
    { 
      id: 7,
      slug: 'news',
      title: 'Новости',
      icon: <VscNote className="wizard__icon" />,
      data: project.news
    },
    { 
      id: 8,
      slug: 'faq',
      title: 'Вопросы и ответы',
      icon: <VscQuestion className="wizard__icon" />,
      data: project.faq
    },
  ])
  
  return (
    <> { profile.role === 'admin' || 
      (profile.role === 'creator' && project['creator_id'] === profile.id )
    ? 
    <Switch>
      <Route exact path={setURL(url)}>
        <WizardProject id={id} getCards={getCards} />
      </Route>
      <Route path={setURL(url, ':section')}>
        <WizardOptions id={id} getCards={getCards} />
      </Route>
    </Switch>
    : <NoAccess /> } </>
  )
}

export default WizardOverview