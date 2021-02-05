import errorLink from './apollo-link-error'

export default function config(ctx) {
  return {
    httpEndpoint: 'http://localhost:4000',
    link: errorLink,
  }
}
