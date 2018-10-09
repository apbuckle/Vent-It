import React, { Component } from 'react'
import axios from 'axios'
import { StyledLink } from './SharedComponents'

export default class Login extends Component {
  state = {
    categories: [],
    newCategory: {
      categoryTitle: ''
    }
  }

  componentDidMount = async () => {
    const response = await axios.get('/api/categories')
    this.setState({ categories: response.data })
  }

  handleChange = (event) => {
    const newCategory = { ...this.state.newCategory }
    newCategory[event.target.name] = event.target.value
    this.setState({ newCategory })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const response = await axios.post('/api/categories', this.state.newCategory)

    const categories = [...this.state.categories]
    categories.push(response.data)
    this.setState({ categories })
  }

  render() {
    const categoriesList = this.state.categories.map((category, i) => {
      return (
        <div>
          <StyledLink to={`/categories/${category._id}`} key={i}>
            Name: {category.categoryTitle}
          </StyledLink>
        </div>
      )
})

    return (
      <div>
        <h1>Category</h1>
        {categoriesList}
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='categoryTitle'
            value={this.state.newCategory.categoryTitle}
            onChange={this.handleChange} />
          <input type='submit' value='Create New Category' />
        </form>
      </div>
    )
  }
}