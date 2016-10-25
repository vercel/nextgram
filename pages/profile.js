import React from 'react'
import { style } from 'next/css'

export default ({ url: { query: { id } } }) => (
  <div className={style(styles.main)}>
    <h1 className={style(styles.heading)}>
      User profile:
      {' '}
      <b className={style(styles.username)}>{id}</b>
    </h1>
  </div>
)

const styles = {
  main: {
    padding: '100px'
  },

  heading: {
    font: '15px Monaco'
  },

  username: {
    color: 'blue'
  }
}
