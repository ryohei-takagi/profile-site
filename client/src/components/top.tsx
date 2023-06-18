import * as React from 'react'
import styled from 'styled-components'
import {pc, sp, tab} from '../styles/responsive'
import {useCallback, useEffect, useState} from 'react'

const Wrap = styled.section<{ height: number }>`
  position: relative;
  width: 100%;
  height: ${({height}) => height}px;
`

const H1 = styled.h1`
  position: absolute;
  width: 100%;
  top: 0;
  right: 0;
  left: 0;
  margin: auto;
  text-align: center;
  font-weight: bold;
  
  ${sp`
    height: 70px;
    line-height: 70px;
    bottom: 70px;
    font-size: 7em;
  `}
  ${tab`
    height: 100px;
    line-height: 100px;
    bottom: 100px;
    font-size: 10em;
  `}
  ${pc`
    height: 100px;
    line-height: 100px;
    bottom: 0;
    font-size: 10em;
  `}
`

const FirstName = styled.span`
  ${sp`
    display: block;
  `}
  ${tab`
    display: block;
  `}
  ${pc`
    margin: 0 15px;
  `}
`

const LastName = styled.span`
  ${sp`
    display: block;
  `}
  ${tab`
    display: block;
  `}
  ${pc`
    margin: 0 0;
  `}
`

const H2 = styled.h2`
  position: absolute;
  width: 100%;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  text-align: center;
  font-weight: thin;
  
  ${sp`
    top: 175px;
    height: 18px;
    line-height: 18px;
    font-size: 1.5em;
  `}
  ${tab`
    top: 245px;
    height: 25px;
    line-height: 25px;
    font-size: 2.25em;
  `}
  ${pc`
    top: 145px;
    height: 35px;
    line-height: 35px;
    font-size: 3.5em;
  `}
`

const SubTitle = styled.div<{ isTyping: boolean }>`
  ${({isTyping}) => isTyping ? `
    @keyframes blink {
      0% {background-color: currentColor}
      50% {background-color: currentColor}
      51% {background-color: rgba(0,0,0,0)}
      100% {background-color: rgba(0,0,0,0)}
    }
    &:after {
      content: '';
      display: inline-block;
      vertical-align: -0.15em;
      margin-left: 0.1em;
      width: 1px;
      animation: blink 0.3s infinite alternate;
    }
    
    ${sp`
      &:after {
        height: 18px;
      }
    `}
    ${tab`
      &:after {
        height: 25px;
      }
    `}
    ${pc`
      &:after {
        height: 35px;
      }
    `}
  ` : ""
  }
`

const text1st = "DevOps Engineer"
const text2nd = " & Architect"

const Top = () => {
  const [height, setHeight] = useState<number>(0)
  const [rendered, setRendered] = useState<boolean>(false)
  const [subTitle, setSubTitle] = useState<string>("")
  const [isTyping, setIsTyping] = useState<boolean>(false)

  const setChar = useCallback((charItr: IterableIterator<string>) => {
    const nextChar = charItr.next()
    if (nextChar.done) {
      return
    }

    setSubTitle(current => current + nextChar.value)

    const rand = Math.random() * 50
    setTimeout(() => setChar(charItr), 50 + rand)
  }, [])

  useEffect(() => {
    setHeight(document.documentElement.clientHeight)
    setRendered(true)

    window.addEventListener("resize", () => {
      setHeight(document.documentElement.clientHeight)
    })

    return () => {
      window.removeEventListener("resize", () => {})
    }
  }, [])

  useEffect(() => {
    setSubTitle("")
    setIsTyping(true)
    const charItr = text1st[Symbol.iterator]()
    setChar(charItr)
  }, [setChar])

  useEffect(() => {
    if (subTitle == text1st) {
      const charItr = text2nd[Symbol.iterator]()
      setTimeout(() => setChar(charItr), 500)
    }
  }, [setChar, subTitle])

  useEffect(() => {
    if (subTitle == `${text1st}${text2nd}`) {
      setIsTyping(false)
    }
  }, [subTitle])

  return (
    rendered ?
      <Wrap height={height}>
        <H1>
          <FirstName>Ryohei's</FirstName>
          <LastName>Profile</LastName>
        </H1>
        <H2>
          <SubTitle isTyping={isTyping}>{subTitle}</SubTitle>
        </H2>
      </Wrap> :
      <></>
  )
}

export default Top
