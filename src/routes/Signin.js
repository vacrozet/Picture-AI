import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { Link } from 'react-router-dom'
import { local } from '../utils/api.js'
import '../css/signin.css'
const FormItem = Form.Item

class Signin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mail: '',
      password: '',
      loading: false
    }
  }

  componentWillMount () {
    // console.log(this.props.location.pathname)
  }

  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSendData () {
    if (this.state.mail !== '' && this.state.password !== '') {
      this.setState({loading: true})
      local().get('/user/signin', {
        params: {
          mail: this.state.mail,
          password: this.state.password
        }
      }).then((res) => {
        if (res.data.success === true) {
          console.log('je rentre ici')
          console.log(res.data)
          this.props.handleConnexion(true, res.data.superUser)
          global.localStorage.setItem('token', res.data.token)
          if (res.data.lock === true) {
            this.props.history.push('/changepass')
            global.localStorage.setItem('lock', true)
          } else {
            this.props.history.push('/home')
            global.localStorage.setItem('lock', false)
          }
        }
      }).catch((err) => {
        console.log(err.response.data)
        this.setState({
          loading: false
        })
        if (err.response.data.success === false) {
          var effet = document.getElementById(err.response.data.div)
          effet.style.transition = '0.6s'
          effet.style.border = 'solid 2px #FA0000'
        }
      })
    }
  }

  render () {
    return (
      <div className='bodySignin'>
        <div className='blockSignin'>
          <center className='title'>Welcome !</center><br />
          <Form>
            <FormItem>
              <Input id='mail' name='mail' value={this.state.mail} onChange={this.handleChange.bind(this)} prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Adresse Mail' />
              <Input id='password' name='password' value={this.state.password} onChange={this.handleChange.bind(this)} prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Password' />
              <center>
                <Checkbox className='text'>Se souvenir de moi</Checkbox><br />
                <Link className='text link' to='/signin/reset'>Mot de passe oublié ?</Link><br />
                <Button type='primary' className='button' onClick={this.handleSendData.bind(this)} loading={this.state.loading}>
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
