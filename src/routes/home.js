import React, { Component } from 'react'
import {Input, Button} from 'antd'
import { local } from '../utils/api.js'
import '../css/home.css'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      newProject: ''
    }
  }

  componentWillMount () {
    const lock = global.localStorage.getItem('lock')
    if (lock === true) {
      this.props.history.push('/changepass')
    }
  }

  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleGetProject () {
    local().get('/project/project').then((res) => {
      if (res.data.success === true) {
        this.setState({projects: res.data.result})
      }
    }).catch((err) => { console.log(err) })
  }

  handlekeyPress (evt) {
    if (evt.key === 'Enter' || evt.target.value === 'New') {
      if (this.state.newProject !== '') {
        this.setState({loading: true})
        local().put('/project/addproject', {
          name: this.state.newProject
        }).then((res) => {
          if (res.data.success === true) {
            this.handleGetProject()
          }
        }).catch((err) => { console.log(err) })
      }
    }
  }

  render () {
    return (
      <div className='bodyHome'>
        <div className='divTitle'>
          <div className='title'>Créer Nouveau Projet</div>
        </div>
        <div className='divCreateNewProject'>
          <div className='newProject'>
            <Input name='newProject' className='input' value={this.state.newProject} onKeyPress={this.handlekeyPress} onChange={this.handleChange.bind(this)} placeholder='Nom du projet' />
            <Button type='primary' value='connexion' className='button' onKeyPress={this.handlekeyPress} onClick={this.handlekeyPress} loading={this.state.loading}>
              Nouveau Projet
            </Button>
          </div>
        </div>
        <div className='divProject'>Nouveaux Projets ICI</div>
      </div>
    )
  }
}

export default Home
