import { vi } from 'vitest'
import { Links } from '.'
import { server } from '../../mocks/server'
import {
  deleteLinkRequestFailure,
  getLinksRequest,
  getLinksRequestFailure,
  postLinksRequestFailure,
} from '../../mocks/handlers'

import { render, screen, userEvent, waitFor } from '../../utils/test-utils'
import * as useLinks from '../../hooks/useLinks'
import { linksMock } from '../../mocks/data'

describe('Links page', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('should render loading', () => {
    render(<Links />)
    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  it('should render correctly', async () => {
    server.use(getLinksRequest)
    render(<Links />)

    await waitFor(() => {
      expect(screen.getByText('🔗 Meus Links')).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /adicionar novo/i }),
      ).toBeInTheDocument()
    })
  })

  it('should render 2 links', async () => {
    server.use(getLinksRequest)
    render(<Links />)

    expect(await screen.findAllByTestId('card-link')).toHaveLength(2)
  })

  it('should display error if links request fails', async () => {
    server.use(getLinksRequestFailure)
    render(<Links />)

    expect(
      await screen.findByText('Não foi possível buscar os links'),
    ).toBeInTheDocument()
  })

  it('should open modal', async () => {
    server.use(getLinksRequest)
    render(<Links />)

    const button = await screen.findByRole('button', {
      name: /adicionar novo/i,
    })

    await userEvent.click(button)

    expect(screen.getByText('Novo Link')).toBeInTheDocument()
  })

  it('should create a link', async () => {
    const createLinkFn = vi.fn()

    vi.spyOn(useLinks, 'useLinks').mockReturnValue({
      createLink: createLinkFn,
    } as any)

    server.use(getLinksRequest)
    render(<Links />)

    const button = await screen.findByRole('button', {
      name: /adicionar novo/i,
    })

    await userEvent.click(button)

    const inputLabel = screen.getByPlaceholderText('Label')
    const inputURL = screen.getByPlaceholderText('URL')
    const submitButton = screen.getByRole('button', { name: /salvar/i })

    await userEvent.type(inputLabel, 'website')
    await userEvent.type(inputURL, 'https://johdoe.com')
    await userEvent.click(submitButton)

    expect(createLinkFn).toHaveBeenCalled()
    expect(
      await screen.findByText('Link adicionado com sucesso'),
    ).toBeInTheDocument()
  })

  it('should display error if create link fails', async () => {
    server.use(getLinksRequest)
    server.use(postLinksRequestFailure)

    render(<Links />)

    const button = await screen.findByRole('button', {
      name: /adicionar novo/i,
    })

    await userEvent.click(button)

    const inputLabel = screen.getByPlaceholderText('Label')
    const inputURL = screen.getByPlaceholderText('URL')
    const submitButton = screen.getByRole('button', { name: /salvar/i })

    await userEvent.type(inputLabel, 'website')
    await userEvent.type(inputURL, 'https://johdoe.com')
    await userEvent.click(submitButton)

    expect(
      await screen.findByText('Não foi possível adicionar o link'),
    ).toBeInTheDocument()
  })

  it('should remove a link', async () => {
    const deleteLinkFn = vi.fn()

    vi.spyOn(useLinks, 'useLinks').mockReturnValue({
      links: linksMock,
      deleteLink: deleteLinkFn,
    } as any)

    vi.spyOn(window, 'confirm').mockImplementation(() => true)

    server.use(getLinksRequest)
    render(<Links />)

    const [deleteButton] = await screen.findAllByRole('button', {
      name: /deletar link/i,
    })

    await userEvent.click(deleteButton)

    expect(deleteLinkFn).toHaveBeenCalled()
    expect(
      await screen.findByText('Link removido com sucesso'),
    ).toBeInTheDocument()
  })

  it('should cancel delete link if window.confirm equals false', async () => {
    const deleteLinkFn = vi.fn()

    vi.spyOn(useLinks, 'useLinks').mockReturnValue({
      links: linksMock,
      deleteLink: deleteLinkFn,
    } as any)

    vi.spyOn(window, 'confirm').mockImplementation(() => false)

    server.use(getLinksRequest)
    render(<Links />)

    const [deleteButton] = await screen.findAllByRole('button', {
      name: /deletar link/i,
    })

    await userEvent.click(deleteButton)
    expect(deleteLinkFn).not.toHaveBeenCalled()
  })

  it('should display error if delete link fails', async () => {
    vi.spyOn(window, 'confirm').mockImplementation(() => true)

    server.use(getLinksRequest)
    server.use(deleteLinkRequestFailure)
    render(<Links />)

    const [deleteButton] = await screen.findAllByRole('button', {
      name: /deletar link/i,
    })

    await userEvent.click(deleteButton)

    expect(
      await screen.findByText('Não foi possível remover o link'),
    ).toBeInTheDocument()
  })
})
