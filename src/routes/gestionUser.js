import React, { Component } from 'react'
import { local } from '../utils/api.js'
import '../css/gestionUser.css'

class GestionUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount () {
    local().get('user/info').then((res) => {
      if (res.data.user.superUser === false) {
        this.props.history.push('/home')
      }
    }).catch((err) => {
      console.log(err)
    })
    local().get('/user/all').then((res) => {
      console.log(res.data.result)
    }).catch((err) => {
      console.log(err)
    })
  }

  render () {
    return (
      <div className='bodyGestionUser'>
        <div className='blockGestionUser'>
          <div className='title'>
            <div className='name'>Gestion Utitlisateurs</div>
          </div>
        </div>
      </div>
    )
  }
}

export default GestionUser
