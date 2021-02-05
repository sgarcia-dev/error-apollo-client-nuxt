import consola from 'consola'

export default (
  { graphQLErrors, networkError, operation, forward },
  context
) => {
  consola.info('nuxt-apollo-error-handler.js: error handler ran')
  const hasError = !!graphQLErrors.length || !!networkError
  if (hasError) {
    consola.info('nuxt-apollo-error-handler.js: redirecting to error page')
    context.error({
      message: 'Apollo error',
      statusCode: 500,
    })
  }
}
