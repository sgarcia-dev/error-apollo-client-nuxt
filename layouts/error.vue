<template>
  <div>
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else-if="error.message">{{ error.message }}</h1>
    <h1 v-else>An error occurred</h1>
    <NuxtLink to="/">Back to Index.html</NuxtLink>
  </div>
</template>

<script>
export default {
  layout: 'error',
  props: {
    error: {
      type: Object,
      default: () => ({
        message: '',
        statusCode: 0,
      }),
    },
  },
}
</script>
