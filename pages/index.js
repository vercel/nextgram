import React from 'react'
import Router from 'next/router'
import Modal from '../components/modal'
import 'isomorphic-fetch'

export default class extends React.Component {
  static async getInitialProps () {
    return {
      photos: await getGifNames(),
    }
  }

  constructor (props) {
    super(props)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  // handling escape close
  componentDidMount () {
    document.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.onKeyDown)
  }

  onKeyDown (e) {
    if (!this.props.url.query.photoId) return
    if (e.keyCode === 27) {
      this.props.url.back()
    }
  }

  dismissModal () {
    Router.push('/', '/', { shallow: true })
  }

  showPhoto (e, id) {
    e.preventDefault()
    Router.push(`/?photoId=${id}`, `/p/${id}`, { shallow: true })
  }

  render () {
    const { url, photos } = this.props

    return (
      <div className='list'>
        {
          url.query.photoId &&
            <Modal
              id={url.query.photoId}
              onDismiss={() => this.dismissModal()}
            />
        }
        {
          photos.map((id) => (
            <div key={id} className='photo'>
              <a
                className='photoLink'
                href={`/photo?id=${id}`}
                onClick={(e) => this.showPhoto(e, id)}
              >
                <img src={`https://thumbs.gfycat.com/${id}-thumb360.jpg`} />
              </a>
            </div>
          ))
        }
        <style jsx>{`
          .list {
            padding: 50px;
            text-align: center;
          }

          .photo {
            display: inline-block;
          }

          .photoLink {
            color: #333;
            verticalAlign: middle;
            cursor: pointer;
            background: #eee;
            display: inline-block;
            width: 250px;
            height: 120px;
            line-height: 120px;
            margin: 10px;
            border: 2px solid transparent;
          }

          .photoLink img {
            width: 250px;
          }

          .photoLink:hover {
            borderColor: blue;
          }
        `}</style>
      </div>
    )
  }
}


async function getGithubProfileIds() {
  const res = await fetch('https://api.github.com/users')
  const result = await res.json()
  return result.map((info) => info.id)
}

async function getGifNames() {
  const res = await fetch('https://api.gfycat.com/v1/gfycats/trending?count=20')
  const result = await res.json()

  return result.gfycats.map((info) => info.gfyName)
}
