import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { url } from '../../config/functions'
import SectionsList from '../Sections/SectionsList'

export default props => {
  const sections = useSelector(state => state.sections)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if(sections !== null) {
      setIsLoading(false)
    }
  }, [sections])

  return (
    <>
      <h2 className="home__title">Разделы</h2>
      <SectionsList />
    </>
  )
}