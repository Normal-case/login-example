import axios from 'axios'

const domain = "http://localhost:8000"

export default class API {
    static login(body) {
        return axios.post(`${domain}/login`, body, {
            headers: { "Content-Type": "application/json" }
        })
    }

    static register(body) {
        return axios.post(`${domain}/register`, body, {
            headers: { "Content-Type": "application/json" }
        })
    }
}