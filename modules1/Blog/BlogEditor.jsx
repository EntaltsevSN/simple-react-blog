import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { setURL } from '../../config/functions'
import { settings } from '../../config/settings'
import Button from '../../includes/Button'
import Form from '../../includes/Form/Form'
import FormCheckbox from '../../includes/Form/FormCheckbox'
import FormEditor from '../../includes/Form/FormEditor'
import FormImage from '../../includes/Form/FormImage1'
import FormInput from '../../includes/Form/FormInput'
import FormText from '../../includes/Form/FormText'
import Post from '../../includes/Post/Post'
import PostTitle from '../../includes/Post/PostTitle'
import { UpdateBlog } from '../../redux/Blog/reducer'

function BlogEditor({ post }) {
  const dispatch = useDispatch()
  const blog = useSelector(state => state.blog)
  //const [imageFile, setImageFile] = useState(null)
  const [image, setImage] = useState( post.image )
  const [title, setTitle] = useState( post.title )
  const [description, setDescription] = useState( post.description )
  const [content, setContent] = useState( post.content )
  const [hotBlog, setHotBlog] = useState( post.hotBlog )
  const [published, setPublished] = useState( post.published )
  const [redirect, setRedirect] = useState( false )

  console.log(post)

  const updateElement = id => {
    dispatch(UpdateBlog({...blog.filter(item => Number(item.id) === Number(id))[0], title, image, description, content, hotBlog, published}, null, setRedirect(true)))
  }

  return (
    <Post>
      <PostTitle title="Редактирование поста" />
      <Form>
        <FormImage 
          id={ post.id }
          image={ image }
          setImage={ setImage }
        />
        <FormInput value={title} setValue={setTitle} placeholder='Название' id="blog.title" />
        <FormText value={description} setValue={setDescription} placeholder='Краткое описание' id="blog.description" />
        <FormEditor value={content} setValue={setContent} placeholder='Подробное описание' id="blog.content" hideCollapse />
        <FormCheckbox value={hotBlog} setValue={setHotBlog} placeholder="Показать на главной странице" id="blog.hot_blog" />
        <FormCheckbox value={published} setValue={setPublished} placeholder="Опубликовать запись" id="blog.published" />
        <Button onClick={() => updateElement(post.id)}>Изменить</Button>
      </Form>
      { redirect && <Redirect to={setURL('blog', post.id)} /> }
    </Post>
  )
}

export default BlogEditor