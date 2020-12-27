import axios from 'axios'

const request = axios.create({
    baseUrl: 'https://conduit.productionready.io'
})

export default request