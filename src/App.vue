<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon>
        <v-icon color="accented" x-large>mdi-aws</v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title>
        <h3>Get ready for AWS!</h3>
      </v-toolbar-title>

      <v-btn @click="toggleTheme()" icon color="accented">
        <v-icon v-if="!$vuetify.theme.dark">mdi-weather-night</v-icon>
        <v-icon v-else>mdi-white-balance-sunny</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn @click="showAbout()" icon large v-bind="attrs" v-on="on">
            <v-icon>mdi-information-outline</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title> About this app </v-card-title>

          <About />

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="dialog = false"> Close </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <v-card color="background" flat height="100%">
      <v-main>
        <Home />
      </v-main>
    </v-card>
  </v-app>
</template>

<script>
import About from '@/components/About'
import Home from '@/components/Home'

export default {
  name: 'App',

  components: {
    About,
    Home,
  },

  data: () => ({
    dialog: false,
  }),

  created() {
    const theme = localStorage.getItem('dark_theme')
    this.$vuetify.theme.dark = theme === 'true' ? true : false
  },

  methods: {
    showAbout() {
      this.drawer = true
    },

    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      localStorage.setItem('dark_theme', this.$vuetify.theme.dark.toString())
    },
  },
}
</script>
