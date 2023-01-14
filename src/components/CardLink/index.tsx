import { Trash } from 'phosphor-react'
import { Link } from '../../interfaces/link'
import * as S from './styles'

interface CardLinkProps {
  data: Link
  onDelete: (link_id: string) => void
}

export function CardLink({ data, onDelete }: CardLinkProps) {
  return (
    <S.Card>
      <S.CardBody>
        <strong>{data.label}</strong>
        <span>{data.url}</span>
      </S.CardBody>

      <S.IconButton type="button" onClick={() => onDelete(data.id)}>
        <Trash size={24} />
      </S.IconButton>
    </S.Card>
  )
}
