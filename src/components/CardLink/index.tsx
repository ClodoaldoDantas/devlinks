import { Link } from '../../interfaces/link'
import * as S from './styles'

export function CardLink({ data }: { data: Link }) {
  return (
    <S.Card>
      <S.CardBody>
        <strong>{data.label}</strong>
        <span>{data.url}</span>
      </S.CardBody>
    </S.Card>
  )
}
