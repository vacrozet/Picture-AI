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
        <div className='blockAccueil'>Reconnaissance de la composante d'une image</div>
      </div>
    )
  }
}

export default Accueil
