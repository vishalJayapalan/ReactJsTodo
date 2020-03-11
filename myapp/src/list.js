import React from 'react'
import IndividualList from './individualList'

export default class List extends React.Component {
  listShower (list) {
    return <IndividualList key={list.listId} list={list} />
  }

  render () {
    return (
      <div>
        <input
          type='text'
          placeholder='Please enter a List Name'
          onKeyUp={e => {
            return this.props.handleEnter(e)
          }}
        />
        {this.props.list.map(l => {
          return this.listShower(l)
        })}
      </div>
    )
  }
}
