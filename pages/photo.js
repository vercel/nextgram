import React from 'react'
import Photo from '../components/frame'
import { css, StyleSheet } from 'next/css'

export default ({ url: { query: { id } } }) => (
  <div className={css(styles.permalink)}>
    <div className={css(styles.wrap)}>
      <Photo id={id} />
    </div>
  </div>
)

const styles = StyleSheet.create({
  permalink: {
    padding: '100px',
    textAlign: 'center'
  },

  wrap: {
    display: 'inline-block',
    border: '1px solid #999',
    margin: 'auto'
  }
})
