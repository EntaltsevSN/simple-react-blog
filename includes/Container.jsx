import React from 'react'
import { classes } from '../config/functions'

export default ({ children, type }) => (
  <section className={classes('container', type)}>{ children }</section>
)