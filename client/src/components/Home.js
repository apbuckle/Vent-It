import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>Vent-It</h1>
        <h2>Categories</h2>
        <ul>
          <li><Link to=''>Traffic</Link></li>
          <li><Link to=''>Work</Link></li>
          <li><Link to=''>Friends</Link></li>
          <li><Link to=''>Relationships</Link></li>
          <li><Link to=''>Misc</Link></li>
          <li><Link to=''>Life</Link></li>
          <li><Link to=''>Make a new category</Link></li>



        </ul>
      </div>
    )
  }
}
