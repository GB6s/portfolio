<template>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">Home</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item>
              <nuxt-link to="/" exact>Home</nuxt-link>
            </b-nav-item>
            <b-nav-item>
              <nuxt-link to="/contact" exact>Contact</nuxt-link>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
</template>

<style>
.nuxt-link-active {
  font-weight: lighter;
}
</style>