import { rest } from 'msw'

export const userMock = {
  id: '1',
  username: 'johndoe',
  bio: 'software developer',
  avatar: null,
}

export const handlers = [
  rest.post('http://localhost:3333/session', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        token: 'test-token',
        user: userMock,
      }),
    )
  }),
  rest.get('http://localhost:3333/me', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userMock))
  }),
]
