import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://localhost:3333/',
})

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@devlinks:token')

    if (!config.headers) {
      config.headers = {}
    }

    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      }
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
