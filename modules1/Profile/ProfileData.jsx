import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AddressSuggestions } from 'react-dadata'
import 'react-dadata/dist/react-dadata.css';
import { setClasses } from '../../config/functions';
import { settings } from '../../config/settings';
import FormCheckbox from '../../includes/Form/FormCheckbox';
import FormDate from '../../includes/Form/FormDate';
import FormInput from '../../includes/Form/FormInput';
import FormPhone from '../../includes/Form/FormPhone';

function ProfileData({ profile, isEditable, setIsEditable, data, setData, handleAddress, setHandleAddress }) {
  const [value, setValue] = useState('')
  const [lastName, setLastName] = useState(data.delivery.lastName)
  const [name, setName] = useState(data.delivery.name)
  const [secondName, setSecondName] = useState(data.delivery.secondName)
  const [phone, setPhone] = useState(data.delivery.phone)
  const [apartment, setApartment] = useState(data.delivery.apartment)
  const [city, setCity] = useState(data.delivery.city)
  const [country, setCountry] = useState(data.delivery.country)
  const [house, setHouse] = useState(data.delivery.house)
  const [region, setRegion] = useState(data.delivery.region)
  const [street, setStreet] = useState(data.delivery.street)
  const [zip, setZip] = useState(data.delivery.zip)
  const [birthday, setBirthday] = useState(data.birthday)

  console.log(country)

  const getDate = time => new Date(time).toLocaleDateString()
  
  useEffect(() => {
    setData({
      ...data, birthday,
      delivery: {
        ...data.delivery,
        apartment, city, country, house, lastName, name, phone, region, secondName, street, zip
      }
    })
  }, [apartment, city, country, house, lastName, name, phone, region, secondName, street, zip, birthday, handleAddress])

  const personal = [
    { property: 'Фамилия', value: lastName },
    { property: 'Имя', value: name },
    { property: 'Отчество', value: secondName },
    { property: 'Номер телефона', value: phone },
    { property: 'Дата рождения', value: getDate(birthday) }
  ]

  const delivery = [
    { property: 'Страна', value: country },
    { property: 'Регион', value: region !== '' ? region : null },
    { property: 'Город', value: city },
    { property: 'Адрес', value: `${street !== '' ? 'ул. ' + street : ''}${house !== '' ? ', д. ' + house : ''}${apartment !== '' ? ', кв. ' + apartment : ''}` },
    { property: 'Индекс', value: zip }
  ]

  const handleChangeDeliveryData = e => {
    setValue(e)
    setApartment(e.data.flat !== null ? e.data.flat : '')
    setCity(e.data.city !== null ? e.data.city : '')
    setCountry(e.data.country !== null ? e.data.country : '')
    setHouse(e.data.house !== null ? e.data.house : '')
    setRegion(e.data.region_with_type !== null ? e.data.region_with_type : '')
    setStreet(e.data.street !== null ? e.data.street : '')
    setZip(e.data.postal_code !== null ? e.data.postal_code : '')
  }

  return (
    <section className="profile__data">
      <section className="profile__section">
        <h4 className="profile__subtitle">Личные данные</h4>
        { personal.map(({ property, value }, index) => (!isEditable && (value === '')) ? <></> : <div key={property} className="profile__block">
          <p className="profile__property">{property}:</p>
          <p className="profile__value">{ 
            isEditable 
              ? index === 0 ? <FormInput value={lastName} setValue={setLastName} /> : 
                index === 1 ? <FormInput value={name} setValue={setName} /> :
                index === 2 ? <FormInput value={secondName} setValue={setSecondName} /> : 
                index === 3 ? <FormPhone value={phone} setValue={setPhone} /> : 
                index === 4 ? <FormDate value={birthday} setValue={setBirthday} noFuture /> : <></>
              : value !== null ? value :  <>Не указано</>
          }</p>
        </div> ) }
      </section>
      <section className="profile__section">
      <h4 className="profile__subtitle">Доставка</h4>
        { isEditable ? handleAddress ? <></> : <div className={setClasses('form__group', 'margin-bottom')}>
          <AddressSuggestions token={settings.dadata.token} value={value} onChange={handleChangeDeliveryData} filterLocations={[{ "country": "*" }]} inputProps={{ 
            placeholder: "Адрес с учётом страны",
            className: "form__input"
          }} />
        </div> : <></> }
        { isEditable && <FormCheckbox value={handleAddress} setValue={setHandleAddress} placeholder="Ввести адрес вручную" /> }
        { !handleAddress && delivery.map(({ property, value }) => (value !== '' || value !== null) ? <div key={property} className="profile__block">
          <p className="profile__property">{property}:</p>
          <p className="profile__value">{ value }</p>
        </div> : <></>) }
        { isEditable && handleAddress && <>
          <FormInput value={country} setValue={setCountry} placeholder="Страна" />
          <FormInput value={region} setValue={setRegion} placeholder="Регион" />
          <FormInput value={city} setValue={setCity} placeholder="Город" />
          <FormInput value={street} setValue={setStreet} placeholder="Улица" />
          <FormInput value={house} setValue={setHouse} placeholder="Дом" />
          <FormInput value={apartment} setValue={setApartment} placeholder="Квартира" />
          <FormInput value={zip} setValue={setZip} placeholder="Индекс  " />
        </> }
      </section>
    </section>
  )
}

export default ProfileData