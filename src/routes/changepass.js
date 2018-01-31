import React, { Component } from 'react'
import '../css/changepass.css'
import { Form, Icon, Input, Button } from 'antd'
import { local } from '../utils/api.js'
const FormItem = Form.Item

class ChangePass extends Component {
  constructor (props) {
    super(props)
    this._mount = true
    this.state = {
      oldPass: '',
      newPass: '',
      newPass1: ''
    }
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  componentWillMount () {
    this._mount = true
    const lock = global.localStorage.getItem('lock')
    if (lock === false) {
      this.props.history.push('/home')
    }
  }
  componentWillUnmount () {
    this._mount = false
  }

  handleChange (evt) {
    console.log(evt.target.name)
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleError (div) {
    var effet = document.getElementsByClassName(div)
    for (let index = 0; index < effet.length; index++) {
      effet[index].style.transition = '0.6s'
      effet[index].style.border = 'solid 2px #FA0000'
    }
    setTimeout(() => {
      if (this._mount === true) {
        for (let index = 0; index < effet.length; index++) {
          effet[index].style.transition = '0.6s'
          effet[index].style.border = 'none'
        }
      }
    }, 5000)
  }

  handleKeyPress (evt) {
    console.log('je passe')
    if (evt.key === 'Enter' || evt.target.value === 'changePass') {
      if (this.state.oldPass !== '' && this.state.newPass !== '' &&
      this.state.newPass1 !== '' && this.state.newPass === this.state.newPass1 &&
      this.state.oldPass !== this.state.newPass) {
        local().put('/user/passwordlost', {
          oldPass: this.state.oldPass,
          newPass: this.state.newPass,
          newPass1: this.state.newPass1
        }).then((res) => {
          if (res.data.success === true) {
            global.localStorage.removeItem('lock')
            this.props.history.push('/home')
          } else {
            this.setState({
              oldPass: '',
              newPass: '',
              newPass1: ''
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      } else if (this.state.newPass !== this.state.newPass1) {
        this.handleError('newPass')
      } else this.handleError('Pass')
    }
  }
  render () {
    return (
      <div className='bodyChangePass'>
        <div className='blockChangePass'>
          <center className='title'>Reset Password !</center><br />
          <Form>
            <FormItem>
              <Input name='oldPass' className='Pass' value={this.state.oldPass} onKeyPress={this.handleKeyPress} onChange={this.handleChange.bind(this)} prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Mot de passe Provisoire' />
              <Input className='newPass Pass' name='newPass' value={this.state.newPass} onKeyPress={this.handleKeyPress} onChange={this.handleChange.bind(this)} prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Nouveau Mot de Passe' />
              <Input className='newPass Pass' name='newPass1' value={this.state.newPass1} onKeyPress={this.handleKeyPress} onChange={this.handleChange.bind(this)} prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Nouveau Mot de Passe' />
              <center>
                <Button value='changePass' type='primary' className='button' onKeyPress={this.handleKeyPress} onClick={this.handleKeyPress}>
                  Modifier
                </Button>
              </center>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

export default ChangePass
