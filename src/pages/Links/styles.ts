import { Button } from '../../components/Button'
import { styled } from '../../styles'

export const Container = styled('div', {
  maxWidth: '72rem',
  margin: '0 auto',
  padding: '0 1rem',
})

export const Header = styled('div', {
  padding: '2rem 0',

  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',

  h2: {
    fontSize: '$2xl',
    fontWeight: '$semibold',
    color: '$white',
  },
})

export const HeaderActions = styled('div', {
  maxWidth: 300,
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '1rem',
})

export const TriggerButton = styled(Button, {
  width: 200,
})

export const Loading = styled('div', {
  height: 'calc(100vh - 92px)',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const Links = styled('div', {
  display: 'grid',
  gap: '1rem',
})
