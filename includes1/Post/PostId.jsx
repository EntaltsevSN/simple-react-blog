import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

function PostId({ id }) {
  const [isCopied, setIsCopied] = useState(false)

  return (
    <p className="post__id">
      { isCopied && <span className="post__copied">Ссылка скопирована в буфер обмена</span> }
      <CopyToClipboard text={ document.location.href }
        onCopy={() => {
          setIsCopied(false)
          setIsCopied(true)
          setTimeout(() => setIsCopied(false), 1000)
        }}>
        <span title="Кликните, чтобы скопировать ссылку на эту страницу" className="post__copier">#{ id }</span>
      </CopyToClipboard>      
    </p>
  )
}

export default PostId