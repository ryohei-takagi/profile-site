import * as React from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material'

export interface Props {
  open: boolean
  onClose: () => void
}

const ContactError = (props: Props) => {
  const { open, onClose } = props

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        エラー
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          お問い合わせの送信中にエラーが発生しました。お手数が再送信をお願いします。
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

export default ContactError
