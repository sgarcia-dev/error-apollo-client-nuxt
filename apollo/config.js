import { Observable } from 'apollo-link'
import { onError } from 'apollo-link-error'
import consola from 'consola'

export default config

const errorLink = onError((event) => {
  const { graphQLErrors, networkError } = event
  const error = graphQLErrors?.length ? graphQLErrors[0] : networkError
  if (error) {
    consola.error('apollo-link-error:', error)
    return Observable.of({ data: {}, errors: [error] })
  }
})

function config(ctx) {
  return {
    httpEndpoint: 'http://localhost:4000',
    link: errorLink,
  }
}
