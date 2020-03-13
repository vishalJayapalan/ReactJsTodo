import React from 'react'

class IndividualList extends React.Component {
  render () {
    let nameToggle
    if (this.props.list.inputToggle) {
      nameToggle = (
        <p className='listName' onClick={this.props.onHandleUpdateInput}>
          {this.props.list.listName}
        </p>
      )
    } else {
      nameToggle = (
        <input
          autoFocus
          className='listNameInput'
          type='text'
          defaultValue={this.props.list.listName}
          onKeyUp={this.props.onHandleUpdate}
        />
      )
    }
    return (
      <div className='individualList' id={this.props.list.listId}>
        <div className='tasksInList' onClick={this.props.onOpenTask}>
          {this.props.list.tasks.map(task => (
            <p key={task.taskId} className='taskInList'>
              {task.taskName}
            </p>
          ))}
        </div>
        <div className='listNameContainer'>
          <i className='fas fa-archive' onClick={this.props.onHandleClick} />
          {nameToggle}
        </div>
      </div>
    )
  }
}

export default IndividualList
