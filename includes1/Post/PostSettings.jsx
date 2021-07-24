import React from 'react'
import { VscSettingsGear } from 'react-icons/vsc'
import { setURL } from '../../config/functions'
import Dropdown from '../../includes/Dropdown'

function PostSettings(props) {
  const settings = [
    { path: `${setURL('blog', props.id, 'edit')}`, label: 'Редактировать' },
    //{ role: 'any', path: `${setURL('profile', 'projects')}`, label: 'Проекты' }
  ]

  return (
    <Dropdown button="link" icon={<VscSettingsGear className="post__icon" />} type="menu" menu={settings} />
  )
}

export default PostSettings