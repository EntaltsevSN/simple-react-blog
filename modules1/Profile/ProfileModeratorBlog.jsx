import React from 'react'
import { useSelector } from 'react-redux'

function ProfileModeratorBlog(props) {
  const blog = useSelector(state => state.blog.filter(item => Number(item.id) !== 0))

  return (
    <div className="row">
      <>{ blog.length > 0
        ? blog.map(item => 
          <div key={item.id} className="column column--sm-6 column--md-4">
            <BlogCard post={item} />
          </div>
        )
        : <div className="column">Постов в блоге пока нет</div> 
      }</>
    </div>
  )
}

export default ProfileModeratorBlog