import React, { useEffect, useRef, useState } from 'react'
import FormText from '../../includes/Form/FormText'
import Button from '../../includes/Button'
import { AddNewsComment, AddProjectComment, UpdateProjectNews } from '../../redux/Projects/reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AddBlogComment } from '../../redux/Blog/reducer'
import { setClasses, setURL } from '../../config/functions'


function CommentsForm({ module, post, replyId, project, setReplyId, treeId, setTreeId }) {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const profile = useSelector(state => state.profile.data)
  const [text, setText] = useState('')
  const fieldRef = useRef(null)

  const clearData = () => {
    setText('')
    setReplyId(null)
  }

  useEffect(() => {
    if(replyId !== null) {
      const repliedComment = post.comments.filter(
        comment => Number(comment.id) === replyId
      )[0]
      const repliedAuthor = users.filter(
        item => Number(item.id) === Number(repliedComment['author_id']))[0]    
      setText(`@${repliedAuthor.login}, `)
      //fieldRef.current.focus()  
      setTreeId(repliedComment['tree_id'] !== null ? repliedComment['tree_id'] : repliedComment.id)
    }
  }, [replyId])

  console.log('tree', treeId)

  const addComment = e => {
    e.preventDefault()

    /*/switch(module) {
      case 'news':
        dispatch(AddNewsComment(post, text, profile.id, replyId, treeId, clearData, project))
      case 'blog':
        dispatch(AddBlogComment(post, text, profile.id, replyId, treeId, clearData))
      case 'projects':
        dispatch(AddProjectComment(post, text, profile.id, replyId, treeId, clearData))
    }*/

    
  }

  return (
    <form className={setClasses("form", 'comments')} onSubmit={e => addComment(e)}>
      <FormText ref={fieldRef} value={text} setValue={setText} placeholder={'Комментарий'} />
      <Button type="submit" disabled={text.length === 0 ? true : false}>Написать</Button>
    </form>
  )
}

export default CommentsForm