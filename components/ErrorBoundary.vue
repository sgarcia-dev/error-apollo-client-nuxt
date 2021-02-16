<script>
export default {
  name: 'ErrorBoundary',
  data: () => ({
    error: false,
  }),
  // eslint-disable-next-line node/handle-callback-err
  errorCaptured(err, vm, info) {
    this.error = true
  },
  render(h) {
    return this.error ? h('p', 'Something went wrong') : this.$slots.default[0]
  },
}
</script>
