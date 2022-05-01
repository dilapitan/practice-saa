import Api from '@/services/Api'

export default {
  getFlashcards() {
    return Api().get('/')
  },
}
