import { useState } from 'react'
import { Check, Link } from 'phosphor-react'

import { useAuth } from '../../hooks/useAuth'
import * as S from './styles'

export function ClipboardButton() {
  const [copied, setCopied] = useState(false)
  const { user } = useAuth()

  function handleOpenUrl() {
    const { protocol, host } = window.location
    const pageUrl = `${protocol}//${host}/${user?.username}`

    navigator.clipboard.writeText(pageUrl)
    setCopied(true)
  }

  function handleMouseLeave() {
    setCopied(false)
  }

  return (
    <S.ClipboardButton
      onClick={handleOpenUrl}
      onMouseLeave={handleMouseLeave}
      disabled={copied}
    >
      {copied ? <Check /> : <Link />}
    </S.ClipboardButton>
  )
}
