import React, { Component } from 'react'
import { local } from '../utils/api.js'
import { Form, Icon, Input, Button, DatePicker } from 'antd'
import moment from 'moment'
import '../css/setting.css'
// const { MonthPicker, RangePicker } = DatePicker
const FormItem = Form.Item

function dateTime (month) {
  let nbMonth
  if (month === 'Jan') nbMonth = 1
  if (month === 'Feb') nbMonth = 2
  if (month === 'Mar') nbMonth = 3
  if (month === 'Apr') nbMonth = 4
  if (month === 'May') nbMonth = 5
  if (month === 'Jun') nbMonth = 6
  if (month === 'Jul') nbMonth = 7
  if (month === 'Aug') nbMonth = 8
  if (month === 'Sep') nbMonth = 9
  if (month === 'Oct') nbMonth = 10
  if (month === 'Nov') nbMonth = 11
  if (month === 'Dec') nbMonth = 12
  return nbMonth
}

class Setting extends Component {
  constructor (props) {
    super(props)
    this.state = {
      prenom: '',
      nom: '',
      birthday: '29/06/1993',
      loading: false
    }
  }

  componentWillMount () {
    local().get('/user/info').then((res) => {
      if (res.data.success === true) {
        this.setState({
          prenom: res.data.user.prenom,
          nom: res.data.user.nom,
          birthday: res.data.user.birthday,
          mail: res.data.user.mail
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }
  handleChangeDatePicker (evt) {
    var tab = evt._d.toString().split(' ')
    tab[1] = dateTime(tab[1])
    if (tab[1].toString().length === 1) tab[1] = '0' + tab[1]
    var date = tab[2] + '/' + tab[1] + '/' + tab[3]
    this.setState({birthday: date}, () => {
    })
  }
  handleSendData () {
    this.setState({loading: true})
    local().put('/user/info', {
      prenom: this.state.prenom,
      nom: this.state.nom,
      birthday: this.state.birthday,
      mail: this.state.mail
    }).then((res) => {
      this.setState({loading: false})
    }).catch((err) => {
      this.setState({loading: false})
      if (err.response.data.success === false) {
        var effet = document.getElementById(err.response.data.div)
        effet.style.transition = '0.6s'
        effet.style.border = 'solid 2px #FA0000'
      }
    })
  }

  render () {
    const dateFormat = 'DD/MM/YYYY'
    return (
      <div className='bodySetting'>
        <div className='blockSetting'>
          <div className='title'>
            <div className='name'>Info Utitlisateur</div>
          </div>
          <div className='info'>
            <Form>
              <FormItem>
                <center>
                  <div className=''>Prenom:</div>
                  <Input id='prenom' className='input' name='prenom' value={this.state.prenom} onChange={this.handleChange.bind(this)} prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Prenom' disabled={this.state.loading} />
                  <div className=''>Nom:</div>
                  <Input id='nom' className='input' name='nom' value={this.state.nom} onChange={this.handleChange.bind(this)} prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Nom' disabled={this.state.loading} />
                  <div className=''>Date de Naissance:</div>
                  <DatePicker id='birthday' name='data' onChange={this.handleChangeDatePicker.bind(this)} defaultValue={moment(this.state.birthday, dateFormat)} format={dateFormat} disabled={this.state.loading} />
                  <div className=''>Mail:</div>
                  <Input id='mail' className='input' name='mail' value={this.state.mail} onChange={this.handleChange.bind(this)} prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Mail' disabled />
                  <Button type='primary' className='button' onClick={this.handleSendData.bind(this)} loading={this.state.loading}>
                    Save
                  </Button>
                </center>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default Setting
