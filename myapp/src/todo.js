import React from 'react'
import List from './list'

class Todo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      listId: 2,
      lists: [
        { listId: 1, listName: 'shoppingList' },
        { listId: 2, listName: 'Travel' }
      ]
    }
    this.handleEnter = this.handleEnter.bind(this)
  }

  handleEnter (value) {
    const name = value.target.value
    if (value.keyCode === 13) {
      this.setState({
        listId: this.state.listId + 1,
        lists: this.state.lists.concat({
          listId: this.state.listId + 1,
          listName: name
        })
      })
    }
  }

  render () {
    return (
      <List list={this.state.lists} handleEnter={e => this.handleEnter(e)} />
    )
  }
}

export default Todo
