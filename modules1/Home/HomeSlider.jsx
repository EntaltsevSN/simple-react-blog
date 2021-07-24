import React from 'react'
import ProjectsSlide from '../Projects/ProjectsSlide'
import Slider from 'react-slick'
import { getActualProjects } from '../../config/functions'
import { useSelector } from 'react-redux'
import { projectStages } from '../../config/projectStages'

function HomeSlider(props) {
  const projects = useSelector(state => state.projects)
  const profile = useSelector(state => state.profile.data)

  const settings = {
    dots: true,
    infinite: true,
    auto: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  }

  return (
    <>{ getActualProjects(projects, profile, projectStages).length > 0 && <Slider {...settings} className="content__slider">
      { getActualProjects(projects, profile, projectStages).map(item => 
        <ProjectsSlide key={item.id} project={item} />) 
      }
    </Slider> }</>
  )
}

export default HomeSlider