import React, { Component } from 'react'
import { local } from '../utils/api.js'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
// import Item from '../components/item.js'
import '../css/gestionUser.css'
const FormItem = Form.Item

class GestionUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: '',
      mail: '',
      loading: false,
      checkBox: false,
      disabledAdd: true
    }
    this.handleUpdateData = this.handleUpdateData.bind(this)
  }
  componentWillMount () {
    local().get('/user/info').then((res) => {
      if (res.data.user.superUser === false) {
        this.props.history.push('/home')
      }
    }).catch((err) => { console.log(err) })
    this.handleUpdateData()
  }

  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value}, () => {
      if (this.state.mail.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        this.setState({disabledAdd: false})
      }
    })
  }

  handleUpdateData () {
    local().get('/user/all').then((res) => {
      this.setState({users: res.data.result})
    }).catch((err) => {
      console.log(err)
    })
  }

  handleCheckbox () {
    this.setState({checkBox: !this.state.checkBox})
  }
  handleChangePage (evt) {
    this.props.history.push(`/gestionutilisateurs/${evt.target.name}`)
  }

  handleSendData () {
    this.setState({loading: true})
    local().put('/user/signup', {
      mail: this.state.mail,
      superUser: this.state.checkBox
    }).then((res) => {
      if (res.data.success === true) {
        this.setState({loading: false})
        this.handleUpdateData()
      }
    }).catch((err) => {
      console.log(err)
      this.setState({loading: false})
    })
  }

  render () {
    return (
      <div className='bodyGestionUser'>
        <div className='blockGestionUser'>
          <div className='title'>
            <div className='name'>Gestion Utitlisateurs</div>
          </div>
          <div className='WindowsGestionUser'>
            <div className='addUser'>
              <Form layout='inline' className='form'>
                <center>
                  <FormItem>
                    <Input id='mail' name='mail' disabled={this.state.loading} value={this.state.mail} onChange={this.handleChange.bind(this)} prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Adresse Mail' />
                  </FormItem>
                  <FormItem>
                    <Checkbox className='text' onChange={this.handleCheckbox.bind(this)} disabled={this.state.loading}>Super Utilisateur</Checkbox>
                  </FormItem>
                  <FormItem>
                    <Button type='primary' className='button' onClick={this.handleSendData.bind(this)} disabled={this.state.disabledAdd} loading={this.state.loading}>
                      AJOUTER
                    </Button>
                  </FormItem>
                </center>
              </Form>
            </div>
            <div className='allUser'>
              {this.state.users ? this.state.users.map((res, index) => {
                return (
                  <div className='bodyItem' key={index}>
                    <div className='text'>
                      <div className='mail'>{res.mail}</div>
                    </div>
                    <div className='text'>
                      <Button className='buttonView' name={res.mail} onClick={this.handleChangePage.bind(this)}>Voir</Button>
                    </div>
                  </div>
                )
              })
              : (
                null
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default GestionUser
