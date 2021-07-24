import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { compare } from '../../config/functions'
import Comment from './Comment'
import CommentsForm from './CommentsForm'

function Comments({ post }) {
  const comments = useSelector(state => state.comments)
  const users = useSelector(state => state.users)
  const profile = useSelector(state => state.profile.data)


  console.log('comments', comments)


  const formRef = useRef(null)
  const scrollToForm = () => formRef.current.scrollIntoView()
  
  return (
    <section className="comments">
      {/*/<CommentsForm ref={formRef}/>*/}

      {

      }

      { /*post.comments.length > 0 
        ? post.comments.sort(compare).reverse().filter(item => item['tree_id'] === null).map(comment => 
          <Comment key={comment.id} comment={comment} setReplyId={setReplyId} comments={post.comments} treeId={treeId} setTreeId={setTreeId} />  
        )
        : <p>Комментариев пока нет</p>*/ }
    </section>


    /*<section className="comments">
      { post.comments.length > 0 
        ? post.comments.map(item => <Comment key={item.id} users={users} comment={item} />)
        : <p>Комментариев пока нет</p>
      }
      { profile !== null && <CommentsForm post={post} project={project} callBack={callBack} /> }
    </section>*/
  )
}

export default Comments