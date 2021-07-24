import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { classes } from '../../config/functions'
import AddDocument from '../../includes/AddDocument'
import AddSubsection from '../../includes/AddSubsection'
import Button from '../../includes/Button'
import Container from '../../includes/Container'
import { OpenModal } from '../../redux/Modal/reducer'

export default props => {
  const dispatch = useDispatch()
  const sections = useSelector(state => state.sections)
  const subsections = useSelector(state => state.subsections)
  const documents = useSelector(state => state.documents)
  const modal = useSelector(state => state.modal)
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState(0)
  const [activeSubsection, setActiveSubsection] = useState(0)
  const [activeDocument, setActiveDocument] = useState(0)
  const [isEditor, setIsEditor] = useState(false)

  useEffect(() => {
    setIsLoading(sections !== null && subsections !== null && documents !== null ? false : true)
  }, [sections, subsections, documents])

  const handleAddSubsection = id => {
    setActiveSection(id)
    dispatch(OpenModal('add subsection'))
  }

  const handleAddDocument = id => {
    setActiveSubsection(id)
    setIsEditor(true)
  }

  return (
    <Container type="admin">
      { isLoading
        ? <p>Данные загружаются</p>  
        : isEditor
        ? <AddDocument 
            documents={documents} 
            subsectionId={activeSubsection} 
            isEditor={isEditor}
            setIsEditor={setIsEditor}
          /> 
        : <section className="admin__sections">
        { sections.sort((a, b) => a.id - b.id).map(({ id: sectionId, title, description }) => 
          <section key={sectionId} className="admin__section">
            <section className={classes("admin__data", 'section')} onClick={() => setActiveSection(sectionId)}>
              <h2 className="admin__title" onClick={() => setActiveSection(sectionId)}>
                { title } 
                <Button onClick={() => handleAddSubsection(sectionId)}>Добавить подкатегорию</Button>
              </h2>
              <p className="admin__description">{ description }</p>
            </section>
            { activeSection === sectionId && <section className="admin__subsections">
              {subsections.filter(({ section_id }) => section_id === sectionId).length > 0 ? subsections.filter(({ section_id }) => section_id === sectionId).sort((a, b) => a.id - b.id).map(({ id: subsectionId, title }) => 
              <section key={subsectionId} className="admin__subsection">
                <section className={classes("admin__data", 'subsection')} onClick={() => setActiveSubsection(subsectionId)}>
                  <h3 className="admin__title">
                    { title }
                    <Button onClick={() => handleAddDocument(subsectionId)}>Добавить документ</Button>
                  </h3>
                </section>
                { activeSubsection === subsectionId && <section className="admin__documents">
                  { documents.filter(({ subsection_id }) => subsection_id === subsectionId).length > 0 ? documents.filter(({ subsection_id }) => subsection_id === subsectionId).sort((a, b) => a.id - b.id).map(({ id: documentId, title, text }) => 
                  <section key={documentId} className="admin__document">
                    <section className="admin__data" onClick={() => setActiveDocument(documentId)}>
                      <h4 className="admin__title">{ title }</h4>
                    </section>
                    { activeDocument === documentId && 
                      <section className="admin__text" dangerouslySetInnerHTML={{ __html: text }} />
                    }
                  </section>) : <p>Документов в этой подкатегории пока нет</p> } 
                </section> }
              </section>) : <p>Подкатегорий в этой категории пока нет</p> }
            </section> }
          </section>) }
          { modal.isOpened && modal.type === 'add subsection' && 
            <AddSubsection 
              subsections={subsections} 
              sectionId={activeSection} 
            /> 
          }
        </section>
      }
    </Container>
  )
}