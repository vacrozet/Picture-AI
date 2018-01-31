import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { Link } from 'react-router-dom'
import { local } from '../utils/api.js'
import '../css/signin.css'
const FormItem = Form.Item

class Signin extends Component {
  constructor (props) {
    super(props)
    this._mount = true
    this.state = {
      mail: '',
      password: '',
      loading: false
    }
    this.handleError = this.handleError.bind(this)
    this.handlekeyPress = this.handlekeyPress.bind(this)
  }

  componentWillMount () {
    this._mount = true
    // console.log(this.props.location.pathname)
  }
  componentWillUnmount () {
    this._mount = false
  }

  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }
  handleError (div) {
    var effet = document.getElementById(div)
    effet.style.transition = '0.6s'
    effet.style.border = 'solid 2px #FA0000'
    setTimeout(() => {
      if (this._mount === true) {
        var effet = document.getElementById(div)
        effet.style.transition = '0.6s'
        effet.style.border = 'none'
      }
    }, 5000)
  }
  handlekeyPress (evt) {
    if (evt.key === 'Enter' || evt.target.value === 'connexion') {
      if (this.state.mail !== '' && this.state.password !== '') {
        this.setState({loading: true})
        local().get('/user/signin', {
          params: {
            mail: this.state.mail,
            password: this.state.password
          }
        }).then((res) => {
          if (res.data.success === true) {
            this.props.handleConnexion(true, res.data.superUser)
            global.localStorage.setItem('token', res.data.token)
            if (res.data.lock === true) {
              global.localStorage.setItem('lock', true)
              this.props.history.push('/changepass')
            } else {
              global.localStorage.setItem('lock', false)
              this.props.history.push('/home')
            }
          }
        }).catch((err) => {
          this.setState({
            loading: false
          })
          if (err.response.data.success === false) this.handleError(err.response.data.div)
        })
      }
    }
  }

  render () {
    return (
      <div className='bodySignin'>
        <div className='blockSignin'>
          <center className='title'>Welcome !</center><br />
          <Form>
            <FormItem>
              <Input id='mail' name='mail' value={this.state.mail} onChange={this.handleChange.bind(this)} onKeyPress={this.handlekeyPress} prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Adresse Mail' />
              <Input id='password' name='password' value={this.state.password} onChange={this.handleChange.bind(this)} onKeyPress={this.handlekeyPress} prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Password' />
              <center>
                <Checkbox className='text'>Se souvenir de moi</Checkbox><br />
                <Link className='text link' to='/signin/reset'>Mot de passe oublié ?</Link><br />
                <Button type='primary' value='connexion' className='button' onKeyPress={this.handlekeyPress} onClick={this.handlekeyPress} loading={this.state.loading}>
                  Connexion
                </Button>
              </center>
            </FormItem>
          </Form>
        </div>

      </div>
    )
  }
}

export default Signin
