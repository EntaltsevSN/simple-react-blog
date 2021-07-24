import React from 'react'
import Container from '../../includes/Container'
import HomeForum from './HomeForum'
import HomeSections from './HomeSections'
import HomeWelcome from './HomeWelcome'

export default props => (
  <section className="home">
    <Container>
      <HomeWelcome />
      <HomeSections />
      <HomeForum />
    </Container>
  </section>
)