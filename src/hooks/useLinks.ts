import { useCallback, useEffect, useState } from 'react'
import { Link } from '../interfaces/link'
import { http } from '../services/http'

export function useLinks() {
  const [links, setLinks] = useState<Link[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<any>(null)
  const isError = !!error

  useEffect(() => {
    http
      .get('links')
      .then((response) => setLinks(response.data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false))
  }, [])

  const createLink = useCallback(async (data: Omit<Link, 'id'>) => {
    try {
      const response = await http.post<Link>('links', data)
      const link = response.data

      setLinks((state) => [...state, link])
    } catch {
      throw new Error('Não foi possível adicionar o link')
    }
  }, [])

  return {
    links,
    isLoading,
    isError,
    error,
    createLink,
  }
}
