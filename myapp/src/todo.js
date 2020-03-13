import React from 'react'
import List from './list'
import Task from './task'

class Todo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      inTask: null,
      // currentListId: 1,
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
              date: 'false',
              listId: 1,
              notes: ''
            }
          ]
        },
        {
          listId: 2,
          listName: 'weekEnd',
          inputToggle: true,
          tasks: [
            {
              taskId: 3,
              taskName: 'kerala',
              checkbox: 'false',
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
  }

  handleDeleteList (event) {
    const listId = event.target.parentNode.parentNode.id
    const list = this.state.lists.slice().filter(a => a.listId !== +listId)
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
        ]
      })
      event.target.value = ''
    }
  }

  handleUpdateInput (event) {
    const lists = this.state.lists.slice().map(a => {
      if (a.listId === +event.target.parentNode.parentNode.id) {
        a.inputToggle = !a.inputToggle
      }
      return a
    })
    this.setState({ lists: lists })
  }

  handleUpdateList (event) {
    if (event.target.value) {
      if (event.keyCode === 13) {
        const lists = this.state.lists.slice().map(a => {
          if (a.listId === +event.target.parentNode.parentNode.id) {
            a.inputToggle = !a.inputToggle
            a.listName = event.target.value
          }
          return a
        })
        this.setState({ lists: lists })
      }
    }
  }

  taskOpen (event) {
    // console.log(event.target)
    this.setState({ inTask: event.target.parentNode.id })
  }

  back (event) {
    this.setState({ inTask: null })
  }

  handleCreateTask (event) {
    if (event.keyCode === 13) {
      const taskId = this.state.taskId + 1
      const lists = this.state.lists.slice()
      for (const list of lists) {
        if (list.listId === +this.state.inTask) {
          console.log(list)
          list.tasks.push({
            taskId: this.state.taskId + 1,
            taskName: event.target.value,
            checkbox: 'false',
            priority: 'none',
            date: 'false',
            listId: list.listId,
            notes: ''
          })
        }
      }
      event.target.value = ''
      this.setState({ taskId: taskId })
      this.setState({ lists: lists })
    }
  }

  render () {
    let listOrTask
    if (this.state.inTask === null) {
      listOrTask = (
        <List
          lists={this.state.lists}
          listInput={this.state.listInput}
          handleDelete={e => this.handleDeleteList(e)}
          handleCreate={e => this.handleCreateList(e)}
          handleUpdate={e => this.handleUpdateList(e)}
          handleUpdateInput={e => this.handleUpdateInput(e)}
          handleTaskOpen={e => this.taskOpen(e)}
        />
      )
    } else {
      let count
      let listName
      const list = this.state.lists.slice()
      for (let i = 0; i < list.length; i++) {
        if (this.state.lists[i].listId === +this.state.inTask) {
          console.log(this.state.inTask)
          listName = this.state.lists[i].listName
          count = i
          break
        }
      }
      console.log(count)
      listOrTask = (
        <Task
          tasks={this.state.lists[count].tasks}
          listName={listName}
          handleBack={e => this.back(e)}
          handleCreateTask={e => this.handleCreateTask(e)}
        />
      )
    }

    return <div>{listOrTask}</div>
  }
}

export default Todo
