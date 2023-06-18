import * as React from 'react'
import styled from 'styled-components'
import {pc, sp, tab} from '../styles/responsive'
import {useCallback, useEffect, useState} from 'react'
import ContactConfirm from './contact_confirm'
import ContactComplete from './contact_complete'
import ContactError from './contact_error'

const Wrap = styled.section`
  position: relative;
  width: 100%;
  margin-bottom: 25px;
`

const H3 = styled.h3`
  font-weight: bold;
  padding-top: 100px;
  
  ${sp`
    font-size: 5em;
    text-align: center;
  `}
  ${tab`
    font-size: 6em;
    text-align: center;
  `}
  ${pc`
    font-size: 6em;
    padding-left: 150px;
  `}
`

const DefinitionList = styled.dl<{ width: number }>`
  height: 520px;

  ${sp`
    margin: 25px 45px 0 45px;
  `}
  ${tab`
    margin: 25px 125px 0 125px;
  `}
  ${pc`
    margin: 50px 0 0 150px;
    max-width: ${({width}) => width / 2}px;
  `}
`

const Field = styled.div`
  position: relative;
  margin-top: 15px;
`

const DefinitionTerm = styled.dt`
  padding: 5px 0;
  font-size: 1.5em;
`

const DefinitionDescription = styled.dd`
  height: 30px;
`

const InputField = styled.input`
  position: absolute;
  left 0;
  right: 0;
  margin 0 auto;
  height: 30px;
  border: 0px;
  border-radius: 5px;
`

const TextArea = styled.textarea`
  position: absolute;
  left 0;
  right: 0;
  margin 0 auto;
  height: 350px;
  border: 0px;
  border-radius: 5px;
  resize: none;
`

const Sub = styled.sub`
  font-size: 0.75em;
  color: red;
`

const ButtonArea = styled.div`
  position: relative;
  margin-top: 15px;
  height: 50px;
`

const SubmitButton = styled.button<{ width: number }>`
  position: absolute;
  left 0;
  right: 0;
  margin 0 auto;
  height: 50px;
  border: 0px;
  border-radius: 5px;
  background-color: #D4D9DF;
  color: #454545;
  font-size: 1.75em;
  
  &:hover {
    cursor: pointer;
    color: #787878;
  }
  
  ${sp`
    margin: 10px 45px 0 45px;
  `}
  ${tab`
    margin: 10px 125px 0 125px;
  `}
  ${pc`
    margin: 10px 0 0 150px;
    max-width: ${({width}) => width / 2}px;
  `}
`

const Contact = () => {
  const [width, setWidth] = useState<number>(0)
  const [rendered, setRendered] = useState<boolean>(false)
  const [name, setName] = useState<string>("")
  const [mail, setMail] = useState<string>("")
  const [body, setBody] = useState<string>("")
  const [confirm, setConfirm] = useState<boolean>(false)
  const [complete, setComplete] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    setWidth(document.documentElement.clientWidth)
    setRendered(true)

    window.addEventListener("resize", () => {
      setWidth(document.documentElement.clientWidth)
    })

    return () => {
      window.removeEventListener("resize", () => {})
    }
  }, [])

  const onSubmit = useCallback(async() => {
    setConfirm(false)

    const data = {
      "name": name,
      "mail": mail,
      "body": body,
    }

    try {
      await fetch("https://api.ryohei-takagi.me/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      setComplete(true)
      setName("")
      setMail("")
      setBody("")
    } catch (err) {
      setError(true)
    }
  }, [name, mail, body])

  return (
    rendered ?
      <Wrap id="contact">
        <H3>CONTACT</H3>
        <DefinitionList width={width}>
          <Field>
            <DefinitionTerm>お名前<Sub>※</Sub></DefinitionTerm>
            <DefinitionDescription>
              <InputField type="text" onChange={(event) => setName(event.target.value)} value={name} />
            </DefinitionDescription>
          </Field>
          <Field>
            <DefinitionTerm>メールアドレス<Sub>※</Sub></DefinitionTerm>
            <DefinitionDescription>
              <InputField type="text" onChange={(event) => setMail(event.target.value)} value={mail} />
            </DefinitionDescription>
          </Field>
          <Field>
            <DefinitionTerm>お問い合わせ内容<Sub>※</Sub></DefinitionTerm>
            <DefinitionDescription>
              <TextArea onChange={(event) => setBody(event.target.value)} value={body} />
            </DefinitionDescription>
          </Field>
        </DefinitionList>
        <ButtonArea>
          <SubmitButton width={width} onClick={() => setConfirm(true)}>送信</SubmitButton>
        </ButtonArea>
        <ContactConfirm
          open={confirm}
          onSubmit={onSubmit}
          onClose={() => setConfirm(false)}
          inputName={name}
          inputMail={mail}
          inputBody={body}
        />
        <ContactComplete
          open={complete}
          onClose={() => setComplete(false)}
        />
        <ContactError
          open={error}
          onClose={() => setError(false)}
        />
      </Wrap> :
      <></>
  )
}

export default Contact
