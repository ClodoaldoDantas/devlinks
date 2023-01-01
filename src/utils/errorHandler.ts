import axios from 'axios'
import toast from 'react-hot-toast'

export function errorHandler(err: unknown) {
  // eslint-disable-next-line no-console
  console.error(err)

  if (axios.isAxiosError(err)) {
    toast.error(err.response?.data.message)
  }
}
