import React from 'react'

export default class IndividualTask extends React.Component {
  render () {
    return (
      <div className='individualTask'>
        <input className='done' type='checkbox' />
        <p className='taskName'>{this.props.task.taskName}</p>
      </div>
    )
  }
}
