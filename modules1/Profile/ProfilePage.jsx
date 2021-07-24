import React, { useState } from 'react'
import ProfileData from './ProfileData'
import ProfileHeader from './ProfileHeader'
import ProfileStats from './ProfileStats'

function ProfilePage({ profile }) {
  const [isEditable, setIsEditable] = useState(false)
  const [data, setData] = useState({...profile})
  const [avatarFile, setAvatarFile] = useState(null)
  const [handleAddress, setHandleAddress] = useState(false)

  const options = {
    profile, isEditable, setIsEditable, data, setData, handleAddress, setHandleAddress
  }

  return (
    <form className="form" onSubmit={e => handleSubmit(e)}>
      <ProfileHeader {...options} avatarFile={avatarFile} setAvatarFile={setAvatarFile} />
      <ProfileStats {...options} />
      <ProfileData {...options} />      
    </form>
  )
}

export default ProfilePage