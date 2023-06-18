import * as React from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material'
import styled from 'styled-components'
import {nl2br} from '../utils/util'
import {useEffect, useState} from 'react'

export interface Props {
  open: boolean
  onSubmit: () => void
  onClose: () => void
  inputName: string
  inputMail: string
  inputBody: string
}

const P = styled.p`
  font-size: 1.5em;
`

const VUl = styled.ul`
  margin: 15px 0;
`

const VLi = styled.li`
  font-size: 1.25em;
  color: red;
`

const DefinitionList = styled.dl`
  font-size: 1.5em;
`

const DefinitionTerm = styled.dt`
  margin-top: 15px;
`

const DefinitionDescription = styled.dd`
  padding: 5px 0;
  font-weight: bold;
`

const ContactConfirm = (props: Props) => {
  const { open, onSubmit, onClose, inputName, inputMail, inputBody } = props

  const [validationOk, setValidationOk] = useState<boolean>(false)
  const [validationMessages, setValidationMessages] = useState<string[]>([])

  useEffect(() => {
    const hasName = inputName !== ""
    const hasMail = inputMail !== ""
    const hasBody = inputBody !== ""

    if (hasName && hasMail && hasBody) {
      setValidationOk(true)
      setValidationMessages([])
    } else {
      setValidationMessages(["入力されていない項目があります。"])
    }
  }, [inputName, inputMail, inputBody])

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        お問い合わせ送信
      </DialogTitle>
      <DialogContent>
        {validationMessages.length > 0 &&
          <VUl>
            {validationMessages.map(m => <VLi key={m}>{m}</VLi>)}
          </VUl>
        }
        <P>
          以下の内容で送信します。よろしいですか？
        </P>
        <DefinitionList>
            <DefinitionTerm>お名前</DefinitionTerm>
            <DefinitionDescription>{inputName}</DefinitionDescription>
            <DefinitionTerm>メールアドレス</DefinitionTerm>
            <DefinitionDescription>{inputMail}</DefinitionDescription>
            <DefinitionTerm>お問い合わせ内容</DefinitionTerm>
            <DefinitionDescription>{nl2br(inputBody)}</DefinitionDescription>
        </DefinitionList>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          いいえ
        </Button>
        {validationOk &&
          <Button onClick={onSubmit}>
            はい
          </Button>
        }
      </DialogActions>
    </Dialog>
  )
}

export default ContactConfirm
