import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import { local } from '../utils/api.js'
import '../css/reset.css'
const FormItem = Form.Item

class Reset extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mail: '',
      loading: false,
      error: false,
      message: ''
    }
  }

  componentWillMount () {
    if (global.localStorage.getItem('token')) {
      this.props.history.push('/')
    }
  }
  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSend () {
    if (this.state.mail !== undefined && this.state.mail !== '') {
      this.setState({loading: true})
      local().put('/user/resetpassword', {
        mail: this.state.mail
      }).then((res) => {
        if (res.data.success === true) {
          this.setState({loading: false})
          this.props.history.push('/signin')
        } else {
          console.log(res.data)
        }
      }).catch((err) => {
        this.setState({
          loading: false,
          error: true,
          message: err.response.data.message
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
      <div className='bodySigninReset'>
        <div className='blockSigninReset'>
          <center className='title'>Mot de Passe Oublié</center><br />
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              <Input id='mail' name='mail' onChange={this.handleChange.bind(this)} prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Adresse Mail' />
              <center>
                {this.state.error ? (
                  <div className='text error'>{this.state.message}</div>
                ) : (
                  null
                )}
                <Button type='primary' className='button' onClick={this.handleSend.bind(this)} loading={this.state.loading}>Récupérer</Button><br />
                <Link className='text link' to='/signin'>Retour</Link>
              </center>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

export default Reset
