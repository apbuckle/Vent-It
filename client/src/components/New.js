import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class New extends Component {
  render() {
    return (
      <div>
        hello
        <Link to='/'>Return</Link>
      </div>
    )
  }
}
