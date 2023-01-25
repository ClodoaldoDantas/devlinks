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

const uploadAvatarRequest = rest.patch(`${baseURL}avatar`, (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({ avatar: 'http://test.com/avatar.png' }),
  )
})

const updateBioRequest = rest.patch(`${baseURL}users`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json({ bio: 'bio updated' }))
})

/* Request Failure */
const signInRequestFailure = rest.post(`${baseURL}session`, (req, res, ctx) => {
  return res(
    ctx.status(400),
    ctx.json({ message: 'usuário ou senha inválidos' }),
  )
})

const signUpRequestFailure = rest.post(`${baseURL}users`, (req, res, ctx) => {
  return res(ctx.status(400), ctx.json({ message: 'Usuário já cadastrado' }))
})

const getLinksRequestFailure = rest.get(`${baseURL}links`, (req, res, ctx) => {
  return res.networkError(networkErrorMessage)
})

const postLinksRequestFailure = rest.post(
  `${baseURL}links`,
  (req, res, ctx) => {
    return res.networkError(networkErrorMessage)
  },
)

const deleteLinkRequestFailure = rest.delete(
  `${baseURL}links/:id`,
  (req, res, ctx) => {
    return res.networkError(networkErrorMessage)
  },
)

const uploadAvatarRequestFailure = rest.patch(
  `${baseURL}avatar`,
  (req, res, ctx) => {
    return res.networkError(networkErrorMessage)
  },
)

const updateBioRequestFailure = rest.patch(
  `${baseURL}users`,
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
  uploadAvatarRequest,
  updateBioRequest,
]

export {
  signInRequestFailure,
  signUpRequestFailure,
  getLinksRequestFailure,
  postLinksRequestFailure,
  deleteLinkRequestFailure,
  uploadAvatarRequestFailure,
  updateBioRequestFailure,
}
