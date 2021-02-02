<template>
  <h1>You can't see me!</h1>
</template>

<script>
export default {
  asyncData(context) {
    context.error({
      message: 'You cannot access /invisible!',
      statusCode: 404,
    })
  },
}
</script>
