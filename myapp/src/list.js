import React from 'react'
import IndividualList from './individualList'

export default class List extends React.Component {
  listShower (list) {
    return (
      <IndividualList
        key={list.listId}
        list={list}
        onHandleUpdate={this.props.handleUpdate}
        onHandleUpdateInput={this.props.handleUpdateInput}
        onHandleClick={this.props.handleDelete}
        onOpenTask={this.props.handleTaskOpen}
      />
    )
  }

  render () {
    let button
    if (this.props.listInput) {
      button = (
        <input
          autoFocus
          className='newInputList'
          type='text'
          placeholder='Please enter a List Name'
          onKeyUp={e => {
            return this.props.handleCreate(e)
          }}
        />
      )
    }
    return (
      <div className='listPage'>
        <nav className='listNav'>
          <button className='createListBtn' onClick={this.props.handleCreate}>
            CreateList
          </button>
          <button className='searchListBtn'>Search</button>
        </nav>
        {button}
        <div className='listContainer'>
          {this.props.lists.map(list => {
            return this.listShower(list)
          })}
        </div>
      </div>
    )
  }
}
