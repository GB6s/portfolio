<template>
  <div>
    <h1>Hello, {{ $auth.loggedIn ? "admin" : "friend" }}!</h1>
  </div>
</template>

<script>
export default {
  layout: 'admin',
}
</script>

