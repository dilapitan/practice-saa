import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#232F3E',
        accented: '#EB680E',
        background: '#FFFFFF',
      },
      dark: {
        primary: '#232F3E',
        accented: '#EB680E',
        background: '#000000',
      },
    },
  },
})
