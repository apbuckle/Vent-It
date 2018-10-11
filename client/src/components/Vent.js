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
  /* background-color: #00BBAA; */
  background-color: #00988b;
`
const StyledMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content:space-evenly;
  padding: 5px;
  margin: 20px;
  width: 70%;
`

const StyledLink = styled(Link)`
  border: solid #d32f2f;
  border-width: 0 15px 15px 0;
  display: inline-block;
  padding: 20px;
  transform: rotate(135deg);
  margin: 20px;
  box-shadow: 3px 3px 0 black;
  /* text-decoration: none;
  font-size: 6vw;
  color: black;
  margin: 20px; */
  `
const StyledH = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px;
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
  width: 50vw;
  padding: 15px;
  padding-top: 0px;
  margin: 20px;
  border-radius: 5px;
  box-shadow: 1.5vw 1.5vw 0 black;
  /* pre {
    margin: 0;
    padding: 0;
    outline: 0;
    border: 0;
  } */
  .expandingArea {
    position: relative;
    /* border: 1px solid black; */
  }
  textarea {
    font-size: 25px;
    box-sizing: border-box;
    width: 100%;
    height: 100px;
    background-color: #CFD8DC;
    border-radius: 5px;
  }
`

const StyledAdd = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px;
  font-size: 11.5vw;
  color: #d32f2f
  text-shadow: .3vw .3vw 0 black;
`
const StyledBurn = styled.div`
  margin: 2px;
  text-align: center;
  font-size: 3vw;
  background-color: #ff6659;
  border-radius: 5px;
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

          {/* <input type='text' name='title' placeholder='title' value={vent.title}
            onChange={(event) => this.handleChange(event, i)}
            onBlur={() => this.updateVent(i)} /> */}

            <div>
            <input type='text' name='description' placeholder='Message' value={vent.description}
            onChange={(event) => this.handleChange(event, i)}
            onBlur={() => this.updateVent(i)} /> 
            </div>



            <div class='expandingArea'>
              <pre><span></span></pre>
              <textarea>
              </textarea>
            </div>
            <StyledBurn onClick={() => this.handleDelete(vent._id)}> BURN </StyledBurn>
         
        </StyledVent>
      )
    })

    return (
      <StyledContainer>
        <StyledMenu>
        <StyledLink to='/category'>  </StyledLink> <StyledH>  {this.state.category.title} </StyledH>
        </StyledMenu>
          <StyledAdd onClick={this.handleNew}>+</StyledAdd>
        
        <StyledBoard>
          {ventsList}
        </StyledBoard>
      </StyledContainer>
    )
  }
}
