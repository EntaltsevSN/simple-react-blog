import React from 'react'
import { useParams } from 'react-router'

function NewsPost(props) {
  const id = useParams().id

  return (
    <>NewsPost {id}</>
  )
}

export default NewsPost