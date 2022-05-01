<template>
  <v-card class="display-block" height="400">
    <v-container>
      <div>
        <v-overlay
          :absolute="absolute"
          :opacity="opacity"
          :value="overlay"
          color="primary"
        >
          <v-btn color="accented" @click="overlay = false">
            Show Answers
          </v-btn>
        </v-overlay>

        <v-list class="display-block" height="330">
          <v-list-item v-for="(answer, i) in answers" :key="i">
            <v-list-item-content>
              {{ answer }}
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-chip class="my-1 font-weight-medium">
          Under category: {{ details.category.name }}
        </v-chip>
      </div>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'Flashcard',

  props: {
    details: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    answers: null,
    opacity: 1,
    overlay: true,
    absolute: true,
  }),

  created() {
    this.parseAnswers(this.details.answers)
  },

  watch: {
    details() {
      /**
       * Listen to prop change and the NEXT button.
       *
       * If the same question is given, it will not change, so it will not be hidden.
       */
      this.overlay = true
      setTimeout(() => {
        this.parseAnswers(this.details.answers)
      }, 500)
    },
  },

  methods: {
    parseAnswers(answers) {
      setTimeout(() => {
        const parsed = answers?.split('\n')
        this.answers = parsed
      }, 500)
    },
  },
}
</script>