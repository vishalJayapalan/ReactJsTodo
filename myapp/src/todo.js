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
      lists: [
        {
          listId: 1,
          listName: 'shoppingList',
          inputToggle: true,
          tasks: [
            {
              taskId: 1,
              taskName: 'apple',
              checkbox: 'false',
              priority: 'none',
              date: 'false',
              listId: 1,
              notes: ''
            },
            {
              taskId: 2,
              taskName: 'orange',
              checkbox: 'false',
              priority: 'none',
              date: false,
              listId: 1,
              notes: ''
            }
          ]
        },
        {
          listId: 2,
          listName: 'Today',
          inputToggle: true,
          tasks: [
            {
              taskId: 3,
              taskName: 'Tasks',
              checkbox: false,
              priority: 'none',
              date: 'false',
              listId: 2,
              notes: ''
            }
          ]
        }
      ],
      listInput: false
    }
    // this.handleUpdateInput = this.handleUpdateInput.bind(this)
  }

  handleDeleteList (listId) {
    // listId
    const list = this.state.lists.filter(a => a.listId !== +listId)
    this.setState({ lists: list })
  }

  handleCreateList (event) {
    if (event.target.className === 'createListBtn') {
      this.setState({ listInput: !this.state.listInput })
    }
    if (event.keyCode === 13) {
      this.setState({
        listId: this.state.listId + 1,
        lists: [
          ...this.state.lists,
          {
            listId: this.state.listId + 1,
            listName: event.target.value,
            inputToggle: true,
            tasks: []
          }
        ],
        listInput: false
      })
      event.target.value = ''
    }
  }

  handleUpdateInput (listId) {
    // listId
    const lists = this.state.lists.map(a => {
      if (a.listId === +listId) {
        a.inputToggle = !a.inputToggle
      }
      return a
    })
    this.setState({ lists: lists })
  }

  handleUpdateList (event, listId) {
    // event , listId
    if (event.target.value) {
      if (event.keyCode === 13) {
        const lists = this.state.lists.map(list => {
          if (list.listId === +listId) {
            list.inputToggle = !list.inputToggle
            list.listName = event.target.value
          }
          return list
        })
        this.setState({ lists: lists })
      }
    }
  }

  openTask (listId) {
    this.setState({
      inTask: listId
    })
  }

  handleBack () {
    this.setState({ inTask: null })
  }

  handleCreateTask (event) {
    if (event.keyCode === 13) {
      const taskId = this.state.taskId + 1
      const lists = this.state.lists.slice()
      for (const list of lists) {
        if (list.listId === +this.state.inTask) {
          list.tasks.push({
            taskId: this.state.taskId + 1,
            taskName: event.target.value,
            checkbox: false,
            priority: 'none',
            date: false,
            listId: list.listId,
            notes: ''
          })
        }
      }
      event.target.value = ''
      this.setState({ taskId: taskId, lists: lists })
    }
  }

  handleDeleteTask (listId, taskId) {
    const lists = this.state.lists.slice()

    const list = this.state.lists.find(l => l.listId === listId)
    const listIndex = this.state.lists.findIndex(l => l.listId === listId)

    list.tasks = list.tasks.filter(t => t.taskId !== taskId)
    lists[listIndex] = list

    this.setState({
      lists
    })
  }

  handleUpdateTask (e, name, task) {
    // console.log(e.target.value, name, task.taskId, task.listId)
    const listId = task.listId
    const taskId = task.taskId

    const lists = this.state.lists.slice()
    // console.log(lists)

    const list = this.state.lists.find(l => l.listId === listId)
    const listIndex = this.state.lists.findIndex(l => l.listId === listId)
    // console.log(list, listIndex)
    // console.log(list.tasks)
    // // list.tasks = list.tasks.filter(t => t.taskId !== taskId)
    list.tasks = list.tasks.map(t => {
      // console.log(t)
      if (t.taskId === taskId) {
        t[name] = e.target.value
      }
      return t
    })
    // console.log(list.tasks)
    lists[listIndex] = list
    console.log(lists)
    this.setState({
      lists
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
        if (this.state.lists[i].listId === +this.state.inTask) {
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
