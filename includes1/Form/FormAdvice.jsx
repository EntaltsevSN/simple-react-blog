import React from 'react'
import { VscQuestion } from 'react-icons/vsc'

function FormAdvice({ advice, margin = 0 }) {
  return (
    <div className="form__advice" style={{ marginBottom: margin + 'px', marginLeft: margin !== 0 ? '8px' : '16px' }}>
      <VscQuestion className="form__question" />
      <div className="form__recommendation">
        <p className="form__explanation">{ advice.text }</p>
        { advice.required && <p className="form__text">
          <strong>Поле обязательно для заполнения</strong>
        </p> }
      </div>
    </div>
  )
}

export default FormAdvice