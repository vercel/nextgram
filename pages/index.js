import React from 'react'
import Modal from '../components/modal'
import { css, StyleSheet } from 'next/css'

export default class extends React.Component {
  static getInitialProps () {
    return {
      // dummy data
      photos: new Array(15).fill(0).map((v,k)=>k+1)
    }
  }

  constructor (props) {
    super(props)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  componentDidMount () {
    document.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.onKeyDown)
  }

  onKeyDown (e) {
    if (!this.props.url.query.id) return
    if (27 === e.keyCode) {
      this.props.url.back()
    }
  }

  dismissModal () {
    this.props.url.back()
  }

  showPhoto (id) {
    this.props.url.push('/photo?id=' + id)
  }

  render () {
    return (
      <div className={css(styles.list)}>
        {
          this.props.url.query.id &&
            <Modal
              id={this.props.url.query.id}
              onDismiss={ () => this.dismissModal() }
            />
        }
        {
          this.props.photos.map((id) => (
            <div key={id} className={css(styles.photo)}>
              <a className={css(styles.photoLink)} onClick={() => this.showPhoto(id) }>
                {id}
              </a>
            </div>
          ))
        }
      </div>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    padding: '50px',
    textAlign: 'center'
  },

  photo: {
    display: 'inline-block'
  },

  photoLink: {
    color: '#333',
    verticalAlign: 'middle',
    cursor: 'pointer',
    background: '#eee',
    display: 'inline-block',
    width: '250px',
    height: '250px',
    lineHeight: '250px',
    margin: '10px',
    border: '2px solid transparent',
    ':hover': {
      borderColor: 'blue'
    }
  }
})
