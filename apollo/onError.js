import consola from 'consola'

export default (
  { graphQLErrors, networkError, operation, forward },
  context
) => {
  consola.success('Apollo global error handler ran')
  const errors = []
  if (graphQLErrors?.length) {
    graphQLErrors.forEach((e) => errors.push({ ...e, type: 'GRAPHQL' }))
  } else if (networkError) {
    try {
      JSON.parse(networkError.bodyText)
    } catch (e) {
      networkError.message = 'Server parse error, invalid JSON response'
    }
    errors.push({ message: networkError, type: 'NETWORK' })
  }

  if (errors.length) {
    const error = errors[0]
    consola.warn(`[${error.type}] ${error.message}`, new Error().stack)
    // Not working for some reason?
    context.error({
      message: error.message,
      statusCode: 500,
    })
  }
  // Why won't this be enough for this to fail silently?
  return false
}
