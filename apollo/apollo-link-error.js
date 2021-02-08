import { Observable } from 'apollo-link'
import { onError } from 'apollo-link-error'
import consola from 'consola'

export default onError(
  ({ graphQLErrors, networkError, operation, forward, response }) => {
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

    /**
     * The only ways to stop the nuxt from crashing due to failed HTTP requests are:
     * 1) setting `response.errors` to undefined link in: https://www.apollographql.com/docs/link/links/error/#ignoring-errors
     * But response is currently undefined in SSR apps as documented in these GH issues:
     * https://github.com/apollographql/apollo-link/issues/855
     * https://github.com/apollographql/apollo-client/issues/5708
     * https://github.com/apollographql/apollo-link/issues/698
     * The only fallback is returning an empty Observable type as documented in the threads above and official documentation:
     * https://www.apollographql.com/docs/link/links/error/#callback
     * The observable must return an object of type `FetchResult` as declared in Apollo Client's source code
     * https://github.com/apollographql/apollo-client/blob/e145a860a10c12fdc4d863379f32e4080597323b/src/link/core/types.ts#L23
     */

    // IMPORTANT: This doesn't solve all our issues, see comments below
    return Observable.of({ data: {} })

    /**
     * Uncomenting the liens below fixes this apollo client browser warning:
     * `client.js:50 Missing field books in {}`
     * And also allows our `/apollo/nuxt-apollo-error-handler.js` to handle errors (and redirect to error page with context.error)
     * But causes the white screen error related to vue hydration
     * `The client-side rendered virtual DOM tree is not matching server-rendered content.`
     *
     * We need a way to uncomment the line below without causing the white screen issue.
     * Solution is likely in the GH issue threads above on lines 30-32
     */

    // return Observable.of({
    //   data: { [operationName]: null },
    //   errors
    // })
  }
)
