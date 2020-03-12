import React from 'react'

class IndividualList extends React.Component {
  render () {
    return (
      <div className='individualList'>
        <div className='tasksInList' />
        <div className='listNameContainer'>
          <i className='fas fa-archive' />
          <p className='listName'>{this.props.list.listName}</p>
        </div>
      </div>
    )
  }
}

export default IndividualList
