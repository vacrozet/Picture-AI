import React, { Component } from 'react'
import { local } from '../utils/api.js'
import { Button, Modal } from 'antd'
import '../css/profile.css'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: '',
      loadingPassword: false,
      visible: false
    }
    this.handleUpdateData = this.handleUpdateData.bind(this)
  }

  componentWillMount () {
    this.handleUpdateData()
  }

  handleUpdateData () {
    local().get('/user/onuser', {
      params: {
        mail: this.props.match.params.profile
      }
    }).then((res) => {
      if (!res.data.superUser) this.props.history.push('/home')
      this.setState({data: res.data.result}, () => {
      })
    }).catch((err) => {
      console.log(err)
    })
  }
  handleChangePage () {
    this.props.history.push('/gestionutilisateurs')
  }

  handleBlock () {
    local().put('/user/block', {
      mail: this.state.data.mail
    }).then((res) => {
      this.handleUpdateData()
    }).catch((err) => { console.log(err) })
  }

  handleDelete () {
    local().delete('/user/delete', {
      params: {
        mail: this.state.data.mail
      }
    }).then((res) => {
      if (res.data.success) this.props.history.push('/gestionutilisateurs')
    }).catch((err) => {
      console.log(err)
    })
  }
  handleSuperUser () {
    local().put('/user/superuser', {
      mail: this.state.data.mail
    }).then((res) => {
      this.handleUpdateData()
    }).catch((err) => {
      console.log(err)
    })
  }

  handleReinit () {
    this.setState({loadingPassword: true})
    local().put('/user/resetpassadmin', {
      mail: this.state.data.mail
    }).then((res) => {
      if (res.data.success) this.setState({loadingPassword: false})
    }).catch((err) => {
      this.setState({loadingPassword: false})
    })
  }

  handleModal () {
    return (
      <Modal
        title='Suppression ?'
        visible={this.state.visible}
        okText='Supprimer'
        onOk={this.handleDelete.bind(this)}
        cancelText='Annuler'
        onCancel={() => { this.setState({visible: !this.state.visible}) }}
      >
        <p>Êtes - vous sur de vouloir supprimer l'utilisateur ?</p>
      </Modal>
    )
  }

  render () {
    return (
      <div className='bodyProfile'>
        <div className='blockProfile'>
          <div className='title'>
            {this.state.data.prenom !== '' ? (
              <div className='name'>{this.state.data.prenom}</div>
            ) : (
              <div className='name'>{this.state.data.mail}</div>
            )}
          </div>
          <div className='WindowsGestionUser'>
            <center>
              {this.handleModal()}
              <p className='index'>Mail:</p>
              <p>{this.state.data.mail}</p>
              {this.state.data.prenom !== '' ? (
                <div>
                  <p className='index'>Prénom:</p>
                  <p>{this.state.data.prenom}</p>
                </div>
              ) : (null)}
              {this.state.data.nom !== '' ? (
                <div>
                  <p className='index'>Nom:</p>
                  <p>{this.state.data.nom}</p>
                </div>
              ) : (null)}
              {this.state.data.birthday !== '' ? (
                <div>
                  <p className='index'>Anniversaire:</p>
                  <p>{this.state.data.birthday}</p>
                </div>
              ) : (null)}
              <div>
                <p className='index'>Dernière Connexion:</p>
                {this.state.data.lastConnexion !== '' ? (
                  <p>{this.state.data.lastConnexion}</p>
                ) : (
                  <p>Jamais</p>
                )}
              </div>
              <div>
                <p className='index'>SuperUser:</p>
                {this.state.data.superUser ? (
                  <p>Oui</p>
                ) : (
                  <p>Non</p>
                )}
              </div>
              {this.state.data.superUser ? (
                <Button className='buttonModal' onClick={this.handleSuperUser.bind(this)}>Passer en User</Button>
              ) : (
                <Button className='buttonModal' onClick={this.handleSuperUser.bind(this)}>Passer en Super User</Button>
              )}
              <br />
              <Button type='danger' className='buttonModal'
                loading={this.state.loadingPassword}
                onClick={this.handleReinit.bind(this)}>Reinitialiser le Mot de Passe</Button><br />
              {this.state.data.block ? (
                <Button className='buttonModal' onClick={this.handleBlock.bind(this)}>Débloquer</Button>
              ) : (
                <Button type='danger' className='buttonModal' onClick={this.handleBlock.bind(this)}>Bloquer</Button>
              )}
              <Button type='danger' className='buttonModal' onClick={() => { this.setState({visible: !this.state.visible}) }}>Supprimer</Button><br />
              <Button className='buttonModal' onClick={this.handleChangePage.bind(this)}>Revenir au Menu</Button>
            </center>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
