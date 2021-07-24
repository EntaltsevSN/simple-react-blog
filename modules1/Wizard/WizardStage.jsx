import React, { useEffect, useState } from 'react'
import Countdown from 'react-countdown'
import { useDispatch, useSelector } from 'react-redux'
import { getLastInt, setClasses } from '../../config/functions'
import { projectStages } from '../../config/projectStages'
import Button from '../../includes/Button'
import ButtonLoader from '../../includes/ButtonLoader'
import { AddRequest, CancelRequest } from '../../redux/Management/reducer'
import { UpdateProjectStatus } from '../../redux/Projects/reducer'

function Timer({ date }) {
  return (
    <Countdown
      date={date}
      renderer={({ days, hours, minutes, seconds, completed }) => 
        <span className="wizard__timer">
          { days > 0 ? 
            <>{days} {getLastInt(days) === 1 ? 'день' : [2, 3, 4].includes(getLastInt(days)) ? 'дня' : 'дней'}</>
          : hours > 0 ? 
            <>{hours} {getLastInt(hours) === 1 ? 'час' : [2, 3, 4].includes(getLastInt(hours)) ? 'часа' : 'часов'}</>
          : minutes > 0 ? 
            <>{minutes} {getLastInt(minutes) === 1 ? 'минута' : [2, 3, 4].includes(getLastInt(minutes)) ? 'минуты' : 'минут' }</>
          : seconds > 0 ? 
            <>{seconds} {getLastInt(seconds) === 1 ? 'секунда' : [2, 3, 4].includes(getLastInt(seconds)) ? 'секунды' : 'секунд'}</>
          : <></>
          }
        </span>
      }
    />
  )
}

function WizardStage({ project, setStatus }) {
  const requests = useSelector(state => state.management)
  const dispatch = useDispatch()
  const currentStage = projectStages.filter(({ status }) => status === project.status)[0]
  const requirements = !currentStage.hasOwnProperty('requirements') ? undefined : currentStage.requirements.map(
    ({ option }) => 
      typeof option === 'string'
        ? String(project[option]).length > 0 ? true : false
        : false
  )
  const stageStatus = requirements === undefined ? 'single' : requirements.filter(item => item === false).length === 0 ? 'success' : 'failure'
  const message = stageStatus === 'single' 
    ? currentStage.messages[0] 
    : currentStage.messages.filter(({ status }) => status === stageStatus)[0]

  const [isDisabled, setIsDisabled] = useState(false)

  const getProjectRequests = id => requests.filter(item => Number(item.data_id) === Number(id))
  const getLastRequest = id => getProjectRequests(id).filter(item =>
    item.id === Math.max(...getProjectRequests(id).map(item => item.id)) 
  )[0]

  console.log(requests)

  useEffect(() => {
    if(project.status === 'SCD' && (+new Date() >= project['date_start'])) {
      dispatch(UpdateProjectStatus(
        project, currentStage.nesting[0], setIsDisabled
      ))
    }
    if(project.status === 'FND' && (+new Date() >= project['date_finish'])) {
      dispatch(UpdateProjectStatus(
        project, currentStage.nesting[project['funding_sum'] < project['funding_goal'] ? 0 : 1], setIsDisabled
      ))
    }
    if(project.status === 'CHN' && (+new Date() >= project['date_second_chance'])) {
      dispatch(UpdateProjectStatus(
        project, currentStage.nesting[project['funding_sum'] < project['funding_goal'] ? 0 : 1], setIsDisabled
      ))
    }
  }, [])

  return (
    <>{ currentStage.messages !== undefined 
      ? <><section className={setClasses(
          "wizard__stage", 
          stageStatus === 'single' ? message.status : stageStatus
        )}>
        <p className="wizard__alert">
          { currentStage.status  === 'SCD' 
            ? message.text.split(' ').map(t => t === '[TIME]' ? <Timer date={project.date_start} /> : t)
              .reduce((prev, curr) => [prev, ' ', curr])
            : currentStage.status  === 'FND' 
              ? message.text.split(' ').map(t => t === '[TIME]' ? <Timer date={project.date_finish} /> : t)
              .reduce((prev, curr) => [prev, ' ', curr])
            : currentStage.status  === 'CHN' 
              ? message.text.split(' ').map(t => t === '[TIME]' ? <Timer date={project.date_second_chance} /> : t)
              .reduce((prev, curr) => [prev, ' ', curr])
            : message.text 
          }
        </p>
        { message.button !== null && <Button className="wizard__button" onClick={
          () => {
            setIsDisabled(true)
            dispatch(UpdateProjectStatus(
              project, currentStage.nesting[0], setIsDisabled
            ))
            console.log(currentStage.status)
            if(['NEW', 'APG'].includes(currentStage.status)) {
              dispatch(
                currentStage.status === 'NEW' 
                  ? AddRequest(requests, 'project', project.id)
                  : CancelRequest(requests, 'project', project.id)
              )
            }
          }
        } disabled={isDisabled}>
          { isDisabled ? <ButtonLoader/> : message.button }
        </Button> }
      </section>
      { ['APD', 'RJD'].includes(currentStage.status) && <div className="wizard__comment">
        <h4 className="wizard__title">Комментарий от менеджера</h4>
        { getLastRequest(project.id).comment !== '' && <div dangerouslySetInnerHTML={{__html: getLastRequest(project.id).comment}}></div> }
      </div> }
      </>
      : <></>
    }</>
  )
}

export default WizardStage