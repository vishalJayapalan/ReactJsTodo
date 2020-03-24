import React from 'react'
import TaskFeatures from './taskFeatures'

export default class IndividualTask extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showTaskFeatures: false
    }
  }

  render () {
    return (
      <div className='individualTask'>
        <div className='task'>
          <input
            className='done'
            type='checkbox'
            onChange={e => this.props.updateTaskChecked(e)}
          />
          <p className='taskName'>{this.props.task.taskName}</p>
          <i
            className='fas fa-angle-down'
            onClick={() =>
              this.setState({ showTaskFeatures: !this.state.showTaskFeatures })
            }
          />
        </div>
        <hr />
        {this.state.showTaskFeatures && (
          <TaskFeatures
            task={this.props.task}
            deleteTask={this.props.deleteTask}
            updateTask={this.props.updateTask}
          />
        )}
      </div>
    )
  }
}
