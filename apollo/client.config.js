// import errorLink from './apollo-link-error'

export default function config(ctx) {
  return {
    httpEndpoint: 'http://localhost:4000',
    // No longer necessary, since promise API doesn't crash the server
    // link: errorLink,
  }
}
