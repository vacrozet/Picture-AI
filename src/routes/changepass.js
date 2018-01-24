import React, { Component } from 'react'
import '../css/changepass.css'
import { Form, Icon, Input, Button } from 'antd'
import { local } from '../utils/api.js'
const FormItem = Form.Item

class ChangePass extends Component {
  constructor (props) {
    super(props)
    this.state = {
      oldPass: '',
      newPass: '',
      newPass1: ''
    }
  }

  componentWillMount () {
    const lock = global.localStorage.getItem('lock')
    if (lock === false) {
      this.props.history.push('/home')
    }
  }

  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }
  handleSendData () {
    if (this.state.oldPass !== undefined && this.state.newPass !== undefined && this.state.newPass1 === this.state.newPass) {
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
    }
  }
  render () {
    return (
      <div className='bodyChangePass'>
        <div className='blockChangePass'>
          <center className='title'>Reset Password !</center><br />
          <Form>
            <FormItem>
              <Input name='oldPass' value={this.state.oldPass} onChange={this.handleChange.bind(this)} prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Mot de passe Provisoire' />
              <Input name='newPass' value={this.state.newPass} onChange={this.handleChange.bind(this)} prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Nouveau Mot de Passe' />
              <Input name='newPass1' value={this.state.newPass1} onChange={this.handleChange.bind(this)} prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Nouveau Mot de Passe' />
              <center>
                <Button type='primary' className='button' onClick={this.handleSendData.bind(this)}>
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
