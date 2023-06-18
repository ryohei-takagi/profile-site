import * as React from 'react'
import styled from 'styled-components'
import {pc, sp, tab} from '../styles/responsive'
import AnchorLink from 'react-anchor-link-smooth-scroll'

const Nav = styled.nav`
  position: fixed;
  z-index: 1;
  width: 100%;
  background-color: #F7F6F5;
  
  ${sp`
    font-size: 1.8em;
    text-align: center;
    padding: 25px 0;
  `}
  ${tab`
    font-size: 2em;
    text-align: center;
    padding: 25px 0;
  `}
  ${pc`
    font-size: 2.5em;
    text-align: right;
    right: 0;
    padding: 25px;
  `}
`

const Anchor = styled(AnchorLink)`
  display: inline-block;
  color: inherit;
  text-decoration: none;
  
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  
  &:active {
    color: #999999;
    text-decoration: underline;
  }
  
  ${sp`
    margin: 0 8px;
  `}
  ${tab`
    margin: 0 10px;
  `}
  ${pc`
    margin: 0 15px;
  `}
`

const Profile = () => {
  return (
    <Nav>
      <Anchor href="#profile">PROFILE</Anchor>
      <Anchor href="#skill">SKILL</Anchor>
      <Anchor href="#contact">CONTACT</Anchor>
    </Nav>
  )
}

export default Profile
