import React from 'react'

function PostDate({ date }) {
  return (
    <p className="post__date">{ new Date(date).toLocaleTimeString() }</p>
  )
}

export default PostDate