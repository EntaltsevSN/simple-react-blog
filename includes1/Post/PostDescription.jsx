import React from 'react'

function PostDescription({ description }) {
  return (
    description.length > 0 && <p className="post__description">{ description }</p>
  )
}

export default PostDescription