import * as React from 'react'
import styled from 'styled-components'

const Wrap = styled.section`
  position: relative;
`

const Text = styled.div`
  text-align: center;
  padding: 15px;
  font-size: 1.25em;
  color: #454545;
`

const Footer = () => {
  return (
    <Wrap>
      <Text>
        Copyright &copy; ryohei-takagi. All rights reserved.
      </Text>
    </Wrap>
  )
}

export default Footer
