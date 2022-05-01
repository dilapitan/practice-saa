import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `https://express-notion-api.herokuapp.com`,
  })
}
