import React from 'react'
import Photo from '../components/frame'
import { style } from 'next/css'

export default ({ url: { query: { id } } }) => (
  <div className={style(styles.permalink)}>
    <div className={style(styles.wrap)}>
      <Photo id={id} />
    </div>
  </div>
)

const styles = {
  permalink: {
    padding: '100px',
    textAlign: 'center'
  },

  wrap: {
    display: 'inline-block',
    border: '1px solid #999',
    margin: 'auto'
  }
}
