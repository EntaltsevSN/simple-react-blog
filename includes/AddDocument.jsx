import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { closeModal } from '../redux/Modal/actions'
import { AddSubsection } from '../redux/Subsections/reducer'
import Button from './Button'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AddDocument } from '../redux/Documents/reducer'

export default ({ documents, subsectionId, setIsEditor }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)  
  const [isDocumentAdded, setIsDocumentAdded] = useState(false)

  console.log(text)

  const nextId = Math.max(...documents.map(({ id }) => id)) + 1

  console.log(nextId)

  useEffect(() => {
    setIsDisabled(title !== '' ? false : true)
  }, [title])

  useEffect(() => {
    if(isDocumentAdded) {
      dispatch(closeModal())
    }
  }, [isDocumentAdded])

  const handleSubmit = () => {
    dispatch(AddDocument(Number(nextId), subsectionId, title, text, setIsEditor))
    setIsDisabled(true)
  }

  return (
    <section className="admin__editor">
      <h2 className="admin__title">Добавить документ</h2>
      <form className="form">
        <section className="form__section">
          <input className="form__input" placeholder="Заголовок документа" type="text" value={title} onChange={e => setTitle(e.target.value)}/>
        </section>
        <section className="form__section">
          <CKEditor
            editor={ ClassicEditor }
            data={text}
            onReady={ editor => console.log( 'Editor is ready to use!', editor ) }
            onChange={( event, editor ) => setText(editor.getData())}
          />
        </section>
      </form>
      <Button disabled={isDisabled} onClick={() => handleSubmit()}>Добавить</Button>
    </section>
  )
}