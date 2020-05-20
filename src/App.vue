<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    this.$q.addressbarColor.set('#004d40')
    // #004d40
  }
}
</script>
