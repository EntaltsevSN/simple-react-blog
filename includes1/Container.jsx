import React from 'react'

function Container(props) {
  const classes = props.className !== undefined
    ? ['container', props.className].join(' ')
    : props.wrapper !== undefined 
      ? ['container', `${props.wrapper}__container`].join(' ')
      : 'container'

  return (
    <section className={classes}>
      {props.children}
    </section>
  )
}

export default Container