import React, { Component } from 'react'
import axios from 'axios'
// import styled from 'styled-components'
import { StyledLink } from './SharedComponents'



export default class Vent extends Component {
  state = {
    category: {},
    vents: []
  }

  getCategory = async () => {
    const categoryId = this.props.match.params.categoryId
    const response = await axios.get(`/categories/${categoryId}`)
    this.setState({
      category: response.data,
      vents: response.data.vents.reverse()
    })
  }

  componentDidMount = () => {
    this.getCategory()
  }

  handleNew = async () => {
    const categoryId = this.props.match.params.categoryId
    await axios.post(`/api/categories/${categoryId}/vents`)
    await this.getCategory()
  }

  handleDelete = async (ventId) => {
    const categoryId = this.props.match.params.categoryId
    await axios.delete(`/api/categories/${categoryId}/vents/${ventId}`)
    await this.getCategory()
  }

  handleChange = (event, i) => {
    const vents = [...this.state.vents]
    vents[i][event.target.name] = event.target.value
    this.setState({ vents })
  }

  updateVent = async (i) => {
    const categoryId = this.props.match.params.categoryId
    const updatedVent = this.state.vents[i]
    await axios.put(`/api/categories/${categoryId}/vents/${updatedVent._id}`, updatedVent)
  }

  render() {
    const ventsList = this.state.vents.map((vent, i) => {
      return (
        <div key={i}>
          <div onClick={() => this.handleDelete(vent._id)}> X </div>

          <input type='text' name='title' value={vent.title}
            onChange={(event) => this.handleChange(event, i)}
            onBlur={() => this.updateVent(i)} />

          <input type='text' name='description' value={vent.description}
            onChange={(event) => this.handleChange(event, i)}
            onBlur={() => this.updateVent(i)} />
        </div>
      )
    })

    return (
      <div>
        <h1> : {this.state.category.categoryName}</h1>
        <div>
          <div onClick={this.handleNew}>New Vent</div>
        </div>
        <div>
          {ventsList}
        </div>
        <StyledLink to='/category'>Return to category</StyledLink>
      </div>
    )
  }
}
