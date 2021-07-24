import React from 'react'
import { advices } from '../../config/advices'
import { setClasses } from '../../config/functions'
import FormAdvice from './FormAdvice'
import DatePicker, { registerLocale } from 'react-datepicker'
import moment from 'moment'
import ru from 'date-fns/locale/ru'
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
registerLocale("ru", ru)

import "react-datepicker/dist/react-datepicker.css";

function FormDate({ value, setValue, placeholder, groupClass, id, noFuture = false, noPast = false, disabled = false }) {
  const formatDate = date => `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
  const advice = advices.map(({ option }) => option).includes(id)
    ? advices.filter(({ option }) => option === id)[0]
    : null

  return (
    <div className={ 
      groupClass !== undefined 
        ? setClasses('form__group', groupClass) 
        : advice !== null 
        ? setClasses('form__group', 'flex')
        : "form__group"}>
      <DatePicker 
        className="form__input" 
        dateFormat="dd MMMM yyyy г. HH:mm" 
        locale="ru" 
        selected={new Date(value)} 
        onChange={date => setValue(+ date)} 
        timeCaption="time" 
        timeIntervals={15} 
        timeFormat="HH:mm" 
        peekNextMonth 
        showTimeSelect 
        showMonthDropdown 
        showYearDropdown 
        dropdownMode="select" 
        filterDate = {noFuture 
          ? (date) => moment() > date 
          : noPast 
          ? (date) => moment().subtract(1, 'days') < date 
          : false} 
        minTime={noPast 
          ? formatDate(new Date) === formatDate(new Date(value))
            ? setHours(setMinutes(new Date(), new Date().getMinutes()), new Date().getHours())
            : setHours(setMinutes(new Date(), 0), 0)
          : setHours(setMinutes(new Date(), 0), 0)
        }
        maxTime={setHours(setMinutes(new Date(), 45), 23)}
        readOnly={disabled} />
        { advice !== null && <FormAdvice advice={advice} /> }
    </div>
  )
}

export default FormDate