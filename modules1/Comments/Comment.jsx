import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setURL } from '../../config/functions'
import { settings } from '../../config/settings'
import Button from '../../includes/Button'

function Comment({ comment, setReplyId, comments, treeId, setTreeId }) {
  const users = useSelector(state => state.users)
  const author = users.filter(item => Number(item.id) === Number(comment.author_id))[0]
  const nested = comments.filter(item => Number(item['tree_id']) === Number(comment.id))

  console.log(nested)

  const toggleReply = id => {
    //scrollToForm()
    setReplyId(id)
  }
  
  return (
    <article className="comments__item">
      <section className="comments__data">
        <Link to={setURL('users', users.author_id)}>
          <img className="comments__avatar" src={author.avatar !== null ? author.avatar : settings.profile.defaultAvatar} />
        </Link>
        <div className="comments__content">
          <h4 className="comments__title">{ author.login }</h4>
          <section className="comments__body" dangerouslySetInnerHTML={{ __html: comment.text }}></section>
          <section className="comments__meta">
            <article className="comments__option">{ new Date(comment.date_created).toLocaleTimeString() }</article>
            <article className="comments__option">
              { <Button className="button--link comments__reply" onClick={() => toggleReply(comment.id)}>Ответить</Button> }
            </article>
          </section>
        </div>
      </section>
      { nested.length > 0 && 
        <section className="comments__tree">
          { nested.map(item => 
            <Comment comment={item} setReplyId={setReplyId} comments={comments} />
          ) }
      </section> }
    </article>
  )
}

export default Comment