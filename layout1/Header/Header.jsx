import React, { useEffect, useRef, useState } from 'react'
import Container from '../../includes/Container'
import HeaderLogo from './HeaderLogo'
import HeaderMenu from './HeaderMenu'
import HeaderNav from './HeaderNav'
import HeaderSearch from './HeaderSearch'

function Header(props) {
  const hRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    setHeight(hRef.current.offsetHeight)
  }, [hRef]);

  return (
    <>
      <header className="header" ref={hRef}>
        <Container className="header__wrapper">
          <HeaderLogo/>
          <HeaderNav/>
          <HeaderSearch/>
          <HeaderMenu/>
        </Container>
      </header>
      <section className="header-wrapper" style={{ width: `100%`, paddingTop: `${height}px`, marginBottom: `32px` }} />
    </>
  )
}

export default Header