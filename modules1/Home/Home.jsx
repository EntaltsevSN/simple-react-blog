import React from 'react'
import HomeInfographics from './HomeInfographics'
import HomeSlider from './HomeSlider'
import HomeSubscribe from './HomeSubscribe'
import Container from '../../includes/Container'
import ProjectsList from '../Projects/ProjectsList'

function Home(props) {
  return (
    <>
      <HomeSlider/>
      <Container>
      </Container>
      <HomeInfographics/>
      <HomeSubscribe/>
    </>
  )
}

export default Home