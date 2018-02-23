import ReactDOM from 'react-dom'
import Header from './components/header.js'

import React, { Component } from 'react'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './index.css'

import Accueil from './accueil.js'
import Home from './routes/home.js'
import Signin from './routes/Signin.js'
import Reset from './routes/reset.js'
import Pass from './routes/changepass.js'
import Settings from './routes/setting.js'
import GestionUser from './routes/gestionUser.js'
import Profile from './routes/profile.js'
// import { local } from './utils/api'

class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      connected: '',
      superUser: ''
    }
    this.handleConnexion = this.handleConnexion.bind(this)
  }
  handleConnexion (arg, arg1) {
    // console.log(`connexion ==> ${arg}; superUser ==> ${arg1}`)
    this.setState({
      connected: arg,
      superUser: arg1
    })
  }

  componentWillMount () {
    const lock = global.localStorage.getItem('lock')
    if (lock === true) {
      this.props.history.push('/changepass')
    }
    if (global.localStorage.getItem('token') && (
      this.props.location.pathname === '/signin' ||
      this.props.location.pathname === '/signin/reset' ||
      this.props.location.pathname === '/')) {
      this.props.history.push('/home')
    }
  }

  render () {
    return (
      <div>
        <Header history={this.props.history} superUser={this.state.superUser} connected={this.state.connected} handleConnexion={this.handleConnexion} />
        <Switch>
          <Route exact path='/signin/reset' render={({history, match, location}) =>
            <Reset history={history} match={match} location={location} />
          } />
          <Route exact path='/signin' render={({history, match, location, connected}) =>
            <Signin history={history} match={match} location={location} handleConnexion={this.handleConnexion} />
          } />
          <Route exact path='/changepass' render={({history, match, location}) =>
            <Pass history={history} match={match} location={location} />
          } />
          <Route exact path='/setting' render={({history, match, location}) =>
            <Settings history={history} match={match} location={location} />
          } />
          <Route exact path='/gestionutilisateurs' render={({history, match, location}) =>
            <GestionUser history={history} match={match} location={location} />
          } />
          <Route exact path='/gestionutilisateurs/:profile' render={({history, match, location}) =>
            <Profile history={history} match={match} location={location} />
          } />
          <Route exact path='/home' render={({history, match, location}) =>
            <Home history={history} match={match} location={location} />
          } />
          <Route path='/' render={({history, match, location}) =>
            <Accueil history={history} match={match} location={location} />
          } />
        </Switch>
      </div>
    )
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Route component={Index} />
  </BrowserRouter>, document.getElementById('root'))
registerServiceWorker()
