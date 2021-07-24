import React from 'react'
import Post from '../../includes/Post/Post'
import PostContent from '../../includes/Post/PostContent'
import PostDate from '../../includes/Post/PostDate'
import PostDescription from '../../includes/Post/PostDescription'
import PostId from '../../includes/Post/PostId'
import PostMeta from '../../includes/Post/PostMeta'
import PostPoster from '../../includes/Post/PostPoster'
import PostSettings from '../../includes/Post/PostSettings'
import PostTitle from '../../includes/Post/PostTitle'
import Comments from '../Comments/Comments'

function BlogPost({ post, module }) {
  return (
    <Post>
      <PostTitle title={ post.title }>
        <PostSettings id={ post.id } />
      </PostTitle>
      <PostMeta>
        <PostDate date={ post.date_created } />
        <PostId id={ post.id } />
      </PostMeta>
      <PostPoster poster={ post.image } />
      <PostDescription description={ post.description } />
      <PostContent content={ post.content } />    
      <Comments post={post.comments_thread} />
    </Post>
  )
}

export default BlogPost