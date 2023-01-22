import { rest } from 'msw'
import { http } from '../services/http'
import { linksMock, userMock } from './data'

const baseURL = http.defaults.baseURL
const networkErrorMessage = 'Failed to connect'

/* Request Success */
const signInRequest = rest.post(`${baseURL}session`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json({ token: 'test-token', user: userMock }))
})

const signUpRequest = rest.post(`${baseURL}users`, (req, res, ctx) => {
  return res(ctx.status(200))
})

const getProfileRequest = rest.get(`${baseURL}me`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(userMock))
})

const getLinksRequest = rest.get(`${baseURL}links`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(linksMock))
})

const postLinksRequest = rest.post(`${baseURL}links`, async (req, res, ctx) => {
  const body = await req.json()
  return res(ctx.status(201), ctx.json({ id: '3', ...body }))
})

const deleteLinkRequest = rest.delete(
  `${baseURL}links/:id`,
  (req, res, ctx) => {
    return res(ctx.status(200))
  },
)

/* Request Failure */
export const signUpRequestFailure = rest.post(
  `${baseURL}users`,
  (req, res, ctx) => {
    return res(ctx.status(400), ctx.json({ message: 'Usuário já cadastrado' }))
  },
)

export const getLinksRequestFailure = rest.get(
  `${baseURL}links`,
  (req, res, ctx) => {
    return res.networkError(networkErrorMessage)
  },
)

export const postLinksRequestFailure = rest.post(
  `${baseURL}links`,
  (req, res, ctx) => {
    return res.networkError(networkErrorMessage)
  },
)

export const deleteLinkRequestFailure = rest.delete(
  `${baseURL}links/:id`,
  (req, res, ctx) => {
    return res.networkError(networkErrorMessage)
  },
)

export const handlers = [
  signInRequest,
  signUpRequest,
  getProfileRequest,
  getLinksRequest,
  postLinksRequest,
  deleteLinkRequest,
]
