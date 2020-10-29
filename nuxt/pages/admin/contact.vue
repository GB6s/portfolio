<template>
  <div id="form">
    <b-list-group>
      <b-list-group-item
        v-for="contact in contacts"
        :key="contact.id"
        class="d-flex justify-content-between align-items-center"
      >
        <b-row>
          <b-col>
            <p>{{ contact.name }}</p>
            <p>{{ contact.email }}</p>
            <p>{{ contact.message }}</p>
          </b-col>
          <div class="w-100"></div>
          <b-col>
            <b-button variant="danger" @click="del(contact)">Delete</b-button>
            <b-button variant="success">Respond</b-button>
          </b-col>
        </b-row>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<style>
#form {
  margin: 20px auto;
  width: 50%;
}
</style>

<script>
export default {
  layout: "admin",
  data() {
    return {
      contacts: [],
    };
  },
  async asyncData({ $axios }) {
    try {
      const { data } = await $axios.get("/contacts");
      return { contacts: data };
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    async del(contact) {
      try {
        await this.$axios.delete(`/contacts/delete/${contact.id}`);
        this.contacts = this.contacts.filter((el) => el.id !== contact.id);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>