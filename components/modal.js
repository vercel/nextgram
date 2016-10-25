import React from 'react'
import Photo from './frame'
import { style } from 'next/css'

export default class extends React.Component {
  dismiss (e) {
    if (this.refs.shim === e.target
      || this.refs.photoWrap === e.target) {
      if (this.props.onDismiss) {
        this.props.onDismiss();
      }
    }
  }

  render () {
    return (
      <div className={style(styles.shim)} ref="shim" onClick={(e) => this.dismiss(e)}>
        <div ref="photoWrap" className={style(styles.photo)}>
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
