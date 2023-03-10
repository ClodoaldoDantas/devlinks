import axios from 'axios'
import { toast } from 'react-toastify'

export const defaultErrorMessage =
  'Ocorreu um problema. Tente novamente mais tarde!'

export function errorHandler(err: any) {
  // eslint-disable-next-line no-console
  // console.error(err)

  if (axios.isAxiosError(err)) {
    toast.error(err.response?.data.message ?? defaultErrorMessage)
  }
}
