import React from 'react'
import { Link } from 'react-router-dom'
import { setURL } from '../../config/functions'
import { settings } from '../../config/settings'
import Card from '../../includes/Card/Card'
import CardContent from '../../includes/Card/CardContent'
import CardDescription from '../../includes/Card/CardDescription'
import CardMeta from '../../includes/Card/CardMeta'
import CardPoster from '../../includes/Card/CardPoster'
import CardTitle from '../../includes/Card/CardTitle'

function BlogCard({ post }) {
  console.log(post)

  return (
    <Card>
      <Link className="card__link" to={setURL('blog', post.id)}/>
      <CardPoster poster={post.image} />
      <CardContent>
        <CardMeta type="date" meta={post.date_created} />
        <CardTitle title={post.title} />
        <CardDescription description={ post.description } />
      </CardContent>
    </Card>
  )
}

export default BlogCard