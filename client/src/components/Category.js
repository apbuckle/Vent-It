import React, { Component } from 'react'
import axios from 'axios'
// import { StyledLink } from './SharedComponents'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #00988b;
`

const StyledH = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 25px;
  font-size: 13vw;
  text-shadow: .5vw .5vw 0 #d32f2f; 
  font-weight: bold;
`
const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items:center;
  text-align:center;
  margin: 10px;
  input {
    height: 35px;
    font-size: 2vw;
  } 
 `
const StyledText = styled.div`
  font-size: 7.5vw;
  text-shadow: .2vw .2vw 0 #d32f2f; 
  margin: 20px;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000000;
`

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px;
  line-height: 28px;
  text-align:center;
  font-size: 30px;
  background-color: #00988b;
  border: none;
`


export default class Category extends Component {
  state = {
    categories: [],
    newCategory: {
      title: ''
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
        <div key={i}>

          <StyledLink to={`/categories/${category._id}`}>
            + {category.title}
          </StyledLink>
        </div>
      )
    })

    return (
      <StyledContainer>
        <StyledH>
          Category
        </StyledH>
        <StyledForm onSubmit={this.handleSubmit}>
          <input
            type='text' name='title' placeholder='New Category'
            value={this.state.newCategory.title}
            onChange={this.handleChange} />
          <StyledButton type='submit'>+</StyledButton>
        </StyledForm>

        <StyledText>
          {categoriesList}
        </StyledText>
      </StyledContainer>
      
    )
  }
}