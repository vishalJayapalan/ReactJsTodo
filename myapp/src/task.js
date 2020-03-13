import React from 'react'
import IndividualTask from './individualTask'

export default class Task extends React.Component {
  render () {
    return (
      <div>
        <nav className='taskNav'>
          <button className='back' onClick={this.props.handleBack}>
            Back
          </button>
          <button className='clearCompletedBtn'>ClearCompleted</button>
        </nav>
        <p>{this.props.listName.toUpperCase()}</p>
        <input
          autoFocus
          type='text'
          placeholder='Enter the taskName'
          className='taskInput'
          onKeyUp={this.props.handleCreateTask}
        />
        <div className='taskContainer'>
          {this.props.tasks.map(task => (
            <IndividualTask
              key={task.taskId}
              task={task}
              deleteTask={this.props.deleteTask}
            />
          ))}
        </div>
      </div>
    )
  }
}
