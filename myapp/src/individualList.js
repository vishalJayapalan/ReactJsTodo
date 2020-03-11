import React from 'react'

class IndividualList extends React.Component {
  render () {
    return (
      <div>
        <p>{this.props.list.listName}</p>
      </div>
    )
  }
}

export default IndividualList
