import React, { Component } from 'react'
import SortableList from './sortable-list.js'
import '../css/home.css'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: [1, 2, 3, 4, 5, 6]
    }
  }

  componentWillMount () {
    const lock = global.localStorage.getItem('lock')
    if (lock === true) {
      this.props.history.push('/changepass')
    }
  }

  render () {
    return (
      <div className='bodyHome'>
        <SortableList
          items={this.state.items}
          onChange={(items) => {
            this.setState({ items })
          }}
     />
      </div>
    )
  }
}

export default Home
