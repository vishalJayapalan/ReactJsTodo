import React from 'react'
import IndividualList from './individualList'

export default class List extends React.Component {
  listShower (list) {
    return <IndividualList key={list.listId} list={list} />
  }

  render () {
    return (
      <div className='listPage'>
        <nav className='listNav'>
          <button className='createListBtn'>CreateList</button>
          <button className='searchListBtn'>Search</button>
        </nav>

        <input
          className='newInputList'
          type='text'
          placeholder='Please enter a List Name'
          onKeyUp={e => {
            return this.props.handleEnter(e)
          }}
        />
        <p>Page loaded at {this.props.date}</p>
        <div className='listContainer'>
          {this.props.list.map(l => {
            return this.listShower(l)
          })}
        </div>
      </div>
    )
  }
}
