<template>
    <div
    class="fixed-top d-flex align-items-center justify-content-center"
    style="bottom: 0; overflow-y: auto"
    >
        <h1>Hello, {{ $auth.loggedIn ? 'admin' : 'friend' }}!</h1>
        <b-card class="centered">
            <b-form @submit="userLogin">
                <b-form-group
                id="input-group-1"
                label="Username:"
                label-for="input-1"
                >
                <b-form-input
                    id="input-1"
                    type="text"
                    required
                    placeholder="Enter username"
                ></b-form-input>
                </b-form-group>

                <b-form-group
                id="input-group-2"
                label="Password:"
                label-for="input-2"
                >
                <b-form-input
                    id="input-2"
                    type="password"
                    required
                    placeholder="Enter password"
                ></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary">Login</b-button>
            </b-form>
        </b-card>
    </div>
</template>

<script>
export default {
  layout: 'no-layout',
  data() {
    return {
      login: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async userLogin() {
        console.log('fired');
      try {
        let response = await this.$auth.loginWith('local', { data: this.login })
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    }
  }
};
</script>

<style>
    .centered {
        width: 30%;
    }
</style>