import React from 'react'

function PostTitle(props) {
  return (
    <h3 className="post__title">{ props.title } { props.children }</h3>
  )
}

export default PostTitle