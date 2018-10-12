import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import Category from './components/Category'
import Vent from './components/Vent'


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/category' component={Category} />
          <Route exact path='/categories/:categoryId' component={Vent} />
        </Switch>
      </Router>
    )
  }
}

export default App
