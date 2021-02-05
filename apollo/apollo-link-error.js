import { Observable } from 'apollo-link'
import { onError } from 'apollo-link-error'
import consola from 'consola'

export default onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    consola.info('apollo-link-error.js: error handler ran')
    const errors = []
    if (graphQLErrors?.length) {
      graphQLErrors.forEach((e) => errors.push({ ...e, type: 'GRAPHQL' }))
    } else if (networkError) {
      try {
        JSON.parse(networkError.bodyText)
      } catch (e) {
        networkError.message = 'Server Parse Error, invalid JSON response'
      }
      errors.push({ message: networkError, type: 'NETWORK' })
    }

    if (!errors.length) return

    const error = errors[0]
    const operationName = operation.operationName || 'undefined'
    const errorMessage = `[apollo-link-error] the graphql operation "${operationName}" returned the following ${error.type} error`
    consola.error(errorMessage, error)
    return Observable.of({
      data: { [operationName]: null },
      errors,
    })
  }
)
