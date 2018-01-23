import React, { Component } from 'react'
import { Button, Modal } from 'antd'
import '../css/item.css'

class Item extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false
    }
  }
  handleModal () {
    return (
      <Modal title={this.props.prenom !== '' ? (this.props.res.prenom) : (this.props.res.mail)}
        visible={this.state.showModal}
        okText='Fermer'
        onOk={() => { this.setState({showModal: !this.state.showModal}) }}
        // confirmLoading={confirmLoading}
        onCancel={() => { this.setState({showModal: !this.state.showModal}) }}
      >
        <center>
          <p>Mail:</p>
          <p>{this.props.res.mail}</p>
          <p>Prénom:</p>
          <p>{this.props.res.prenom}</p>
          <p>Nom:</p>
          <p>{this.props.res.nom}</p>
          <p>Anniversaire:</p>
          <p>{this.props.res.birthday}</p>
          <Button className='buttonView' onClick={() => { this.setState({showModal: !this.state.showModal}) }}>Voir</Button>
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
