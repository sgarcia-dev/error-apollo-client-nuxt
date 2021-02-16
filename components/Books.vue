<template>
  <ul>
    <li v-for="book in books" :key="book.id">
      <h4>I'm a book</h4>
    </li>
  </ul>
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
            }
          }
        `
      },
      // eslint-disable-next-line
      error(error, vm, key, type, options) {
        consola.error('component/books.js: something bad happened', error)
        // should stop propagation based on this?
        // https://github.com/vuejsv/ue-apollo/blob/83fb002c39519be0eeadad148d6ec58c552d4cc1/packages/vue-apollo/src/smart-apollo.js#L157
        return false
      },
    },
  },
}
</script>
