import React from 'react'

function Loader(props) {
  return (
    <div className="loader">
      <div className="loader__box loader__box--blue"></div>
      <div className="loader__box loader__box--red"></div>
      <div className="loader__box loader__box--yellow"></div>
      <div className="loader__box loader__box--green"></div>
    </div>
  )
}

export default Loader