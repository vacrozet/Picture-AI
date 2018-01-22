import React, { Component } from 'react'
import './css/accueil.css'

class Accueil extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <div className='bodyAccueil'>
        <center>Bienvenue</center>
      </div>
    )
  }
}

export default Accueil
