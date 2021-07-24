import React from 'react'

function PostContent({ content }) {
  return (
    content.length > 0 && <div className="post__content" dangerouslySetInnerHTML={{ __html: content }} />
  )
}

export default PostContent