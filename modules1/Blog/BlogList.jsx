import React from 'react'
import { useSelector } from 'react-redux'
import BlogCard from './BlogCard'

function BlogList(props) {
  const blog = useSelector(state => state.blog.filter(item => Number(item.id) !== 0))
  console.log(blog)
  const profile = useSelector(state => state.profile.data)

  return (
    <div className="row">
      <>{ blog.length > 0
      ? blog.map(item => 
        <div key={item.id} className="column column--sm-6 column--md-4">
          <BlogCard post={item} />
        </div>
      )
      : <p>Постов в блоге пока нет</p> 
    }</>
    </div>
  )
}

export default BlogList