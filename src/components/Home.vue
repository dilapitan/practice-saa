<template>
  <div>
    <br />
    <div v-if="!error">
      <div v-if="!loading">
        <div v-if="flashcards.length">
          <v-row>
            <v-col cols="1" sm="3" md="3"></v-col>
            <v-col cols="9" sm="4" md="3">
              <v-select
                :items="categories"
                item-text="value"
                item-value="value"
                v-model="select"
                label="Sort By"
                filled
                rounded
                dense
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="1" sm="3"></v-col>
            <v-col cols="10" sm="6">
              <div style="height: 80px" class="display-block">
                <h3 class="font-weight-bold">
                  {{ details.question }}
                </h3>
              </div>

              <Flashcard :details="details" />

              <br />
              <v-row class="pr-5">
                <v-spacer></v-spacer>
                <v-btn
                  @click="randomize()"
                  class="white--text"
                  color="accented"
                >
                  NEXT
                </v-btn>
              </v-row>
            </v-col>
            <v-col cols="10" sm="6" class="d-flex justify-center"> </v-col>
            <v-col cols="1" sm="3"></v-col>
          </v-row>
        </div>

        <div v-else>
          <br />
          <v-row justify="center" align="center">
            <p class="text-h5">No data found.</p>
          </v-row>
        </div>
      </div>
      <div v-else>
        <v-row justify="center">
          <v-progress-circular
            color="accented"
            indeterminate
            :size="70"
          ></v-progress-circular>
        </v-row>
      </div>
    </div>

    <div v-else>
      <ErrorPage />
    </div>
  </div>
</template>

<script>
import ErrorPage from '@/components/ErrorPage'
import Flashcard from '@/components/Flashcard'
import FlashcardService from '@/services/FlashcardService'

export default {
  name: 'Home',

  components: {
    ErrorPage,
    Flashcard,
  },

  created() {
    this.setup()
  },

  data: () => ({
    flashcards: [],
    items: [],
    categories: [{ value: 'All Categories' }],
    select: { value: 'All Categories' },
    details: {},
    loading: null,
    error: null,
  }),

  watch: {
    select() {
      this.getFlashcardsByCategory(this.select)
    },
  },

  methods: {
    async getFlashcards() {
      try {
        // Getting all the Flashcards
        const response = await FlashcardService.getFlashcards()
        this.flashcards = response.data.content

        if (!this.flashcards.length) {
          this.loading = false
          return
        }
        this.items = this.flashcards

        /**
         * This is for setting up the list of categories after getting
         * the Flashcards.
         */
        this.flashcards.map((flashcard) => {
          const found = this.categories.find((category) => {
            category.value === flashcard.category.name
          })

          // Ensuring no duplicates in setting up the list of categories
          if (found === undefined)
            this.categories.push({ value: flashcard.category.name })
        })
      } catch (error) {
        this.error = true
        throw new Error(error)
      }
    },

    getFlashcardsByCategory(category) {
      if (category !== 'All Categories') {
        const categorizedFlashcards = this.flashcards.filter(
          (flashcard) => flashcard.category.name === category
        )

        this.items = categorizedFlashcards
      } else this.items = this.flashcards

      // After getting all categorized Flashcards, a new question will be picked
      this.randomize()
    },

    randomize() {
      const randomFlashcard =
        this.items[Math.floor(Math.random() * this.items.length)]

      this.details = randomFlashcard
    },

    async setup() {
      this.loading = true
      await this.getFlashcards()
      if (this.flashcards?.length > 0) {
        this.randomize()
        this.loading = false
      }
    },
  },
}
</script>