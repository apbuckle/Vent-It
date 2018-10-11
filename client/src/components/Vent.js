import React, { Component } from 'react'
import axios from 'axios'
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
  background-color: #00BBAA;
`
const StyledH = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 25px;
  font-size: 12vw;
  text-shadow: .4vw .4vw 0 #d32f2f; 
  font-weight: bold;
`
const StyledBoard = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 70vw;
  padding: 10px;
  flex-wrap: wrap;
`

const StyledVent = styled.div`
  background-color: #9a0007;
  max-width: 150px;
  padding: 15px;
  padding-top: 0px;
  margin: 15px;
  pre {
    margin: 0;
    padding: 0;
    outline: 0;
    border: 0;
  }
  .expandingArea {
    position: relative;
    border: 1px solid black;
  }
  textarea {
    box-sizing: border-box;
    width: 100%;
    height: 100px;
  }

`
const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 3vw;
  color: Black;
  `
const StyledAdd = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px;
  font-size: 10vw;
  text-shadow: .2vw .2vw 0 #d32f2f;
`




export default class Vent extends Component {
  state = {
    category: {},
    vents: []
  }

  getCategory = async () => {
    const categoryId = this.props.match.params.categoryId
    const response = await axios.get(`/api/categories/${categoryId}`)
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
    await axios.post(`/api/categories/${categoryId}/vent`)
    await this.getCategory()
  }

  handleDelete = async (ventId) => {
    const categoryId = this.props.match.params.categoryId
    await axios.delete(`/api/categories/${categoryId}/vent/${ventId}`)
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
    await axios.put(`/api/categories/${categoryId}/vent/${updatedVent._id}`, updatedVent)
  }

  render() {
    const ventsList = this.state.vents.map((vent, i) => {
      return (
        <StyledVent key={i}>
          {/* <StyledNav onClick={() => this.handleDelete(vent._id)}> - </StyledNav> */}

          {/* <input type='text' name='title' placeholder='title' value={vent.title}
            onChange={(event) => this.handleChange(event, i)}
            onBlur={() => this.updateVent(i)} /> */}
          
            <div class='expandingArea'>
              <pre><span></span></pre>
              <textarea></textarea>
            </div>

          {/* <input type='text' name='description' placeholder='Message' value={vent.description}
            onChange={(event) => this.handleChange(event, i)}
            onBlur={() => this.updateVent(i)} /> */}
         
        </StyledVent>
      )
    })

    return (
      <StyledContainer>
        <StyledH> : {this.state.category.title}</StyledH>
        <div>
          <StyledAdd onClick={this.handleNew}>+</StyledAdd>
        </div>
        <StyledBoard>
          {ventsList}
        </StyledBoard>
        <StyledLink to='/category'> Back </StyledLink>
      </StyledContainer>
    )
  }
}
