import { act, renderHook, waitFor } from '@testing-library/react'
import { AllTheProviders } from '../utils/test-utils'
import { server } from '../mocks/server'
import {
  getLinksRequestFailure,
  postLinksRequestFailure,
  deleteLinkRequestFailure,
} from '../mocks/handlers'

import { useLinks } from './useLinks'

const renderUseLinksHook = () => {
  const { result } = renderHook(() => useLinks(), {
    wrapper: AllTheProviders,
  })

  return { result }
}

const payload = {
  label: 'Portfolio',
  url: 'http://example.com',
}

describe('useLinks hook', () => {
  it('should return initial state', () => {
    const { result } = renderUseLinksHook()

    expect(result.current.isLoading).toBe(true)
    expect(result.current.isError).toBe(false)
    expect(result.current.error).toBeNull()
    expect(result.current.links).toEqual([])
  })

  it('should return links', async () => {
    const { result } = renderUseLinksHook()

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
      expect(result.current.isError).toBe(false)
      expect(result.current.error).toBeNull()
      expect(result.current.links).toHaveLength(2)
    })
  })

  it('should set error when request fails', async () => {
    server.use(getLinksRequestFailure)
    const { result } = renderUseLinksHook()

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
      expect(result.current.isError).toBe(true)
      expect(result.current.error).not.toBeNull()
      expect(result.current.links).toEqual([])
    })
  })

  it('should create a new link', async () => {
    const { result } = renderUseLinksHook()

    act(() => {
      result.current.createLink(payload)
    })

    await waitFor(() => {
      expect(result.current.links).toHaveLength(3)
    })
  })

  it('should return error when creating a link fails', () => {
    server.use(postLinksRequestFailure)
    const { result } = renderUseLinksHook()

    expect(async () => {
      await result.current.createLink(payload)
    }).rejects.toThrow('Não foi possível adicionar o link')
  })

  it('should delete link', async () => {
    const { result } = renderUseLinksHook()

    act(() => {
      result.current.deleteLink('1')
    })

    await waitFor(() => {
      expect(result.current.links).toHaveLength(1)
    })
  })

  it('should return error if delete link fails', async () => {
    server.use(deleteLinkRequestFailure)
    const { result } = renderUseLinksHook()

    expect(async () => {
      await result.current.deleteLink('1')
    }).rejects.toThrow('Não foi possível remover o link')
  })
})
