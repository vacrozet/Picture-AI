import React, { Component } from 'react'
import { Menu, Dropdown, Button } from 'antd'
import { local } from '../utils/api.js'
import 'antd/dist/antd.css'
import '../css/header.css'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      Connexion: '',
      superUser: false
    }
  }
  componentWillMount () {
    const lock = global.localStorage.getItem('lock')
    if (global.localStorage.getItem('token')) {
      this.setState({Connexion: true}, () => {
        local().get('/user/info').then((res) => {
          this.props.handleConnexion(true, res.data.user.superUser)
          this.setState({ superUser: true })
        }).catch((err) => {
          console.log(err)
        })
      })
    }
    if (lock === true) {
      this.props.history.push('/changepass')
    }
  }
  componentWillReceiveProps (props) {
    this.setState({
      Connexion: props.connected,
      superUser: props.superUser
    })
  }
  handleChangePage (arg) {
    this.props.history.push(arg)
  }
  handlelogout () {
    global.localStorage.removeItem('token')
    global.localStorage.removeItem('Actif')
    this.props.handleConnexion(false)
    this.props.history.push('/')
  }

  handleClick () {
    if (this.state.Connexion === true) {
      this.props.history.push('/home')
    } else {
      this.props.history.push('/')
    }
  }
  render () {
    let menu = null
    if (this.state.superUser === true) {
      menu = (
        <Menu>
          <Menu.Item>
            <div onClick={this.handleChangePage.bind(this, '/setting')}>Setting</div>
          </Menu.Item>
          <Menu.Item>
            <div onClick={this.handleChangePage.bind(this, '/gestionutilisateurs')}>Utilisateurs</div>
          </Menu.Item>
          <Menu.Item>
            <div onClick={this.handlelogout.bind(this)}>Logout</div>
          </Menu.Item>
        </Menu>
      )
    } else {
      menu = (
        <Menu>
          <Menu.Item>
            <div onClick={this.handleChangePage.bind(this, '/setting')}>Setting</div>
          </Menu.Item>
          <Menu.Item>
            <div onClick={this.handlelogout.bind(this)}>Logout</div>
          </Menu.Item>
        </Menu>
      )
    }

    return (
      <div className='header'>
        <div className='title'>
          <img className='name' alt='SoyuzDigital' onClick={this.handleClick.bind(this)} src='https://soyuz.digital/wp-content/themes/soyouz2016/images/logo-soyuz.png' />
        </div>
        <div className='profil'>
          {this.state.Connexion ? (
            <Dropdown overlay={menu} placement='bottomRight'>
              <div className='picture'>oko</div>
            </Dropdown>
          ) : (
            <div className='divButton'>
              <Button type='primary' className='buttonSignin' onClick={() => { this.props.history.push('/signin') }}>Connexion</Button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Header
