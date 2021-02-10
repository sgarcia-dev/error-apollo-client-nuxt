<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">apollo-client-nuxt</h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import consola from 'consola'

export default {
  apollo: {
    books: {
      query() {
        return gql`
          query books {
            books {
              title
              author
              test
            }
          }
        `
      },
      // eslint-disable-next-line
      error(error, vm, key, type, options) {
        consola.error('pages/index.js: something bad happened', error)
        // should stop propagation based on this?
        // https://github.com/vuejsv/ue-apollo/blob/83fb002c39519be0eeadad148d6ec58c552d4cc1/packages/vue-apollo/src/smart-apollo.js#L157
        return false
      },
    },
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
