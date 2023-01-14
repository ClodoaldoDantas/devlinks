import { useEffect, useState } from 'react'
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

  return {
    links,
    isLoading,
    isError,
    error,
  }
}
