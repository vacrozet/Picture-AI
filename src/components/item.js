import React, { Component } from 'react'
import { Button, Modal } from 'antd'
import '../css/item.css'

class Item extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      loadingPassword: false
    }
    this.handleTimeOut = this.handleTimeOut.bind(this)
  }
  handleTimeOut () {
    this.setState({loadingPassword: true}, () => {
      setTimeout(() => {
        this.setState({loadingPassword: false})
      }, 2000)
    })
  }
  handleModal () {
    return (
      <Modal className='modal' title={this.props.prenom !== '' ? (this.props.res.prenom) : (this.props.res.mail)}
        visible={this.state.showModal}
        okText='Fermer'
        iconType={'question'}
        style={{color: '#ffcc00'}}
        onOk={() => { this.setState({showModal: !this.state.showModal}) }}
        // confirmLoading={confirmLoading}
        onCancel={() => { this.setState({showModal: !this.state.showModal}) }}
      >
        <center>
          <p className='index'>Mail:</p>
          <p>{this.props.res.mail}</p>
          {this.props.res.prenom !== '' ? (
            <div>
              <p className='index'>Prénom:</p>
              <p>{this.props.res.prenom}</p>
            </div>
          ) : (null)}
          {this.props.res.nom !== '' ? (
            <div>
              <p className='index'>Nom:</p>
              <p>{this.props.res.nom}</p>
            </div>
          ) : (null)}
          {this.props.res.birthday !== '' ? (
            <div>
              <p className='index'>Anniversaire:</p>
              <p>{this.props.res.birthday}</p>
            </div>
          ) : (null)}
          {this.props.res.lastConnexion !== '' ? (
            <div>
              <p className='index'>Dernière Connexion:</p>
              <p>{this.props.res.lastConnexion}</p>
            </div>
          ) : (null)}
          <Button type='danger' className='buttonModal'
            loading={this.state.loadingPassword}
            onClick={() => {
              // this.setState({showModal: !this.state.showModal})
              this.handleTimeOut()
            }}>Reinit Mot de Passe</Button><br />
          {this.props.block ? (
            <Button className='buttonModal' onClick={() => { this.setState({showModal: !this.state.showModal}) }}>Débloquer</Button>
          ) : (
            <Button type='danger' className='buttonModal' onClick={() => { this.setState({showModal: !this.state.showModal}) }}>Bloquer</Button>
          )}
          <Button type='danger' className='buttonModal' onClick={() => { this.setState({showModal: !this.state.showModal}) }}>Supprimer</Button>
        </center>
      </Modal>
    )
  }
  render () {
    return (
      <div className='bodyItem'>
        <div className='mail'>{this.props.res.mail}</div>
        <Button className='buttonView' onClick={() => { this.setState({showModal: !this.state.showModal}) }}>Voir</Button>
        {this.handleModal()}
      </div>
    )
  }
}

export default Item
