import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch, useLocation, useParams } from 'react-router'
import { setURL } from '../../config/functions'
import BlogEditor from './BlogEditor'
import BlogPost from './BlogPost'

function BlogPage(props) {
  const id = useParams().id
  const post = useSelector(state => state.blog.filter(item => Number(item.id) === Number(id))[0])
  const module = useLocation().pathname.split('/')[1]

  return (
    <Switch>
      <Route exact path={setURL('blog', id)}>
        <BlogPost post={post} module={module} />
      </Route>
      <Route exact path={setURL('blog', id, 'edit')}>
        <BlogEditor post={post} />
      </Route>
    </Switch>
  )
}

export default BlogPage