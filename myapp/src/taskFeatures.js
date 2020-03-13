import React from 'react'

export default class TaskFeatures extends React.Component {
  render () {
    // console.log(this.props.task.taskId)
    return (
      <div className='taskFeatures'>
        <p className='notes'>Notes</p>
        <textarea className='textNotes' />
        <p className='dueDate'>Due Date</p>
        <input type='date' className='date' />
        <p className='priority'>Priority</p>
        <select className='prioritySelect'>
          <option>None</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button
          className='dltBtn'
          onClick={() =>
            this.props.deleteTask(
              this.props.task.listId,
              this.props.task.taskId
            )
          }
        >
          Delete
        </button>
      </div>
    )
  }
}
