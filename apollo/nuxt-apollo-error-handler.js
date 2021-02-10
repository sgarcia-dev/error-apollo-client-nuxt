import consola from 'consola'

export default (
  { graphQLErrors, networkError, operation, forward },
  context
) => {
  const error = graphQLErrors?.length ? graphQLErrors : networkError
  if (error) {
    consola.error('nuxt-apollo-error-handler.js: something bad happened', error)
    context.error({
      message: 'Apollo error',
      statusCode: 500,
    })
  }
}
