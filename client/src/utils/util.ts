import React from 'react'

export const nl2br = (text: string) => {
  const regex = /(\n)/g
  return text.split(regex).map((line) => {
    return line.match(regex) ? React.createElement('br') : line
  })
}
