import React, { useState, useEffect, useRef } from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function Dropdown(props) {
  const dispatch = useDispatch()
  const wrapperRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const dropDownlabel = props.icon !== undefined ? props.icon : props.text
  
  const toggleDropdown = () => setIsOpen(!isOpen)
  const hideDrodDown = () => setIsOpen(false)
  const showDropDown = () => setIsOpen(true)

  const buttonClasses = props.button !== undefined 
    ? ['dropdown__button', `button--${props.button}`].join(' ')
    : `dropdown__button`


  const getLinkInMenu = item => <li className="dropdown__item">
    <Link to={item.path} className="dropdown__link" onClick={
      item.callBack !== undefined ? () => {
        dispatch(item.callBack())
        hideDrodDown()
      } : hideDrodDown
    }>{ item.label }</Link>
  </li>

  return (
    <>
      { props.type !== 'link' 
        ? <section className="dropdown" ref={wrapperRef}>
          <Button className={buttonClasses} onClick={toggleDropdown}>{dropDownlabel}</Button>
          { props.type === 'menu' 
            ? isOpen ? <ul className="box dropdown__menu">
              { props.menu.map((item, index) => 
                item.role !== undefined
                  ? item.role !== 'any' 
                    ? (item.role === props.profile.role || props.profile.role === 'admin')
                      ? <React.Fragment key={item.path}>{getLinkInMenu(item)}</React.Fragment>
                      : <></>
                    : <React.Fragment key={item.path}>{getLinkInMenu(item)}</React.Fragment>
                  : <React.Fragment key={item.path}>{getLinkInMenu(item)}</React.Fragment>
              ) }
            </ul> : ``
            : isOpen ? props.component : ``
          }
        </section> : <Link to={props.to} onClick={hideDrodDown}>{dropDownlabel}</Link> }
    </>
  )
}

export default Dropdown