import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #00BBAA;
`
const StyledText = styled.div`
  font-size: 25vw;
  text-shadow: .7vw .7vw 0 #d32f2f; 
  font-weight: bold;
`
const StyledLink = styled(Link)`
text-decoration: none;
color: #000000;
`

export default class Home extends Component {
  render() {
    return (
      <StyledContainer>
        <StyledText>
        <StyledLink to='/category'>Vent-It</StyledLink>
        </StyledText>
      </StyledContainer>
    )
  }
}
