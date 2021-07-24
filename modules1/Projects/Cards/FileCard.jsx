import React, { useState } from 'react'
import { VscFile, VscFileZip } from 'react-icons/vsc'
import { ImFileMusic } from 'react-icons/im'
import { formatBytes, setClasses } from '../../../config/functions'
import { settings } from '../../../config/settings'
import Button from '../../../includes/Button'
import ProjectGraph from '../Project/ProjectGraph'

function FileCard({ file }) {
  const [showMore, setShowMore] = useState(false)
  const extension = file.meta.name.split('.')[file.meta.name.split('.').length - 1]

  const fileIcons = [
    { types: ['zip', 'rar', '7z', 'gz'], icon: <VscFileZip className="project__icon" /> },
    { types: ['mp3', 'wav', 'flac'], icon: <ImFileMusic className="project__icon" /> }
  ]

  return (
    <article className="project__file-card">
      { fileIcons.filter(({types}) => types.includes(extension))[0] === undefined
        ? <VscFile className="project__icon" />
        : fileIcons.filter(({types}) => types.includes(extension))[0].icon
      }
      <div className="project__infos">
        <h4 className={setClasses("project__title", 'small')}>
          <a href={file.file} target="_blank" download>{ file.title }</a>
        </h4>
        <p className="project__details">
          (размер файла: {formatBytes(file.meta.size)})
        </p>  
      </div>
    </article>
  )
}

export default FileCard