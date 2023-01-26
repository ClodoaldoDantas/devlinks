import { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Dialog from '@radix-ui/react-dialog'

import { NewLinkModal } from '.'
import { vi } from 'vitest'
import { render, screen, userEvent } from '../../../utils/test-utils'
import { NewLinkFormData, newLinkFormSchema } from '..'
import { zodResolver } from '@hookform/resolvers/zod'

const onSubmitFn = vi.fn()

const Wrapper = ({ children }: { children: ReactNode }) => {
  const methods = useForm<NewLinkFormData>({
    resolver: zodResolver(newLinkFormSchema),
    defaultValues: {
      label: '',
      url: '',
    },
  })

  return (
    <FormProvider {...methods}>
      <Dialog.Root open>{children}</Dialog.Root>
    </FormProvider>
  )
}

const renderNewLinkModal = () => {
  render(
    <Wrapper>
      <NewLinkModal onSubmit={onSubmitFn} />
    </Wrapper>,
  )
}

describe('NewLinkModal component', () => {
  it('should render correctly', () => {
    renderNewLinkModal()

    expect(screen.getByText('Novo Link')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Label')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('URL')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /salvar/i })).toBeInTheDocument()
  })

  it('should validate form fields', async () => {
    renderNewLinkModal()

    const button = screen.getByRole('button', { name: /salvar/i })
    await userEvent.click(button)

    expect(screen.getAllByRole('alert')).toHaveLength(2)
  })

  it('should submit form when fields is valid', async () => {
    renderNewLinkModal()

    const inputLabel = screen.getByPlaceholderText('Label')
    const inputURL = screen.getByPlaceholderText('URL')
    const button = screen.getByRole('button', { name: /salvar/i })

    await userEvent.type(inputLabel, 'website')
    await userEvent.type(inputURL, 'https://johdoe.com')
    await userEvent.click(button)

    expect(onSubmitFn).toHaveBeenCalledTimes(1)
  })
})
