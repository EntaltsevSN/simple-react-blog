import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import AddThread from './includes/AddThread'
import Body from './layout/Body'
import Footer from './layout/Footer'
import Header from './layout/Header'
import Layout from './layout/Layout'
import { GetDocuments } from './redux/Documents/reducer'
import { GetMessages } from './redux/Messages/reducer'
import { GetSections } from './redux/Sections/reducer'
import { GetSubsections } from './redux/Subsections/reducer'
import { GetThreads } from './redux/Threads/reducer'

function App(props) {
  const dispatch = useDispatch()
  const modal = useSelector(state => state.modal)

  console.log(modal)

  useEffect(() => {
    const callBack = () => {
      dispatch(GetSections())
      dispatch(GetSubsections())
      dispatch(GetDocuments())
      dispatch(GetThreads())
      dispatch(GetMessages())
    }
    callBack()
  }, [])

  return (
    <Router>
      {/*<div className={loading ? setClasses('layout', 'loader') : 'layout'}>
        { loading ? <Loader/> : <>
          <Header/>
          <Body/>
          <Footer/>
        </> } 
        </div>*/ }
      { /*isModalOpened && <LoginForm allowOverlay={isShouldBeLoggedIn ? false : true} />*/ }
      <Layout>
        <Header />
        <Body />
        <Footer />
      </Layout>
      { modal.isOpened 
        ? modal.type === 'add thread'
          ? <AddThread />
          : <></>
        : <></>
      }
    </Router>
  )
}

export default App