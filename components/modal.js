import React from 'react'
import Photo from './frame'
import { style } from 'next/css'

export default class extends React.Component {
  dismiss (e) {
    if (this._shim === e.target ||
       this._photoWrap === e.target) {
      if (this.props.onDismiss) {
        this.props.onDismiss()
      }
    }
  }

  render () {
    return (
      <div ref={el => (this._shim = el)} className={style(styles.shim)} onClick={(e) => this.dismiss(e)}>
        <div ref={el => (this._photoWrap = el)} className={style(styles.photo)}>
          <Photo id={this.props.id} />
        </div>
      </div>
    )
  }
}

const styles = {
  shim: {
    position: 'fixed',
    background: 'rgba(0,0,0,.65)',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: 'auto'
  },

  photo: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    marginTop: '-250px'
  }
}
