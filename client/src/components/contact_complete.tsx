import * as React from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material'

export interface Props {
  open: boolean
  onClose: () => void
}

const ContactComplete = (props: Props) => {
  const { open, onClose } = props

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        お問い合わせ完了
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          お問い合わせを送信しました。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ContactComplete
