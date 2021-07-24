import React, { useEffect, useState } from 'react'
import Countdown from 'react-countdown'
import { useDispatch, useSelector } from 'react-redux'
import { getLastInt, setClasses } from '../../config/functions'
import { projectStages } from '../../config/projectStages'
import { rewardStages } from '../../config/rewardStages'
import Button from '../../includes/Button'
import ButtonLoader from '../../includes/ButtonLoader'
import { AddRequest, CancelRequest } from '../../redux/Management/reducer'
import { UpdateProjectStatus, UpdateRewardStatus } from '../../redux/Projects/reducer'

function WizardRewardStage({ project, reward }) {
  const requests = useSelector(state => state.management)
  const dispatch = useDispatch()
  const currentStage = rewardStages.filter(({ status }) => status === reward.status)[0]
  console.log('current', currentStage)
  const message = currentStage.messages[0]

  const [isDisabled, setIsDisabled] = useState(false)

  const getRewardRequests = (projectId, rewardId) => requests.filter(item => typeof item.data_id === 'object').filter(item => Number(item.data_id.project) === Number(projectId) && Number(item.data_id.reward) === Number(rewardId))
  const getLastRequest = (projectId, rewardId) => getRewardRequests(projectId, rewardId).filter(item =>
    item.id === Math.max(...getRewardRequests(projectId, rewardId).map(item => item.id)) 
  )[0]

  console.log(reward.title, getLastRequest(project.id, reward.id))

  return (
    <>{ currentStage.messages !== undefined 
      ? <><section className={setClasses(
          "wizard__stage", 
          'inner',
          message.status
        )}>
        <p className="wizard__alert">{ message.text }</p>
        { message.button !== null && <Button className="wizard__button" onClick={
          () => {
            setIsDisabled(true)
            dispatch(UpdateRewardStatus(
              project, reward.id, currentStage.nesting[0], setIsDisabled
            ))
            if(['NEW', 'APG'].includes(currentStage.status)) {
              dispatch(
                currentStage.status === 'NEW' 
                  ? AddRequest(requests, 'reward', { project: project.id, reward: reward.id })
                  : CancelRequest(requests, 'reward', { project: project.id, reward: reward.id })
              )
            }
          }
        } disabled={isDisabled}>
          { isDisabled ? <ButtonLoader/> : message.button }
        </Button> }
      </section>
      { (['APD', 'RJD'].includes(currentStage.status) && getLastRequest(project.id, reward.id).comment !== '') && <div className="wizard__comment">
        <h4 className="wizard__title">Комментарий от менеджера</h4>
        {  <div dangerouslySetInnerHTML={{__html: getLastRequest(project.id, reward.id).comment}}></div> }
      </div> }
      </> : <></>
    }</>
  )
}

export default WizardRewardStage