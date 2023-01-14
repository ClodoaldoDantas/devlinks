import { useCallback, useEffect, useState } from 'react'
import { http } from '../services/http'

export function useFetch<T = unknown>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const doFetch = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await http.get(url)
      setData(response.data)
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }, [url])

  useEffect(() => {
    doFetch()
  }, [doFetch])

  return { data, isLoading, isError: !!error, error, doFetch }
}
