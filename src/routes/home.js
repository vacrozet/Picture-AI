import React, { Component } from 'react'
import '../css/home.css'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    console.log('je rentre sur la page home')
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
