import React from 'react'
import List from './list'
import Task from './task'

class Todo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      inTask: null,
      listId: 2,
      taskId: 3,
      lists: [],
      listInput: false
    }
    // this.handleUpdateInput = this.handleUpdateInput.bind(this)
  }

  async componentDidMount () {
    const data = await window.fetch('http://localhost:5000/list', {
      method: 'get'
    })
    const jsonData = await data.json()
    this.setState({ lists: jsonData })
  }

  handleDeleteList (listId) {
    // listId
    const list = this.state.lists.filter(a => a._id != listId)
    this.setState({ lists: list })
    window.fetch(`http://localhost:5000/list/${listId}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  async handleCreateList (event) {
    const listName = event.target.value
    // console.log(listName)
    const response = await window.fetch('http://localhost:5000/list/', {
      method: 'POST',
      body: JSON.stringify({ listName: listName }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const jsonData = await response.json()
    const listId = jsonData.listId
    this.setState({
      lists: [
        ...this.state.lists,
        {
          _id: listId,
          listName: listName,
          tasks: []
        }
      ]
    })
    // event.target.value = ''
  }

  handleUpdateList (event, listId) {
    const listName = event.target.value
    const lists = this.state.lists.map(list => {
      if (list._id == listId) {
        list.listName = listName
      }
      return list
    })
    this.setState({ lists: lists })
    window.fetch(`http://localhost:5000/list/${listId}/`, {
      method: 'PUT',
      body: JSON.stringify({ listName: listName }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  openTask (listId) {
    this.setState({
      inTask: listId
    })
  }

  handleBack () {
    this.setState({ inTask: null })
  }

  async handleCreateTask (event) {
    const _id = this.state.inTask
    const taskName = event.target.value
    event.target.value = ''
    const response = await window.fetch(`http://localhost:5000/task/${_id}`, {
      method: 'POST',
      body: JSON.stringify({ taskName, listId: _id }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const jsonData = await response.json()
    const taskId = jsonData.taskId
    // console.log(taskId)
    const lists = this.state.lists
    for (const list of lists) {
      if (list._id == this.state.inTask) {
        list.tasks.push({
          taskId,
          taskName,
          checkbox: false,
          priority: 'none',
          date: false,
          listId: list._id,
          notes: ''
        })
      }
    }
    this.setState({ taskId, lists })
  }

  handleDeleteTask (_id, taskId) {
    const lists = this.state.lists
    const list = this.state.lists.find(l => {
      return l._id == _id
    })
    const listIndex = this.state.lists.findIndex(l => l._id == _id)
    list.tasks = list.tasks.filter(t => t.taskId != taskId)
    lists[listIndex] = list

    this.setState({
      lists
    })
    window.fetch(`http://localhost:5000/task/${_id}/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  handleUpdateTask (e, name, task) {
    const listId = task.listId
    const taskId = task.taskId
    // console.log(task)
    const lists = this.state.lists.slice()
    // const list = this.state.lists.find(l => l._id === listId)
    const listIndex = this.state.lists.findIndex(l => l._id === listId)
    const list = lists[listIndex]
    list.tasks = list.tasks.map(t => {
      if (t.taskId === taskId) {
        t[name] = e.target.value
      }
      return t
    })
    lists[listIndex] = list
    // console.log(lists)
    this.setState({
      lists
    })
    console.log(task)
    window.fetch(`http://localhost:5000/task/${listId}/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify({ task }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  handleUpdateTaskChecked (e) {
    console.log(e.target)
  }

  render () {
    let listOrTask
    if (this.state.inTask === null) {
      listOrTask = (
        <List
          lists={this.state.lists}
          listInput={this.state.listInput}
          handleDelete={listId => this.handleDeleteList(listId)}
          handleCreate={e => this.handleCreateList(e)}
          handleUpdate={(e, listId) => this.handleUpdateList(e, listId)}
          handleUpdateInput={e => this.handleUpdateInput(e)}
          handleOpenTask={e => this.openTask(e)}
        />
      )
    } else {
      let count
      let listName
      const list = this.state.lists.slice()
      for (let i = 0; i < list.length; i++) {
        if (this.state.lists[i]._id == this.state.inTask) {
          listName = this.state.lists[i].listName
          count = i
          break
        }
      }
      listOrTask = (
        <Task
          tasks={this.state.lists[count].tasks}
          listName={listName}
          handleBack={() => this.handleBack()}
          handleCreateTask={e => this.handleCreateTask(e)}
          deleteTask={(listId, taskId) => this.handleDeleteTask(listId, taskId)}
          updateTask={(e, name, task) => this.handleUpdateTask(e, name, task)}
          updateTaskChecked={e => this.handleUpdateTaskChecked(e)}
        />
      )
    }

    return <div>{listOrTask}</div>
  }
}

export default Todo
