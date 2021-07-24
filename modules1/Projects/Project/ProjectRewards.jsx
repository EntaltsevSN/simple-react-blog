import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setClasses } from '../../../config/functions'
import { getNewProjectCart } from '../../../config/getters'
import { updateUser } from '../../../redux/Users/actions'
import { UpdateUserCart } from '../../../redux/Users/reducer'
import RewardCard from '../Cards/RewardCard'

function ProjectRewards({ project }) {
  const profile = useSelector(state => state.profile.data)
  const projectCart = profile.cart.filter(item => Number(item.project_id) === Number(project.id))[0]
  console.log(projectCart)
  const dispatch = useDispatch()
  const [cart, setCart] = useState(
    projectCart !== undefined 
      ? projectCart 
      : null
  )

  const main = project.rewards.filter(({ addon }) => !addon)
  const addons = project.rewards.filter(({ addon }) => addon)

  useEffect(() => {
    if(cart === null) {
      dispatch(UpdateUserCart(profile, getNewProjectCart(profile.cart, project, [])))
      setCart(getNewProjectCart(profile.cart, project, []))
    }
  }, [])

  return (
    <section className="project__rewards">
      { main.length > 0 && <>
        <h3 className={setClasses("project__title", 'no-margin')}>Основные</h3>
        { cart !== null && main.map(item => <RewardCard key={item.id} reward={item} project={project} cart={cart} setCart={setCart} />) } 
      </> }
      { addons.length > 0 && <>
        <h3 className={setClasses("project__title", 'no-margin')}>Дополнительные</h3>
        { cart !== null && addons.map(item => <RewardCard key={item.id} reward={item} project={project} cart={cart} setCart={setCart} />) } 
      </> }
    </section>
  )
}

export default ProjectRewards