import React from 'react'

function Post(props) {
  return (
    <article className="post">{ props.children }</article>
  )
}

export default Post