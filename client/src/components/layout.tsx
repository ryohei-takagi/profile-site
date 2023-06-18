import * as React from 'react'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  body {
    background-color: #F7F6F5;
    font-size: 62.5%;
    font-family: Noto Sans JP, sans-serif;
  }
  
  h1, h3, nav {
    font-family: Roboto Condensed, sans-serif;
  }
  
  
`

const Layout: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:700" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP" rel="stylesheet"/>
      <GlobalStyle />
      {children}
    </React.Fragment>
  )
}

export default Layout
