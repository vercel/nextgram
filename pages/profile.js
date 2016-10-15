import React from 'react'
import { css, StyleSheet } from 'next/css'

export default ({ url: { query: { id } } }) => (
  <div className={css(styles.main)}>
    <h1 className={css(styles.heading)}>
      User profile:
      {' '}
      <b className={css(styles.username)}>{id}</b>
    </h1>
  </div>
)

const styles = StyleSheet.create({
  main: {
    padding: '100px'
  },

  heading: {
    font: '15px Monaco'
  },

  username: {
    color: 'blue'
  }
})
