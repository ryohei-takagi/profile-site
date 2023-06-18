import * as React from "react"
import { navigate } from 'gatsby'
import {useEffect} from 'react'

const NotFoundPage = () => {
  useEffect(() => {
    navigate('/')
  }, [])

  return null
}

export default NotFoundPage
