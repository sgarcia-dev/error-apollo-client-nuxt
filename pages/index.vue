<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">apollo-client-nuxt</h1>
      <pre v-if="books.data">
        {{ JSON.stringify(books.data, null, 2) }}
      </pre>
      <pre v-if="books.error">
        {{ JSON.stringify(books.error, null, 2) }}
      </pre>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  async asyncData(context) {
    const { defaultClient: apolloClient } = context.app.apolloProvider
    const res = await apolloClient
      .query({
        query: gql`
          query books {
            books {
              title
              author
            }
          }
        `,
      })
      // Upcoming catch/then is hardcoded, but ideally we should abstract this into its own utility folder
      .catch((error) => ({ error }))
      .then((res) => {
        // Fallback DB operations can go here,
        // but we still must ensure we are always returning the same signature:
        // const res = { data, error }
        return res
      })

    // Returned object will be bound to `this` instance state
    return {
      books: {
        data: res.data?.books,
        error: serializeObject(res.error),
      },
    }

    // Required to avoid nuxt asyncData SSR hydration warning: Cannot stringify arbitrary non-POJOs "ApolloError"
    // https://github.com/vuex-orm/vuex-orm/issues/255
    function serializeObject(obj) {
      if (obj && typeof obj === 'object') {
        return JSON.parse(JSON.stringify(obj))
      } else {
        return obj
      }
    }
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
