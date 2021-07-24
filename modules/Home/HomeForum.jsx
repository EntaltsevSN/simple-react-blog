import React from 'react'
import ForumList from '../Forum/ForumList'

export default props => (
  <>
    <h2 className="home__title">Последние обсуждения</h2>
    <ForumList showControls={false} />
  </>
)