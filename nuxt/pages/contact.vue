<template>
  <div>
    <div id="form">
      <b-form @submit="onSubmit">
        <b-form-group
          id="input-group-1"
          label="Email adres:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            required
            placeholder="Email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Naam:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.name"
            required
            placeholder="Naam"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Bericht:" label-for="input-3">
          <b-form-textarea
            id="input-3"
            v-model="form.message"
            required
            rows="6"
            placeholder="Bericht"
          ></b-form-textarea>
        </b-form-group>

        <b-button type="submit" variant="primary">Verstuur</b-button>
      </b-form>
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        name: "",
        message: ""
      }
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
  },
};
</script>

<style>
#form {
  margin: 20px auto;
  width: 50%;
}
</style>