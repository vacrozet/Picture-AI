import React, { Component } from 'react'
import '../css/home.css'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount () {
    const lock = global.localStorage.getItem('lock')
    if (lock === true) {
      this.props.history.push('/changepass')
    }
  }

  render () {
    return (
      <div className='bodyHome'>
        coucou
      </div>
    )
  }
}

export default Home
