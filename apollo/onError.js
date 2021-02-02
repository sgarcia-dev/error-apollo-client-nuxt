import consola from 'consola'

export default (
  { graphQLErrors, networkError, operation, forward },
  context
) => {
  const errors = []
  if (graphQLErrors) {
    graphQLErrors.forEach((e) => errors.push({ ...e, type: 'GRAPHQL' }))
  } else if (networkError) {
    try {
      JSON.parse(networkError.bodyText)
    } catch (e) {
      networkError.message = networkError.bodyText
    }
    errors.push({ message: networkError, type: 'NETWORK' })
  }

  if (errors.length) {
    errors.forEach((error) =>
      consola.success(`[${error.type}] error caught: ${error.message}`)
    )
  }
  // Why won't this be enough for this to fail silently?
  return false
}
