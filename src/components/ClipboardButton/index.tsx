import { useState } from 'react'
import { Check, Link } from 'phosphor-react'

import { useAuth } from '../../hooks/useAuth'
import * as S from './styles'

export function ClipboardButton() {
  const [copied, setCopied] = useState(false)
  const { user } = useAuth()

  const labelText = copied ? 'Copiado!' : 'Copiar URL'

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
    <S.Container>
      <S.ClipboardButton
        onClick={handleOpenUrl}
        onMouseLeave={handleMouseLeave}
        disabled={copied}
        aria-label={labelText}
      >
        {copied ? (
          <Check data-testid="icon-check" />
        ) : (
          <Link data-testid="icon-link" />
        )}
      </S.ClipboardButton>

      <S.Tooltip data-testid="tooltip">{labelText}</S.Tooltip>
    </S.Container>
  )
}
